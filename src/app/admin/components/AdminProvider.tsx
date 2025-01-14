'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiGrid, FiBox, FiFolder, FiSettings, FiLogOut, FiUser, FiBell } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
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
    <div className="min-h-screen bg-[#f5f5f7] text-black">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#f5f5f7] shadow-lg">
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col pt-5 pb-4">
              <div className="flex items-center flex-shrink-0 px-4">
                <Link href="/admin" className="font-bold text-xl text-primary">
                  Admin Panel
                </Link>
              </div>
              <nav className="mt-8 flex-1 space-y-1 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      pathname === item.href
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        pathname === item.href ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-[#f5f5f7] shadow-sm">
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
                  onClick={() => toast.success('Notifications coming soon!')}
                  className="relative p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
                >
                  <FiBell className="h-6 w-6" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                      {notifications}
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50">
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
          <main className="flex-1 overflow-y-auto">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
