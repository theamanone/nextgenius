import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
 
import { SupportMessage } from '@/models/SupportMessage';
import connectDB from '@/lib/mongodb';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { orderId, subject, message } = await request.json();

    if (!orderId || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    const supportMessage = await SupportMessage.create({
      userId: session.user.email,
      orderId,
      subject,
      message,
      status: 'pending'
    });

    return NextResponse.json(
      { message: 'Support message created successfully', supportMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Support message creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create support message' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const messages = await SupportMessage.find({ userId: session.user.email })
      .sort({ createdAt: -1 });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Support messages fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch support messages' },
      { status: 500 }
    );
  }
}
