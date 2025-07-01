
export interface Finding {
  id: string;
  reporter: string;
  submissionDate: string;
  domain: string;
  psm: string;
  path: string;
  httpMethod: string;
  employeeAccessLevel: string;
  description: string;
  curlCommand: string;
  findingId: string;
  evidence?: string[];
  riskCategory?: string;
  status: 'waiting_assignment' | 'waiting_review' | 'waiting_retest' | 'retesting' | 'closed' | 'invalid_waiting' | 'no_action_closed';
  currentPoc?: string;
  timeline: TimelineStage[];
}

export interface TimelineStage {
  stage: string;
  timestamp: string;
  completed: boolean;
  details?: any;
}

export interface RiskCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const mockRiskCategories: RiskCategory[] = [
  {
    id: 'data-exposure',
    name: 'Data Exposure',
    description: 'Potential exposure of sensitive data',
    color: '#dc2626',
    severity: 'critical'
  },
  {
    id: 'access-control',
    name: 'Access Control',
    description: 'Authentication and authorization issues',
    color: '#ea580c',
    severity: 'high'
  },
  {
    id: 'input-validation',
    name: 'Input Validation',
    description: 'Improper input validation vulnerabilities',
    color: '#d97706',
    severity: 'medium'
  },
  {
    id: 'configuration',
    name: 'Configuration',
    description: 'Security misconfigurations',
    color: '#059669',
    severity: 'low'
  },
  {
    id: 'unassigned',
    name: 'Unassigned',
    description: 'Findings awaiting risk categorization',
    color: '#6b7280',
    severity: 'medium'
  }
];

export const mockFindings: Finding[] = [
  {
    id: '1',
    reporter: 'John Smith',
    submissionDate: '2024-01-15',
    domain: 'api.company.com',
    psm: 'UserService',
    path: '/api/v1/users',
    httpMethod: 'GET',
    employeeAccessLevel: 'Standard',
    description: 'Sensitive user data exposed in API response',
    curlCommand: 'curl -X GET "https://api.company.com/api/v1/users" -H "Authorization: Bearer token123"',
    findingId: 'FIND-2024-001',
    evidence: ['screenshot1.png', 'screenshot2.png'],
    riskCategory: 'data-exposure',
    status: 'waiting_review',
    currentPoc: 'security-team@company.com',
    timeline: [
      {
        stage: 'Finding Submitted',
        timestamp: '2024-01-15T10:00:00Z',
        completed: true,
        details: {
          submitter: 'John Smith',
          submissionDate: '2024-01-15'
        }
      },
      {
        stage: 'Analysis Report Complete',
        timestamp: '2024-01-15T14:30:00Z',
        completed: true,
        details: {
          analysisType: 'Automated',
          riskLevel: 'High',
          category: 'Data Exposure'
        }
      }
    ]
  },
  {
    id: '2',
    reporter: 'Sarah Johnson',
    submissionDate: '2024-01-16',
    domain: 'web.company.com',
    psm: 'AuthService',
    path: '/login',
    httpMethod: 'POST',
    employeeAccessLevel: 'Admin',
    description: 'SQL injection vulnerability in login form',
    curlCommand: 'curl -X POST "https://web.company.com/login" -d "username=admin\' OR 1=1--&password=test"',
    findingId: 'FIND-2024-002',
    riskCategory: 'input-validation',
    status: 'retesting',
    currentPoc: 'dev-team@company.com',
    timeline: [
      {
        stage: 'Finding Submitted',
        timestamp: '2024-01-16T09:15:00Z',
        completed: true,
        details: {
          submitter: 'Sarah Johnson',
          submissionDate: '2024-01-16'
        }
      },
      {
        stage: 'RCA Root Cause Response',
        timestamp: '2024-01-17T16:45:00Z',
        completed: true,
        details: {
          rcaSummary: {
            riskLevel: 'High',
            rcaUpdateTimestamp: '2024-01-17T16:45:00Z',
            rootCauseType: 'Input Validation',
            rootCauseDescription: 'Inadequate parameterized query implementation'
          },
          trafficAnalysis: {
            leakedAssets: 'User credentials',
            enforcedPolicy: 'Input sanitization',
            leakageImpact: 'High - potential account takeover'
          },
          mitigationPlan: {
            relatedEnhancements: ['Parameterized queries', 'Input validation'],
            mitigationType: 'Code fix',
            enhancementProgress: '80%',
            scheduledFixDate: '2024-01-25'
          }
        }
      },
      {
        stage: 'Retest Phase',
        timestamp: '2024-01-24T11:20:00Z',
        completed: false,
        details: {
          retestDate: '2024-01-24',
          status: 'In Progress'
        }
      }
    ]
  },
  {
    id: '3',
    reporter: 'Mike Chen',
    submissionDate: '2024-01-17',
    domain: 'admin.company.com',
    psm: 'AdminPanel',
    path: '/admin/config',
    httpMethod: 'GET',
    employeeAccessLevel: 'Standard',
    description: 'Configuration file accessible without authentication',
    curlCommand: 'curl -X GET "https://admin.company.com/admin/config"',
    findingId: 'FIND-2024-003',
    status: 'waiting_assignment',
    timeline: [
      {
        stage: 'Finding Submitted',
        timestamp: '2024-01-17T13:45:00Z',
        completed: true,
        details: {
          submitter: 'Mike Chen',
          submissionDate: '2024-01-17'
        }
      }
    ]
  }
];
