'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaEdit, FaTrash, FaEye, FaClock } from 'react-icons/fa';
import { BlogPost, FALLBACK_IMAGE } from '@/lib/data';

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: number) => void;
  onPreview: (id: number) => void;
}

export default function BlogPostCard({ post, onEdit, onDelete, onPreview }: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-lg rounded-xl overflow-hidden group"
    >
      <div className="relative h-48">
        <Image
          src={post.image || FALLBACK_IMAGE}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            post.status === 'published'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {post.excerpt || post.content}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-2">
            <FaClock className="text-blue-400" />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="px-3 py-1 bg-blue-500/10 rounded-full text-blue-400">
            {post.category}
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPreview(post.id)}
            className="p-2 text-purple-400 hover:text-purple-300 transition-colors"
            title="Preview"
          >
            <FaEye />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(post)}
            className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
            title="Edit"
          >
            <FaEdit />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(post.id)}
            className="p-2 text-red-400 hover:text-red-300 transition-colors"
            title="Delete"
          >
            <FaTrash />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
