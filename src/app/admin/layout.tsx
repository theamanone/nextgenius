'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiGrid, FiBox, FiFolder, FiSettings, FiLogOut, FiUser, FiBell } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import NotificationsModal from '@/components/admin/NotificationsModal';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  const fetchUnreadNotifications = async () => {
    try {
      const response = await fetch('/api/admin/notifications/unread');
      const data = await response.json();
      if (data.success) {
        setUnreadNotifications(data.count);
      }
    } catch (error) {
      console.error('Failed to fetch unread notifications:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session?.user) {
    router.push('/auth/signin');
    return null;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: FiGrid },
    { id: 'products', label: 'Products', href: '/admin/products', icon: FiBox },
    { id: 'projects', label: 'Projects', href: '/admin/projects', icon: FiFolder },
    { id: 'settings', label: 'Settings', href: '/admin/settings', icon: FiSettings },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gray-100 text-gray-800 overflow-hidden">
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg overflow-y-auto">
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col pt-5 pb-4">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                  Admin
                </span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                  </div>
                </div>
                <div className="ml-3 w-full">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {session.user.name || session.user.email}
                  </p>
                  <button
                    onClick={() => router.push('/auth/signout')}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 mt-1"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-semibold"
              >
                {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
              </motion.h1>

              {/* Header Actions */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
                >
                  <FiBell className="h-6 w-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-10">
                      <Link
                        href="/admin/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiUser className="mr-3 h-4 w-4" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => router.push('/auth/signout')}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiLogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          <main className="relative flex-1 overflow-y-auto">
            <div className="h-full py-6 px-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
