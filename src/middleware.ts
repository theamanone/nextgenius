import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { redis } from '@/lib/redis';

// Define paths that need protection
const PROTECTED_PATHS = ['/api/contact', '/admin'];

export async function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown';
  const path = request.nextUrl.pathname;

  // Skip middleware for non-protected paths
  if (!PROTECTED_PATHS.some(prefix => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Check if IP is blacklisted
  const isBlacklisted = await redis.get(`blacklist:${ip}`);
  if (isBlacklisted) {
    return new NextResponse(
      JSON.stringify({ error: 'Access denied' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Implement aggressive rate limiting for suspicious behavior
  const requestCount = await redis.incr(`requests:${ip}`);
  await redis.expire(`requests:${ip}`, 60); // Reset after 60 seconds

  if (requestCount > 50) { // More than 50 requests in 60 seconds
    // Blacklist the IP for 24 hours
    await redis.set(`blacklist:${ip}`, 'true', { ex: 86400 });
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Your IP has been blocked for 24 hours.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
