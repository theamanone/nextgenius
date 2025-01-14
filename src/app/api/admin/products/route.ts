import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log('Received data:', data);

    // Validate required fields
    if (!data.name?.trim() || !data.description?.trim() || !data.category?.trim()) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create product with cleaned data
    const productData = {
      name: data.name.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      category: data.category.trim(),
      imageUrl: data.imageUrl || '',
      downloadUrl: data.downloadUrl || '',
      demoUrl: data.demoUrl?.trim() || '',
      features: data.features.filter(Boolean),
      requirements: data.requirements.filter(Boolean),
      isActive: Boolean(data.isActive)
    };

    console.log('Creating product with data:', productData);
    const product = await Product.create(productData);
    console.log('Product created successfully');

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    console.log('Update data received:', data);
    
    if (!data._id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const updateData = {
      name: data.name.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      category: data.category.trim(),
      imageUrl: data.imageUrl || '',
      downloadUrl: data.downloadUrl || '',
      demoUrl: data.demoUrl?.trim() || '',
      features: data.features.filter(Boolean),
      requirements: data.requirements.filter(Boolean),
      isActive: Boolean(data.isActive)
    };

    console.log('Updating product with data:', updateData);
    const updatedProduct = await Product.findByIdAndUpdate(
      data._id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    console.log('Product updated successfully');
    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Product deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
