import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // For now, we'll return mock AI-generated content
    // In production, you would integrate with an AI service like OpenAI
    const mockAIResponse = {
      content: `This is an AI-generated article about ${title}. It covers various aspects of the topic including background, implementation details, and best practices. The content is designed to be informative and engaging for readers interested in ${title}.`,
      excerpt: `Learn everything you need to know about ${title} in this comprehensive guide.`,
      tags: title.toLowerCase().split(' ').filter(Boolean),
    };

    return NextResponse.json(mockAIResponse);
  } catch (error) {
    console.error('Error generating AI content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
