import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Check if user has purchased the product
    const product = await Product.findOne({
      id: params.productId,
      isActive: true
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // For now, we'll assume the user has purchased the product
    // In a real application, you would check the purchases collection

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        technologies: product.technologies,
        githubUrl: product.githubUrl || '#',
      }
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
