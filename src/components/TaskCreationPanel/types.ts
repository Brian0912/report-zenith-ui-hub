
export interface FormData {
  goal: string;
  analysisType: 'situational' | 'impact' | '';
  background: string;
  timeRange: { start: Date; end: Date } | null;
  metadata: MetadataItemType[];
}

export interface MetadataItemType {
  id: string;
  category: keyof typeof METADATA_CATEGORIES;
  key: string;
  value: string;
}

export type FormAction =
  | { type: 'SET_FIELD'; field: keyof Omit<FormData, 'metadata' | 'timeRange'>; value: string }
  | { type: 'SET_ANALYSIS_TYPE'; value: 'situational' | 'impact' | '' }
  | { type: 'SET_TIME_RANGE'; value: { start: Date; end: Date } | null }
  | { type: 'ADD_METADATA'; item: MetadataItemType }
  | { type: 'UPDATE_METADATA'; id: string; value: string }
  | { type: 'REMOVE_METADATA'; id: string }
  | { type: 'SET_ALL'; data: FormData };

export const METADATA_CATEGORIES = {
  priority: {
    name: 'Priority',
    options: {
      high: 'High Priority',
      medium: 'Medium Priority',
      low: 'Low Priority',
      urgent: 'Urgent'
    }
  },
  type: {
    name: 'Type',
    options: {
      feature: 'Feature Request',
      bug: 'Bug Fix',
      enhancement: 'Enhancement',
      research: 'Research',
      documentation: 'Documentation'
    }
  },
  team: {
    name: 'Team',
    options: {
      frontend: 'Frontend',
      backend: 'Backend',
      design: 'Design',
      qa: 'Quality Assurance',
      devops: 'DevOps'
    }
  },
  complexity: {
    name: 'Complexity',
    options: {
      simple: 'Simple',
      moderate: 'Moderate',
      complex: 'Complex',
      expert: 'Expert Level'
    }
  }
};

export const TEMPLATE_DATA: FormData = {
  goal: 'Create a secure authentication system for the web application that supports user registration, login, password reset, and role-based access control.',
  analysisType: 'situational',
  background: 'Our current application lacks proper user authentication, which is blocking the deployment to production. We need to implement a comprehensive authentication system that integrates with our existing React frontend and Node.js backend. The system should support different user roles (admin, user, guest) and include security features like password hashing, JWT tokens, and rate limiting. We have attempted basic implementations before but faced issues with session management and security vulnerabilities.',
  timeRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date()
  },
  metadata: [
    {
      id: '1',
      category: 'priority',
      key: 'high',
      value: 'Blocking production deployment'
    },
    {
      id: '2',
      category: 'type',
      key: 'feature',
      value: 'Core system feature'
    },
    {
      id: '3',
      category: 'complexity',
      key: 'complex',
      value: 'Requires security expertise'
    }
  ]
};
