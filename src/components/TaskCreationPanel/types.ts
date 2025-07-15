
import { Flag, Bug, Users, Zap } from 'lucide-react';

export interface FormData {
  reportName: string;
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
    icon: Flag,
    options: [
      { key: 'high', label: 'High Priority', placeholder: 'Describe high priority reason...' },
      { key: 'medium', label: 'Medium Priority', placeholder: 'Describe medium priority reason...' },
      { key: 'low', label: 'Low Priority', placeholder: 'Describe low priority reason...' },
      { key: 'urgent', label: 'Urgent', placeholder: 'Describe urgency...' }
    ]
  },
  type: {
    name: 'Type',
    icon: Bug,
    options: [
      { key: 'feature', label: 'Feature Request', placeholder: 'Describe the feature...' },
      { key: 'bug', label: 'Bug Fix', placeholder: 'Describe the bug...' },
      { key: 'enhancement', label: 'Enhancement', placeholder: 'Describe the enhancement...' },
      { key: 'research', label: 'Research', placeholder: 'Describe research scope...' },
      { key: 'documentation', label: 'Documentation', placeholder: 'Describe documentation needs...' }
    ]
  },
  team: {
    name: 'Team',
    icon: Users,
    options: [
      { key: 'frontend', label: 'Frontend', placeholder: 'Frontend team details...' },
      { key: 'backend', label: 'Backend', placeholder: 'Backend team details...' },
      { key: 'design', label: 'Design', placeholder: 'Design team details...' },
      { key: 'qa', label: 'Quality Assurance', placeholder: 'QA team details...' },
      { key: 'devops', label: 'DevOps', placeholder: 'DevOps team details...' }
    ]
  },
  complexity: {
    name: 'Complexity',
    icon: Zap,
    options: [
      { key: 'simple', label: 'Simple', placeholder: 'Describe simplicity...' },
      { key: 'moderate', label: 'Moderate', placeholder: 'Describe moderate complexity...' },
      { key: 'complex', label: 'Complex', placeholder: 'Describe complexity...' },
      { key: 'expert', label: 'Expert Level', placeholder: 'Describe expert requirements...' }
    ]
  }
};

export const TEMPLATE_DATA: FormData = {
  reportName: 'Authentication System Security Report',
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
