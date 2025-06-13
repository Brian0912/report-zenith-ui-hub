
export interface Entity {
  id: string;
  psm: string;
  apiPath: string;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'active' | 'inactive' | 'deprecated';
}

export interface Risk {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface EntityRiskStatus {
  entityId: string;
  riskId: string;
  isAddressed: boolean;
}

export interface GovernanceGroup {
  id: string;
  name: string;
  description: string;
  entities: string[];
  riskId: string;
  createdAt: string;
  status: 'active' | 'completed' | 'draft';
}

export const mockEntities: Entity[] = [
  { id: '1', psm: 'UserService', apiPath: '/api/users', httpMethod: 'GET', status: 'active' },
  { id: '2', psm: 'UserService', apiPath: '/api/users', httpMethod: 'POST', status: 'active' },
  { id: '3', psm: 'UserService', apiPath: '/api/users/{id}', httpMethod: 'PUT', status: 'active' },
  { id: '4', psm: 'UserService', apiPath: '/api/users/{id}', httpMethod: 'DELETE', status: 'active' },
  { id: '5', psm: 'PaymentService', apiPath: '/api/payments', httpMethod: 'GET', status: 'active' },
  { id: '6', psm: 'PaymentService', apiPath: '/api/payments', httpMethod: 'POST', status: 'active' },
  { id: '7', psm: 'PaymentService', apiPath: '/api/payments/{id}/refund', httpMethod: 'POST', status: 'active' },
  { id: '8', psm: 'AuthService', apiPath: '/api/auth/login', httpMethod: 'POST', status: 'active' },
  { id: '9', psm: 'AuthService', apiPath: '/api/auth/logout', httpMethod: 'POST', status: 'active' },
  { id: '10', psm: 'AuthService', apiPath: '/api/auth/refresh', httpMethod: 'POST', status: 'active' },
  { id: '11', psm: 'NotificationService', apiPath: '/api/notifications', httpMethod: 'GET', status: 'active' },
  { id: '12', psm: 'NotificationService', apiPath: '/api/notifications/{id}', httpMethod: 'PUT', status: 'active' },
];

export const mockRisks: Risk[] = [
  { id: 'risk1', name: 'Data Privacy', description: 'Personal data exposure risks', severity: 'high' },
  { id: 'risk2', name: 'Authentication', description: 'Authentication bypass vulnerabilities', severity: 'critical' },
  { id: 'risk3', name: 'Rate Limiting', description: 'DoS and abuse prevention', severity: 'medium' },
  { id: 'risk4', name: 'Input Validation', description: 'Injection attack prevention', severity: 'high' },
  { id: 'risk5', name: 'Authorization', description: 'Access control vulnerabilities', severity: 'critical' },
];

export const mockEntityRiskStatuses: EntityRiskStatus[] = [
  { entityId: '1', riskId: 'risk1', isAddressed: true },
  { entityId: '1', riskId: 'risk2', isAddressed: false },
  { entityId: '2', riskId: 'risk1', isAddressed: false },
  { entityId: '2', riskId: 'risk4', isAddressed: true },
  { entityId: '8', riskId: 'risk2', isAddressed: true },
  { entityId: '8', riskId: 'risk5', isAddressed: false },
];

export const mockGovernanceGroups: GovernanceGroup[] = [
  {
    id: 'gov1',
    name: 'User Data Protection Initiative',
    description: 'Ensuring all user-related APIs comply with data privacy requirements',
    entities: ['1', '2', '3', '4'],
    riskId: 'risk1',
    createdAt: '2024-01-15',
    status: 'active',
  },
  {
    id: 'gov2',
    name: 'Authentication Security Review',
    description: 'Comprehensive review of authentication mechanisms',
    entities: ['8', '9', '10'],
    riskId: 'risk2',
    createdAt: '2024-01-20',
    status: 'completed',
  },
  {
    id: 'gov3',
    name: 'Payment Security Audit',
    description: 'Security assessment of payment-related endpoints',
    entities: ['5', '6', '7'],
    riskId: 'risk4',
    createdAt: '2024-02-01',
    status: 'active',
  },
];
