'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'read' | 'unread';
  timestamp: string;
}

export default function AdminMessages() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/contact');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    };

    if (session?.user?.email === 'amankirmara143@gmail.com') {
      fetchMessages();
    }
  }, [session]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'read' }),
      });

      if (res.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, status: 'read' } : msg
        ));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (!session || session.user?.email !== 'amankirmara143@gmail.com') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
          <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Contact Messages</h1>
      
      {messages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No messages found
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-6 rounded-lg border shadow-sm transition-all ${
                msg.status === 'unread' 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-900">{msg.name}</h3>
                  <p className="text-sm text-gray-600">{msg.email}</p>
                  <p className="mt-3 text-gray-700">{msg.message}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="space-x-3">
                  {msg.status === 'unread' && (
                    <button
                      onClick={() => markAsRead(msg._id)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
