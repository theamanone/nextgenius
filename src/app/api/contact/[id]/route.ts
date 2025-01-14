import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { Contact } from '@/models/contact';
import connectDB  from '@/lib/mongodb';

// Update message status
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  
  if (!session || session.user?.email !== 'amankirmara143@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { status } = await req.json();
    
    const message = await Contact.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete message
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();
  
  if (!session || session.user?.email !== 'amankirmara143@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const message = await Contact.findByIdAndDelete(params.id);

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
