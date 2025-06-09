
export interface Report {
  id: string;
  title: string;
  description: string;
  status: 'running' | 'completed' | 'error' | 'queued';
  type: string;
  progress: number;
  version: string;
  pointOfContact: {
    name: string;
    role: string;
    avatar: string;
    isOnline: boolean;
  };
  schedule: {
    frequency: string;
    nextRun: Date;
    lastRun: Date;
  };
  isSubscribed: boolean;
  subscriberCount: number;
  createdAt: Date;
  tags: string[];
}

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Monthly Sales Performance',
    description: 'Comprehensive analysis of sales metrics, performance indicators, and revenue trends across all regions and product lines.',
    status: 'completed',
    type: 'Analytics',
    progress: 100,
    version: 'v2.1',
    pointOfContact: {
      name: 'Sarah Chen',
      role: 'Sales Manager',
      avatar: 'SC',
      isOnline: true
    },
    schedule: {
      frequency: 'Monthly',
      nextRun: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      lastRun: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    isSubscribed: true,
    subscriberCount: 24,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    tags: ['Sales', 'Revenue', 'Monthly']
  },
  {
    id: '2',
    title: 'Customer Acquisition Metrics',
    description: 'Detailed breakdown of customer acquisition channels, conversion rates, and cost analysis for marketing optimization.',
    status: 'running',
    type: 'Marketing',
    progress: 65,
    version: 'v1.8',
    pointOfContact: {
      name: 'Mike Rodriguez',
      role: 'Marketing Director',
      avatar: 'MR',
      isOnline: false
    },
    schedule: {
      frequency: 'Weekly',
      nextRun: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    isSubscribed: false,
    subscriberCount: 18,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    tags: ['Marketing', 'Acquisition', 'Weekly']
  },
  {
    id: '3',
    title: 'Financial Compliance Audit',
    description: 'Quarterly compliance check ensuring adherence to financial regulations and internal audit requirements.',
    status: 'error',
    type: 'Compliance',
    progress: 45,
    version: 'v3.2',
    pointOfContact: {
      name: 'Emily Watson',
      role: 'Compliance Officer',
      avatar: 'EW',
      isOnline: true
    },
    schedule: {
      frequency: 'Quarterly',
      nextRun: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    isSubscribed: true,
    subscriberCount: 8,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    tags: ['Compliance', 'Audit', 'Quarterly']
  },
  {
    id: '4',
    title: 'Product Usage Analytics',
    description: 'User behavior analysis, feature adoption rates, and product performance metrics for strategic planning.',
    status: 'queued',
    type: 'Product',
    progress: 0,
    version: 'v1.5',
    pointOfContact: {
      name: 'David Kim',
      role: 'Product Manager',
      avatar: 'DK',
      isOnline: true
    },
    schedule: {
      frequency: 'Daily',
      nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000),
      lastRun: new Date(Date.now() - 18 * 60 * 60 * 1000)
    },
    isSubscribed: false,
    subscriberCount: 32,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    tags: ['Product', 'Analytics', 'Daily']
  },
  {
    id: '5',
    title: 'Infrastructure Performance',
    description: 'System performance monitoring, uptime analysis, and resource utilization across all production environments.',
    status: 'completed',
    type: 'Operations',
    progress: 100,
    version: 'v2.7',
    pointOfContact: {
      name: 'Alex Thompson',
      role: 'DevOps Engineer',
      avatar: 'AT',
      isOnline: false
    },
    schedule: {
      frequency: 'Hourly',
      nextRun: new Date(Date.now() + 30 * 60 * 1000),
      lastRun: new Date(Date.now() - 30 * 60 * 1000)
    },
    isSubscribed: true,
    subscriberCount: 12,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    tags: ['Operations', 'Performance', 'Hourly']
  },
  {
    id: '6',
    title: 'Employee Satisfaction Survey',
    description: 'Comprehensive survey analysis of employee satisfaction, engagement metrics, and workplace culture insights.',
    status: 'running',
    type: 'HR',
    progress: 78,
    version: 'v1.3',
    pointOfContact: {
      name: 'Lisa Park',
      role: 'HR Director',
      avatar: 'LP',
      isOnline: true
    },
    schedule: {
      frequency: 'Bi-annual',
      nextRun: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    isSubscribed: false,
    subscriberCount: 28,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    tags: ['HR', 'Survey', 'Bi-annual']
  }
];
