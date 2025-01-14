export type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance';
export type ServiceType = 'api' | 'database' | 'cache' | 'storage' | 'auth' | 'compute' | 'network';
export type Region = 'us-east' | 'us-west' | 'eu-central' | 'ap-south';
export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface MetricDataPoint {
  timestamp: number;
  value: number;
}

export interface ServiceMetrics {
  latency: MetricDataPoint[];
  requestRate: MetricDataPoint[];
  errorRate: MetricDataPoint[];
  cpuUsage: MetricDataPoint[];
  memoryUsage: MetricDataPoint[];
}

export interface ServiceHealth {
  id: string;
  name: string;
  type: ServiceType;
  status: ServiceStatus;
  uptime: number;
  responseTime: number;
  lastChecked: string;
  metrics: ServiceMetrics;
  region: Region;
  version: string;
  dependencies: string[];
}

export interface ClusterNode {
  id: string;
  status: 'active' | 'standby';
  role: 'primary' | 'secondary' | 'arbiter';
  region: Region;
  load: number;
  connections: number;
  uptime: number;
}

export interface LoadBalancerStats {
  activeConnections: number;
  requestsPerSecond: number;
  bandwidthUsage: number;
  sslHandshakeTime: number;
  sessionPersistence: number;
}

export interface SecurityMetrics {
  threatLevel: Severity;
  activeThreats: number;
  mitigatedThreats: number;
  lastIncident: string | null;
  firewallRules: number;
  certificateExpiry: string;
}

export interface ResourceUtilization {
  cpu: number;
  memory: number;
  storage: number;
  network: {
    ingress: number;
    egress: number;
    latency: number;
  };
}

export interface HealthResponse {
  timestamp: string;
  environment: string;
  status: ServiceStatus;
  version: {
    api: string;
    database: string;
    frontend: string;
  };
  services: ServiceHealth[];
  cluster: {
    nodes?: ClusterNode[];
    activeNodes?: any;
    totalNodes?: any;
    health?: number;
    replicationLag?: number;
  };
  system?: any;
  database?: any;
  loadBalancer?: LoadBalancerStats;
  security?: SecurityMetrics;
  resources?: ResourceUtilization;
  maintenance?: {
    scheduled: boolean;
    nextWindow: string | null;
  };
  performance?: {
    averageResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    requestThroughput: number;
    errorRate: number;
  };
}
