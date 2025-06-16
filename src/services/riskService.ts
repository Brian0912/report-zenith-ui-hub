
import { Risk } from '../components/risk-management/mockRiskData';

export const mockRisks: Risk[] = [
  {
    id: 'risk1',
    name: 'Authentication Risk',
    severity: 'high',
    description: 'APIs without proper authentication mechanisms'
  },
  {
    id: 'risk2',
    name: 'Data Exposure Risk',
    severity: 'critical',
    description: 'APIs that may expose sensitive data'
  },
  {
    id: 'risk3',
    name: 'Rate Limiting Risk',
    severity: 'medium',
    description: 'APIs without proper rate limiting'
  },
  {
    id: 'risk4',
    name: 'Input Validation Risk',
    severity: 'high',
    description: 'APIs with insufficient input validation'
  },
  {
    id: 'risk5',
    name: 'CORS Policy Risk',
    severity: 'medium',
    description: 'APIs with misconfigured CORS policies'
  },
  {
    id: 'risk6',
    name: 'SQL Injection Risk',
    severity: 'critical',
    description: 'APIs vulnerable to SQL injection attacks'
  },
  {
    id: 'risk7',
    name: 'API Versioning Risk',
    severity: 'low',
    description: 'APIs without proper versioning strategy'
  },
  {
    id: 'risk8',
    name: 'Logging Security Risk',
    severity: 'medium',
    description: 'APIs that log sensitive information'
  }
];

export async function fetchRisks(): Promise<Risk[]> {
  return Promise.resolve(mockRisks);
}
