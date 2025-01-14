import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import { Notification } from '@/models/notification';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const count = await Notification.countDocuments({ 
      userEmail: session.user.email,
      read: false
    });

    return NextResponse.json({ 
      success: true, 
      count 
    });
  } catch (error) {
    console.error('Failed to fetch unread notifications count:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
