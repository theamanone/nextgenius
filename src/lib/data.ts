// Constants
export const FALLBACK_IMAGE = '/assets/images/OneErrorImage.png';

// Types
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image: string;
  category: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt?: string;
  tags?: string[];
}

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

// Mock Data
export const BLOG_CATEGORIES = [
  'Development',
  'Design',
  'Technology',
  'Career',
  'Tutorial',
  'News'
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful framework for building React applications...',
    excerpt: 'Learn how to build modern web applications with Next.js',
    image: '/assets/images/blog/nextjs.jpg',
    category: 'Development',
    status: 'published',
    createdAt: '2023-12-28',
    tags: ['Next.js', 'React', 'Web Development']
  },
  {
    id: 2,
    title: 'UI/UX Design Principles',
    content: 'Understanding the fundamentals of user interface and experience design...',
    excerpt: 'Master the essential principles of UI/UX design',
    image: '/assets/images/blog/design.jpg',
    category: 'Design',
    status: 'published',
    createdAt: '2023-12-27',
    tags: ['UI', 'UX', 'Design']
  },
  // Add more mock posts as needed
];