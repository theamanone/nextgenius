import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

import { getServerSession } from 'next-auth';
 
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import { authOptions } from '../auth/[...nextauth]/route';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// POST endpoint to create order
export async function POST(req: Request) {
  try {
    const { amount, productId } = await req.json();

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    // Convert amount to paise (multiply by 100)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: 'order_rcptid_' + Date.now(),
    };

    try {
      const order = await razorpay.orders.create(options);
      
      return NextResponse.json({
        success: true,
        data: {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          productId
        }
      });
    } catch (razorpayError: any) {
      console.error('Razorpay error:', razorpayError);
      return NextResponse.json(
        { error: razorpayError.error?.description || 'Order creation failed' },
        { status: razorpayError.statusCode || 500 }
      );
    }
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint for webhook/verification
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId
    } = await req.json();

    // Create a signature to verify the payment
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Store purchase information in database
      const { db } = await connectDB();
      
      await db.collection('purchases').insertOne({
        userId: session.user.id,
        productId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        purchaseDate: new Date(),
        status: 'completed'
      });

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        downloadUrl: `/api/download/${productId}` // You'll create this API endpoint
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}