
import { v4 as uuidv4 } from 'uuid';

export interface Report {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'running' | 'error' | 'queued';
  progress: number;
  createdAt: Date;
  isSubscribed: boolean;
  subscriberCount: number;
  pointOfContact: {
    name: string;
    avatar: string;
    isOnline: boolean;
    role: string;
  };
  schedule: {
    lastRun: Date;
    nextRun: Date;
    frequency?: string;
  };
  versions: Array<{
    id: string;
    version: string;
    createdAt: Date;
    createdBy: string;
    goal: string;
    background: string;
    status?: 'completed' | 'running' | 'error' | 'queued';
    metadata?: Record<string, unknown>;
    reportUrl?: string;
  }>;
  supportEvidences: Array<{
    id: string;
    filename: string;
    size: number;
    generatedAt: Date;
  }>;
  logs: Array<{
    id: string;
    timestamp: Date;
    level: 'info' | 'warning' | 'error' | 'debug';
    stage: string;
    message: string;
  }>;
  // New fields from task creation
  taskCreation?: {
    goal: string;
    analysisType: 'situational' | 'impact';
    background: string;
    timeRange: {
      start: Date;
      end: Date;
    };
    metadata: Array<{
      id: string;
      category: string;
      key: string;
      value: string;
    }>;
  };
}

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'User Authentication System Analysis',
    description: 'Comprehensive security analysis of our user authentication system to identify vulnerabilities and recommend improvements.',
    status: 'completed',
    progress: 100,
    isSubscribed: true,
    subscriberCount: 15,
    createdAt: new Date('2024-01-15T09:30:00Z'),
    pointOfContact: {
      name: 'Sarah Chen',
      avatar: 'SC',
      isOnline: true,
      role: 'Security Engineer'
    },
    schedule: {
      lastRun: new Date('2024-01-15T14:45:00Z'),
      nextRun: new Date('2024-01-22T09:30:00Z'),
      frequency: 'Weekly'
    },
    versions: [
      {
        id: 'v1-1',
        version: '1.0',
        createdAt: new Date('2024-01-15T09:30:00Z'),
        createdBy: 'Sarah Chen',
        goal: 'Analyze the security vulnerabilities in our current authentication system',
        background: 'Recent security audits have highlighted potential weaknesses in our user authentication flow.',
        status: 'completed',
        reportUrl: '/reports/auth-analysis-v1.pdf',
        metadata: {
          priority: ['high'],
          type: ['research'],
          team: ['backend']
        }
      }
    ],
    supportEvidences: [
      {
        id: 'se1-1',
        filename: 'authentication_analysis.pdf',
        size: 2048576,
        generatedAt: new Date('2024-01-15T14:45:00Z')
      }
    ],
    logs: [
      {
        id: 'log1-1',
        timestamp: new Date('2024-01-15T09:31:00Z'),
        level: 'info',
        stage: 'INITIALIZATION',
        message: 'Starting authentication system analysis'
      },
      {
        id: 'log1-2',
        timestamp: new Date('2024-01-15T10:15:00Z'),
        level: 'info',
        stage: 'DATA_COLLECTION',
        message: 'Collected 1,247 authentication logs from the past 30 days'
      },
      {
        id: 'log1-3',
        timestamp: new Date('2024-01-15T12:30:00Z'),
        level: 'warning',
        stage: 'ANALYSIS',
        message: 'Detected 23 failed login attempts from suspicious IP addresses'
      },
      {
        id: 'log1-4',
        timestamp: new Date('2024-01-15T14:45:00Z'),
        level: 'info',
        stage: 'COMPLETION',
        message: 'Analysis completed successfully. Report generated.'
      }
    ],
    taskCreation: {
      goal: 'Create a comprehensive security analysis of our user authentication system to identify vulnerabilities and recommend improvements.',
      analysisType: 'situational',
      background: 'Our current authentication system has been in place for 2 years without major updates. Recent security audits have highlighted potential weaknesses, and we need to understand the current state before implementing improvements.',
      timeRange: {
        start: new Date('2023-12-15T00:00:00Z'),
        end: new Date('2024-01-15T00:00:00Z')
      },
      metadata: [
        {
          id: '1',
          category: 'priority',
          key: 'high',
          value: 'Critical security issue requiring immediate attention'
        },
        {
          id: '2',
          category: 'type',
          key: 'research',
          value: 'Security vulnerability assessment'
        },
        {
          id: '3',
          category: 'team',
          key: 'backend',
          value: 'Backend security team responsible for implementation'
        }
      ]
    }
  },
  {
    id: '2',
    title: 'E-commerce Platform Performance Optimization',
    description: 'Performance analysis and optimization recommendations for our e-commerce platform to improve loading times and user experience.',
    status: 'running',
    progress: 60,
    isSubscribed: false,
    subscriberCount: 8,
    createdAt: new Date('2024-02-01T11:00:00Z'),
    pointOfContact: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      isOnline: true,
      role: 'Performance Engineer'
    },
    schedule: {
      lastRun: new Date('2024-02-08T16:20:00Z'),
      nextRun: new Date('2024-02-15T11:00:00Z'),
      frequency: 'Weekly'
    },
    versions: [
      {
        id: 'v2-1',
        version: '1.0',
        createdAt: new Date('2024-02-01T11:00:00Z'),
        createdBy: 'Alex Johnson',
        goal: 'Improve the loading speed and overall performance of our e-commerce platform',
        background: 'Users have reported slow loading times, especially during peak hours, leading to a high bounce rate.',
        status: 'running'
      }
    ],
    supportEvidences: [
      {
        id: 'se2-1',
        filename: 'performance_metrics.xlsx',
        size: 1536000,
        generatedAt: new Date('2024-02-08T16:20:00Z')
      }
    ],
    logs: [
      {
        id: 'log2-1',
        timestamp: new Date('2024-02-01T11:05:00Z'),
        level: 'info',
        stage: 'INITIALIZATION',
        message: 'Starting performance optimization analysis'
      },
      {
        id: 'log2-2',
        timestamp: new Date('2024-02-02T08:40:00Z'),
        level: 'info',
        stage: 'DATA_COLLECTION',
        message: 'Collected server response times and user interaction data'
      },
      {
        id: 'log2-3',
        timestamp: new Date('2024-02-05T13:55:00Z'),
        level: 'warning',
        stage: 'ANALYSIS',
        message: 'Identified unoptimized images as a major cause of slow loading times'
      },
      {
        id: 'log2-4',
        timestamp: new Date('2024-02-08T16:20:00Z'),
        level: 'info',
        stage: 'COMPLETION',
        message: 'Optimization analysis in progress. Report will be generated soon.'
      }
    ]
  },
  {
    id: '3',
    title: 'Mobile App Redesign Project',
    description: 'User experience analysis and redesign recommendations for our mobile application interface.',
    status: 'queued',
    progress: 20,
    isSubscribed: true,
    subscriberCount: 12,
    createdAt: new Date('2024-02-15T14:15:00Z'),
    pointOfContact: {
      name: 'Emily White',
      avatar: 'EW',
      isOnline: false,
      role: 'UX Designer'
    },
    schedule: {
      lastRun: new Date('2024-02-15T14:15:00Z'),
      nextRun: new Date('2024-02-22T14:15:00Z'),
      frequency: 'Weekly'
    },
    versions: [
      {
        id: 'v3-1',
        version: '1.0',
        createdAt: new Date('2024-02-15T14:15:00Z'),
        createdBy: 'Emily White',
        goal: 'Redesign the user interface of our mobile app to improve user experience',
        background: 'User feedback indicates that the current app interface is outdated and difficult to navigate.',
        status: 'queued'
      }
    ],
    supportEvidences: [
      {
        id: 'se3-1',
        filename: 'user_feedback_summary.docx',
        size: 819200,
        generatedAt: new Date('2024-02-15T14:15:00Z')
      }
    ],
    logs: [
      {
        id: 'log3-1',
        timestamp: new Date('2024-02-15T14:20:00Z'),
        level: 'info',
        stage: 'INITIALIZATION',
        message: 'Starting mobile app redesign project'
      },
      {
        id: 'log3-2',
        timestamp: new Date('2024-02-16T10:30:00Z'),
        level: 'info',
        stage: 'DATA_COLLECTION',
        message: 'Gathering user feedback and analyzing current app usage patterns'
      },
      {
        id: 'log3-3',
        timestamp: new Date('2024-02-18T15:45:00Z'),
        level: 'info',
        stage: 'DESIGN',
        message: 'Creating wireframes and mockups for the new app interface'
      }
    ]
  },
  {
    id: '4',
    title: 'Customer Churn Prediction Model',
    description: 'Machine learning model development to predict customer churn and identify at-risk customers.',
    status: 'error',
    progress: 0,
    isSubscribed: false,
    subscriberCount: 6,
    createdAt: new Date('2024-03-01T08:00:00Z'),
    pointOfContact: {
      name: 'David Brown',
      avatar: 'DB',
      isOnline: true,
      role: 'Data Scientist'
    },
    schedule: {
      lastRun: new Date('2024-03-01T08:00:00Z'),
      nextRun: new Date('2024-03-08T08:00:00Z'),
      frequency: 'Weekly'
    },
    versions: [
      {
        id: 'v4-1',
        version: '1.0',
        createdAt: new Date('2024-03-01T08:00:00Z'),
        createdBy: 'David Brown',
        goal: 'Develop a machine learning model to predict customer churn',
        background: 'We are experiencing a high rate of customer churn, and we need to identify at-risk customers to take proactive measures.',
        status: 'error'
      }
    ],
    supportEvidences: [
      {
        id: 'se4-1',
        filename: 'customer_data.csv',
        size: 4194304,
        generatedAt: new Date('2024-03-01T08:00:00Z')
      }
    ],
    logs: [
      {
        id: 'log4-1',
        timestamp: new Date('2024-03-01T08:05:00Z'),
        level: 'info',
        stage: 'INITIALIZATION',
        message: 'Starting customer churn prediction model'
      },
      {
        id: 'log4-2',
        timestamp: new Date('2024-03-01T09:20:00Z'),
        level: 'info',
        stage: 'DATA_COLLECTION',
        message: 'Loading customer data from the database'
      },
      {
        id: 'log4-3',
        timestamp: new Date('2024-03-01T10:45:00Z'),
        level: 'error',
        stage: 'MODEL_TRAINING',
        message: 'Error: Insufficient data for model training. Please provide more data.'
      }
    ]
  },
  {
    id: '5',
    title: 'Website Security Enhancement Project',
    description: 'Comprehensive security audit and enhancement recommendations for our website infrastructure.',
    status: 'completed',
    progress: 100,
    isSubscribed: true,
    subscriberCount: 22,
    createdAt: new Date('2024-03-10T10:30:00Z'),
    pointOfContact: {
      name: 'Linda Green',
      avatar: 'LG',
      isOnline: false,
      role: 'Security Analyst'
    },
    schedule: {
      lastRun: new Date('2024-03-15T15:00:00Z'),
      nextRun: new Date('2024-03-22T10:30:00Z'),
      frequency: 'Monthly'
    },
    versions: [
      {
        id: uuidv4(),
        version: '1.0',
        createdAt: new Date('2024-03-10T10:30:00Z'),
        createdBy: 'Linda Green',
        goal: 'Enhance the security of our website to protect against cyber threats',
        background: 'Recent reports indicate an increase in cyber attacks targeting websites, and we need to strengthen our defenses.',
        status: 'completed',
        reportUrl: '/reports/security-audit-v1.pdf'
      }
    ],
    supportEvidences: [
      {
        id: uuidv4(),
        filename: 'security_audit_report.pdf',
        size: 2621440,
        generatedAt: new Date('2024-03-15T15:00:00Z')
      }
    ],
    logs: [
      {
        id: uuidv4(),
        timestamp: new Date('2024-03-10T10:35:00Z'),
        level: 'info',
        stage: 'INITIALIZATION',
        message: 'Starting website security enhancement project'
      },
      {
        id: uuidv4(),
        timestamp: new Date('2024-03-11T09:00:00Z'),
        level: 'info',
        stage: 'VULNERABILITY_SCAN',
        message: 'Scanning the website for potential vulnerabilities'
      },
      {
        id: uuidv4(),
        timestamp: new Date('2024-03-13T14:20:00Z'),
        level: 'warning',
        stage: 'PATCH_APPLICATION',
        message: 'Applied security patches to address identified vulnerabilities'
      },
      {
        id: uuidv4(),
        timestamp: new Date('2024-03-15T15:00:00Z'),
        level: 'info',
        stage: 'COMPLETION',
        message: 'Website security enhancement project completed successfully'
      }
    ]
  }
];
