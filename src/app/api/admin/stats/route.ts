import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
 
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { Project } from '@/models/Project';
import { authOptions } from '../../auth/[...nextauth]/route';
 

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get counts from different collections
    const [
      totalProducts,
      totalProjects,
      totalPurchases
    ] = await Promise.all([
      Product.countDocuments(),
      Project.countDocuments(),
      0 // Replace with actual purchases count when implemented
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalProjects,
        totalPurchases
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
