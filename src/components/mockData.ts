export interface TaskVersion {
  id: string;
  version: string;
  createdAt: Date;
  createdBy: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  goal: string;
  background: string;
  metadata: Record<string, string[]>;
  reportUrl?: string;
  evidenceFiles: string[];
}

export interface TaskLogs {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info' | 'debug';
  stage: string;
  message: string;
  details?: any;
}

export interface SupportEvidence {
  id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  generatedAt: Date;
  versionId: string;
}

export interface ExportOptions {
  completePackage: boolean;
  pdfOnly: boolean;
  evidenceOnly: boolean;
  rawData: boolean;
  versionComparison: boolean;
  allVersions: boolean;
}

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
  versions: TaskVersion[];
  logs: TaskLogs[];
  supportEvidences: SupportEvidence[];
  currentGoal: string;
  currentBackground: string;
  currentMetadata: Record<string, string[]>;
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
    tags: ['Sales', 'Revenue', 'Monthly'],
    currentGoal: 'Analyze monthly sales performance across all regions and identify growth opportunities',
    currentBackground: 'Q4 sales data shows declining trends in certain regions. Need comprehensive analysis to understand causes and recommend actions.',
    currentMetadata: {
      'Employee': ['john.doe@company.com', 'sarah.chen@company.com'],
      'Traffic': ['organic', 'paid-ads'],
      'Policy': ['GDPR', 'SOX-compliance']
    },
    versions: [
      {
        id: 'v1',
        version: 'v1.0',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        createdBy: 'Sarah Chen',
        status: 'completed',
        goal: 'Basic sales performance analysis',
        background: 'Initial request for sales data overview',
        metadata: {
          'Employee': ['john.doe@company.com'],
          'Traffic': ['organic']
        },
        reportUrl: '/reports/sales-v1.pdf',
        evidenceFiles: ['sales-data-v1.csv', 'regional-breakdown-v1.csv']
      },
      {
        id: 'v2',
        version: 'v2.1',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        createdBy: 'Sarah Chen',
        status: 'completed',
        goal: 'Analyze monthly sales performance across all regions and identify growth opportunities',
        background: 'Q4 sales data shows declining trends in certain regions. Need comprehensive analysis to understand causes and recommend actions.',
        metadata: {
          'Employee': ['john.doe@company.com', 'sarah.chen@company.com'],
          'Traffic': ['organic', 'paid-ads'],
          'Policy': ['GDPR', 'SOX-compliance']
        },
        reportUrl: '/reports/sales-v2.pdf',
        evidenceFiles: ['sales-data-v2.csv', 'regional-breakdown-v2.csv', 'competitor-analysis-v2.csv']
      }
    ],
    logs: [
      {
        id: 'log1',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        level: 'info',
        stage: 'Data Collection',
        message: 'Successfully collected sales data from all regions'
      },
      {
        id: 'log2',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        level: 'info',
        stage: 'Analysis',
        message: 'Completed trend analysis and pattern recognition'
      },
      {
        id: 'log3',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        level: 'info',
        stage: 'Report Generation',
        message: 'PDF report generated successfully'
      }
    ],
    supportEvidences: [
      {
        id: 'ev1',
        filename: 'sales-data-v2.csv',
        size: 1024000,
        type: 'csv',
        url: '/evidences/sales-data-v2.csv',
        generatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        versionId: 'v2'
      },
      {
        id: 'ev2',
        filename: 'regional-breakdown-v2.csv',
        size: 512000,
        type: 'csv',
        url: '/evidences/regional-breakdown-v2.csv',
        generatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        versionId: 'v2'
      }
    ]
  },
  {
    id: '2',
    title: 'Customer Acquisition Metrics Customer Acquisition Metrics Customer Acquisition Metrics',
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
    tags: ['Marketing', 'Acquisition', 'Weekly'],
    currentGoal: 'Optimize customer acquisition channels and reduce acquisition costs',
    currentBackground: 'Current acquisition costs are increasing while conversion rates are declining',
    currentMetadata: {
      'Employee': ['mike.rodriguez@company.com'],
      'Traffic': ['social-media', 'email', 'organic'],
      'Policy': ['GDPR']
    },
    versions: [
      {
        id: 'v1',
        version: 'v1.8',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        createdBy: 'Mike Rodriguez',
        status: 'processing',
        goal: 'Optimize customer acquisition channels and reduce acquisition costs',
        background: 'Current acquisition costs are increasing while conversion rates are declining',
        metadata: {
          'Employee': ['mike.rodriguez@company.com'],
          'Traffic': ['social-media', 'email', 'organic'],
          'Policy': ['GDPR']
        },
        evidenceFiles: ['acquisition-data.csv']
      }
    ],
    logs: [
      {
        id: 'log1',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        level: 'info',
        stage: 'Data Collection',
        message: 'Collecting acquisition data from marketing platforms'
      }
    ],
    supportEvidences: []
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
    tags: ['Compliance', 'Audit', 'Quarterly'],
    currentGoal: 'Conduct comprehensive financial compliance audit for Q4',
    currentBackground: 'Quarterly audit to ensure compliance with financial regulations and internal policies',
    currentMetadata: {
      'Employee': ['emily.watson@company.com', 'audit.team@company.com'],
      'Policy': ['SOX-compliance', 'GDPR', 'PCI-DSS']
    },
    versions: [
      {
        id: 'v1',
        version: 'v3.2',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        createdBy: 'Emily Watson',
        status: 'failed',
        goal: 'Conduct comprehensive financial compliance audit for Q4',
        background: 'Quarterly audit to ensure compliance with financial regulations and internal policies',
        metadata: {
          'Employee': ['emily.watson@company.com', 'audit.team@company.com'],
          'Policy': ['SOX-compliance', 'GDPR', 'PCI-DSS']
        },
        evidenceFiles: []
      }
    ],
    logs: [
      {
        id: 'log1',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        level: 'error',
        stage: 'Data Validation',
        message: 'Failed to validate financial data integrity'
      }
    ],
    supportEvidences: []
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
    tags: ['Product', 'Analytics', 'Daily'],
    currentGoal: 'Analyze user behavior patterns and feature adoption rates',
    currentBackground: 'Need insights into user engagement and feature usage to guide product roadmap',
    currentMetadata: {
      'Employee': ['david.kim@company.com', 'product.team@company.com'],
      'Traffic': ['web', 'mobile', 'api']
    },
    versions: [
      {
        id: 'v1',
        version: 'v1.5',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        createdBy: 'David Kim',
        status: 'draft',
        goal: 'Analyze user behavior patterns and feature adoption rates',
        background: 'Need insights into user engagement and feature usage to guide product roadmap',
        metadata: {
          'Employee': ['david.kim@company.com', 'product.team@company.com'],
          'Traffic': ['web', 'mobile', 'api']
        },
        evidenceFiles: []
      }
    ],
    logs: [],
    supportEvidences: []
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
    tags: ['Operations', 'Performance', 'Hourly'],
    currentGoal: 'Monitor system performance and identify optimization opportunities',
    currentBackground: 'Regular monitoring of production infrastructure to ensure optimal performance',
    currentMetadata: {
      'Employee': ['alex.thompson@company.com'],
      'Traffic': ['api', 'web'],
      'Policy': ['security-policy']
    },
    versions: [
      {
        id: 'v1',
        version: 'v2.7',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        createdBy: 'Alex Thompson',
        status: 'completed',
        goal: 'Monitor system performance and identify optimization opportunities',
        background: 'Regular monitoring of production infrastructure to ensure optimal performance',
        metadata: {
          'Employee': ['alex.thompson@company.com'],
          'Traffic': ['api', 'web'],
          'Policy': ['security-policy']
        },
        reportUrl: '/reports/infrastructure-v2.pdf',
        evidenceFiles: ['performance-metrics.csv', 'resource-usage.csv']
      }
    ],
    logs: [
      {
        id: 'log1',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        level: 'info',
        stage: 'Monitoring',
        message: 'Performance metrics collected successfully'
      }
    ],
    supportEvidences: [
      {
        id: 'ev1',
        filename: 'performance-metrics.csv',
        size: 256000,
        type: 'csv',
        url: '/evidences/performance-metrics.csv',
        generatedAt: new Date(Date.now() - 15 * 60 * 1000),
        versionId: 'v1'
      }
    ]
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
    tags: ['HR', 'Survey', 'Bi-annual'],
    currentGoal: 'Analyze employee satisfaction and workplace culture metrics',
    currentBackground: 'Bi-annual survey to assess employee engagement and identify improvement areas',
    currentMetadata: {
      'Employee': ['lisa.park@company.com', 'hr.team@company.com'],
      'Policy': ['privacy-policy', 'GDPR']
    },
    versions: [
      {
        id: 'v1',
        version: 'v1.3',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        createdBy: 'Lisa Park',
        status: 'processing',
        goal: 'Analyze employee satisfaction and workplace culture metrics',
        background: 'Bi-annual survey to assess employee engagement and identify improvement areas',
        metadata: {
          'Employee': ['lisa.park@company.com', 'hr.team@company.com'],
          'Policy': ['privacy-policy', 'GDPR']
        },
        evidenceFiles: ['survey-responses.csv']
      }
    ],
    logs: [
      {
        id: 'log1',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        level: 'info',
        stage: 'Data Processing',
        message: 'Processing survey responses and generating insights'
      }
    ],
    supportEvidences: []
  }
];
