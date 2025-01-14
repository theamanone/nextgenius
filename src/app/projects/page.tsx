'use client';

import { AlertTriangle, Code, Package } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-semibold text-white">
            Projects Marketplace Coming Soon
          </h1>
        </div>
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">
            We're building an exciting marketplace where you'll be able to discover and purchase:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
              <Code className="h-5 w-5 text-blue-400 mt-1" />
              <div>
                <h3 className="font-medium text-white mb-1">Project Templates</h3>
                <p className="text-sm">Ready-to-use project templates for various web applications and services</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
              <Package className="h-5 w-5 text-green-400 mt-1" />
              <div>
                <h3 className="font-medium text-white mb-1">Premium Components</h3>
                <p className="text-sm">High-quality, customizable components to enhance your projects</p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              We're working hard to bring you a curated collection of professional resources. Stay tuned for our launch!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
