'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types';
import Image from 'next/image';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    content: 'Full content here...',
    date: '2023-12-28',
    author: 'John Doe',
    image: '/assets/images/blog1.jpg',
    tags: ['Web Development', 'Technology', 'Future'],
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Mastering React Hooks',
    excerpt: 'A comprehensive guide to using React Hooks effectively in your applications.',
    content: 'Full content here...',
    date: '2023-12-27',
    author: 'Jane Smith',
    image: '/assets/images/blog2.jpg',
    tags: ['React', 'JavaScript', 'Web Development'],
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Building Scalable Applications',
    excerpt: 'Learn the best practices for building scalable and maintainable applications.',
    content: 'Full content here...',
    date: '2023-12-26',
    author: 'Mike Johnson',
    image: '/assets/images/blog3.jpg',
    tags: ['Architecture', 'Best Practices', 'Scalability'],
    readTime: '6 min read'
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.article
      className="bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority={post.id === 1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {post.title}
        </h2>
        
        <p className="text-gray-300 mb-4">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          <span className="text-sm text-gray-300">{post.author}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default function BlogPage() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch other routes
    router.prefetch('/services');
    router.prefetch('/projects');
  }, [router]);

  return (
    <motion.main
      className="bg-black min-h-screen py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Blog Posts
        </motion.h1>
        
        <motion.p
          className="text-gray-400 text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover insights, tutorials, and thoughts on web development, design, and technology.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
