import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Redis credentials are not properly configured');
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate limit for IP addresses: 2 requests per day
export const ipRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(4, '24 h'),
  analytics: true,
  prefix: 'ratelimit:ip',
});

// Device-based rate limit: 4 requests per day
export const deviceRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(4, '24 h'),
  analytics: true,
  prefix: 'ratelimit:device',
});

// Global rate limit to prevent abuse: 30 requests per minute
export const globalRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1 m'),
  analytics: true,
  prefix: 'ratelimit:global',
});
