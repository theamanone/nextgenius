import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Contact } from '@/models/contact';
import { sendEmail } from '@/lib/email';
import connectDB from '@/lib/mongodb';
import { ipRateLimit, deviceRateLimit, globalRateLimit } from '@/lib/redis';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    // Check global rate limit
    const globalLimit = await globalRateLimit.limit(`global_${ip}`);
    if (!globalLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Check IP-based rate limit
    const ipLimit = await ipRateLimit.limit(ip);
    if (!ipLimit.success) {
      return NextResponse.json(
        { 
          error: 'Daily limit exceeded. You can send 4 messages per day.',
          reset: ipLimit.reset 
        },
        { status: 429 }
      );
    }

    // Check device-based rate limit
    const deviceLimit = await deviceRateLimit.limit(userAgent);
    if (!deviceLimit.success) {
      return NextResponse.json(
        { 
          error: 'Device limit exceeded. Maximum 4 messages per day per device.',
          reset: deviceLimit.reset 
        },
        { status: 429 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    const body = await req.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Additional validation for spam prevention
    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message is too long. Maximum 1000 characters allowed.' },
        { status: 400 }
      );
    }

    // Basic spam detection
    const spamKeywords = ['casino', 'viagra', 'lottery', 'winner', 'bitcoin'];
    if (spamKeywords.some(keyword => 
      message.toLowerCase().includes(keyword) || 
      name.toLowerCase().includes(keyword)
    )) {
      return NextResponse.json(
        { error: 'Message detected as spam.' },
        { status: 400 }
      );
    }

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      message,
      ip,
      userAgent,
      status: 'unread',
      timestamp: new Date()
    });

    // Send confirmation email to user
    await sendEmail(
      email,
      'Thank you for contacting WebGeniusCraft!',
      name
    );

    // Send notification to admin
    await sendEmail(
      'amankirmara143@gmail.com',
      'New Contact Form Submission',
      name,
      true,
      {
        email,
        message,
        ip,
        userAgent
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Admin routes for managing messages
export async function GET(req: Request) {
  const session = await getServerSession();
  
  // Check if user is admin
  if (!session || session.user?.email !== 'amankirmara143@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const messages = await Contact.find().sort({ timestamp: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
