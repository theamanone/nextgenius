import { NextResponse } from 'next/server';
import { Encryptor } from 'encstream';
import { Contact } from '@/models/contact';
import { sendEmail } from '@/lib/email';
import connectDB from '@/lib/mongodb';
import { headers } from 'next/headers';

const secretKey = process.env.ENCRYPTION_KEY!;
const encryptor = new Encryptor({
  secretKey,
  debug: true // Enable for development
});

export async function POST(request: Request) {
  try {
    const encryptedPayload = await request.json();
    console.log("encrypted payload : ", encryptedPayload);
    
    // Validate payload structure
    if (!encryptedPayload?.data || !encryptedPayload?.signature) {
      throw new Error('Invalid encrypted payload structure');
    }

    // Decrypt and extract request details
    const decrypted = await encryptor.decrypt(encryptedPayload);
    const { target, data } = decrypted as { target: string; data: any };
    console.log("decrypted : ", decrypted, " data method : ", data.method);

    if (!target) {
      throw new Error('Missing target endpoint');
    }

    // Handle contact form submission
    if (target === '/api/contact' && data.method === 'POST') {
      await connectDB();
      const body = JSON.parse(data.body);
      const { name, email, message } = body;

      // Validate input
      if (!name || !email || !message) {
        throw new Error('Missing required fields');
      }

      // Additional validation for spam prevention
      if (message.length > 1000) {
        throw new Error('Message is too long. Maximum 1000 characters allowed.');
      }

      // Basic spam detection
      const spamKeywords = ['casino', 'viagra', 'lottery', 'winner', 'bitcoin'];
      if (spamKeywords.some(keyword => 
        message.toLowerCase().includes(keyword) || 
        name.toLowerCase().includes(keyword)
      )) {
        throw new Error('Message detected as spam.');
      }

      // Save to database
      const contact = await Contact.create({
        name,
        email,
        message,
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
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      );

      const responseData = { success: true, message: 'Contact form submitted successfully' };
      const encryptedResponse = encryptor.encrypt(responseData);
      return NextResponse.json(encryptedResponse);
    }

    throw new Error('Unsupported endpoint or method');
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Proxy request failed' },
      { status: 400 }
    );
  }
}