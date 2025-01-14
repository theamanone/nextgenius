import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({ isActive: true })
      .select('id name description price image technologies features demoUrl')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
