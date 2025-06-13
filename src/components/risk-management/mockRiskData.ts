
export interface Entity {
  id: string;
  psm: string;
  apiPath: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  riskStatus: Record<string, {
    isResolved: boolean;
    latestGovernanceId?: string;
  }>;
}

export interface Risk {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface GovernanceGroup {
  id: string;
  name: string;
  createdDate: string;
  riskId: string;
  entityIds: string[];
  status: 'active' | 'completed' | 'pending';
  complianceRate: number;
}

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
  }
];

export const mockEntities: Entity[] = [
  {
    id: 'entity1',
    psm: 'UserService',
    apiPath: '/api/users',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov1' },
      risk2: { isResolved: false, latestGovernanceId: 'gov2' },
      risk3: { isResolved: true, latestGovernanceId: 'gov1' },
      risk4: { isResolved: false, latestGovernanceId: 'gov3' }
    }
  },
  {
    id: 'entity2',
    psm: 'UserService',
    apiPath: '/api/users',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov2' },
      risk2: { isResolved: true, latestGovernanceId: 'gov1' },
      risk3: { isResolved: false, latestGovernanceId: 'gov3' },
      risk4: { isResolved: true, latestGovernanceId: 'gov2' }
    }
  },
  {
    id: 'entity3',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov1' },
      risk2: { isResolved: true, latestGovernanceId: 'gov2' },
      risk3: { isResolved: false, latestGovernanceId: 'gov3' },
      risk4: { isResolved: true, latestGovernanceId: 'gov1' }
    }
  },
  {
    id: 'entity4',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov2' },
      risk2: { isResolved: false, latestGovernanceId: 'gov3' },
      risk3: { isResolved: true, latestGovernanceId: 'gov1' },
      risk4: { isResolved: false, latestGovernanceId: 'gov2' }
    }
  },
  {
    id: 'entity5',
    psm: 'AuthService',
    apiPath: '/api/auth/login',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov1' },
      risk2: { isResolved: true, latestGovernanceId: 'gov1' },
      risk3: { isResolved: true, latestGovernanceId: 'gov2' },
      risk4: { isResolved: true, latestGovernanceId: 'gov1' }
    }
  },
  {
    id: 'entity6',
    psm: 'AuthService',
    apiPath: '/api/auth/logout',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov3' },
      risk2: { isResolved: true, latestGovernanceId: 'gov2' },
      risk3: { isResolved: false, latestGovernanceId: 'gov3' },
      risk4: { isResolved: true, latestGovernanceId: 'gov2' }
    }
  }
];

export const mockGovernanceGroups: GovernanceGroup[] = [
  {
    id: 'gov1',
    name: 'Q4 2024 Security Audit',
    createdDate: '2024-10-01',
    riskId: 'risk1',
    entityIds: ['entity1', 'entity3', 'entity5'],
    status: 'completed',
    complianceRate: 85
  },
  {
    id: 'gov2',
    name: 'Data Protection Review',
    createdDate: '2024-11-15',
    riskId: 'risk2',
    entityIds: ['entity1', 'entity2', 'entity4'],
    status: 'active',
    complianceRate: 60
  },
  {
    id: 'gov3',
    name: 'Input Validation Assessment',
    createdDate: '2024-12-01',
    riskId: 'risk4',
    entityIds: ['entity2', 'entity4', 'entity6'],
    status: 'pending',
    complianceRate: 30
  }
];
