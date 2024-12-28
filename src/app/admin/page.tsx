'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { BlogPost, MOCK_BLOG_POSTS } from '@/lib/data';
import BlogPostCard from './components/BlogPostCard';
import BlogPostForm from './components/BlogPostForm';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status, router]);

  const fetchPosts = async () => {
    // This would typically be an API call
    setPosts(MOCK_BLOG_POSTS);
    setLoading(false);
  };

  const handleCreatePost = async (postData: Partial<BlogPost>) => {
    try {
      // This would typically be an API call
      const newPost = {
        ...postData,
        id: posts.length + 1,
        createdAt: new Date().toISOString(),
      } as BlogPost;
      
      setPosts(prev => [newPost, ...prev]);
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async (postData: Partial<BlogPost>) => {
    if (!editingPost) return;
    
    try {
      // This would typically be an API call
      const updatedPost = {
        ...editingPost,
        ...postData,
        updatedAt: new Date().toISOString(),
      };
      
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id ? updatedPost : post
      ));
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      // This would typically be an API call
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePreviewPost = (id: number) => {
    // Navigate to blog post preview
    router.push(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white"
          >
            Blog Management
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowNewPostForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <FaPlus /> New Post
          </motion.button>
        </div>

        {/* Post Form */}
        {(showNewPostForm || editingPost) && (
          <div className="mb-8">
            <BlogPostForm
              onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
              initialData={editingPost || undefined}
              onCancel={() => {
                setShowNewPostForm(false);
                setEditingPost(null);
              }}
            />
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl p-4 animate-pulse">
                <div className="h-48 bg-gray-800 rounded-lg mb-4" />
                <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-800 rounded w-1/2" />
              </div>
            ))
          ) : (
            posts.map(post => (
              <BlogPostCard
                key={post.id}
                post={post}
                onEdit={setEditingPost}
                onDelete={handleDeletePost}
                onPreview={handlePreviewPost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
