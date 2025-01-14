'use client';

import { useState, useEffect } from 'react';
import { FiBox, FiFolder, FiShoppingCart, FiPlus, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

interface Stats {
  totalProducts: number;
  totalProjects: number;
  totalPurchases: number;
  recentProducts: any[];
  recentProjects: any[];
  trends: {
    products: number;
    projects: number;
    purchases: number;
  };
}

const initialStats: Stats = {
  totalProducts: 0,
  totalProjects: 0,
  totalPurchases: 0,
  recentProducts: [],
  recentProjects: [],
  trends: {
    products: 0,
    projects: 0,
    purchases: 0,
  },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(initialStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (data.success) {
        setStats({
          totalProducts: data.totalProducts || 0,
          totalProjects: data.totalProjects || 0,
          totalPurchases: data.totalPurchases || 0,
          recentProducts: data.recentProducts || [],
          recentProjects: data.recentProjects || [],
          trends: {
            products: data.trends?.products || 0,
            projects: data.trends?.projects || 0,
            purchases: data.trends?.purchases || 0,
          },
        });
      } else {
        throw new Error(data.error || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FiBox,
      trend: stats.trends.products,
      href: '/admin/products',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FiFolder,
      trend: stats.trends.projects,
      href: '/admin/projects',
      color: 'bg-purple-500',
    },
    {
      title: 'Total Purchases',
      value: stats.totalPurchases,
      icon: FiShoppingCart,
      trend: stats.trends.purchases,
      href: '/admin/purchases',
      color: 'bg-green-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <Link href={stat.href} className="block p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend > 0 ? (
                      <FiTrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <FiTrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${
                      stat.trend > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {Math.abs(stat.trend)}%
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Products</h2>
              <Link
                href="/admin/products/new"
                className="flex items-center text-sm text-primary hover:text-primary-dark"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add Product
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.recentProducts.length > 0 ? (
                stats.recentProducts.map((product) => (
                  <div key={product.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-3 text-center text-gray-500">
                  No products found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Projects</h2>
              <Link
                href="/admin/projects/new"
                className="flex items-center text-sm text-primary hover:text-primary-dark"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add Project
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {stats.recentProjects.length > 0 ? (
                stats.recentProjects.map((project) => (
                  <div key={project.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-500">{project.client}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-3 text-center text-gray-500">
                  No projects found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
