import { NextResponse } from 'next/server';
import { HealthResponse, ServiceStatus } from '@/types/health';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import os from 'os';

const SERVICES = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    type: 'api',
    dependencies: ['auth-service', 'core-api'],
    region: 'us-east',
    version: '2.1.0',
  },
  {
    id: 'auth-service',
    name: 'Authentication Service',
    type: 'auth',
    dependencies: ['user-db'],
    region: 'us-east',
    version: '3.0.1',
  },
  {
    id: 'core-api',
    name: 'Core API',
    type: 'api',
    dependencies: ['main-db', 'cache-layer'],
    region: 'us-east',
    version: '4.2.0',
  },
];

function generateMetrics(baseValue: number, variance: number = 0.1) {
  const points = [];
  const now = Date.now();
  for (let i = 0; i < 60; i++) {
    points.push({
      timestamp: now - i * 60000,
      value: baseValue + (Math.random() * 2 - 1) * baseValue * variance,
    });
  }
  return points;
}

function checkMongoDBConnection(): Promise<boolean> {
  return new Promise((resolve) => {
    if (mongoose.connection.readyState === 1) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

async function generateHealthResponse(): Promise<HealthResponse> {
  const dbConnected = await checkMongoDBConnection();
  const startTime = process.uptime();
  const loadAvg = os.loadavg();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const memUsage = ((totalMem - freeMem) / totalMem) * 100;

  const servicesHealth = SERVICES.map((service) => ({
    ...service,
    status: Math.random() > 0.95 ? 'degraded' : 'operational' as ServiceStatus,
    uptime: startTime + Math.random() * 1000000,
    responseTime: Math.random() * 100 + 50,
    lastChecked: new Date().toISOString(),
    metrics: {
      latency: generateMetrics(50),
      requestRate: generateMetrics(1000),
      errorRate: generateMetrics(0.5),
      cpuUsage: generateMetrics(60),
      memoryUsage: generateMetrics(70),
    },
  }));

  const clusterNodes = Array.from({ length: 3 }, (_, i) => ({
    id: `node-${i + 1}`,
    status: 'active' as const,
    role: i === 0 ? 'primary' : 'secondary' as const,
    region: 'us-east' as const,
    load: Math.random() * 80 + 20,
    connections: Math.floor(Math.random() * 1000),
    uptime: startTime + Math.random() * 100000,
  }));

  return {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    status: dbConnected ? 'operational' : 'degraded',
    version: process.env.APP_VERSION as any || '1.0.0',
    services: servicesHealth as any,
    cluster: {
      nodes: clusterNodes as any,
      activeNodes: clusterNodes.length as any,
      totalNodes: 3,
    },
    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      cpuCores: os.cpus().length,
      loadAverage: loadAvg[0],
      memoryUsage: memUsage,
      uptime: startTime,
    },
    database: {
      connected: dbConnected,
      type: 'mongodb',
      version: mongoose.version,
    },
  };
}

export async function GET() {
  try {
    await connectDB();
    const healthData = await generateHealthResponse();

    return NextResponse.json(healthData, {
      status: healthData.status === 'operational' ? 200 : 503,
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        status: 'error',
        error: 'Failed to generate health check response',
      },
      { status: 500 }
    );
  }
}
