
export interface Entity {
  id: string;
  psm: string;
  apiPath: string;
  httpMethod: string;
  status: 'active' | 'deprecated' | 'maintenance';
  fixedRisks: Record<string, boolean>;
}

export interface Risk {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface GovernanceGroup {
  id: string;
  name: string;
  riskId: string;
  entityIds: string[];
  createdAt: string;
  status: 'active' | 'completed' | 'archived';
}

export const mockRisks: Risk[] = [
  { id: 'risk1', name: 'Risk 1', description: 'Authentication Security', severity: 'high' },
  { id: 'risk2', name: 'Risk 2', description: 'Data Validation', severity: 'medium' },
  { id: 'risk3', name: 'Risk 3', description: 'Rate Limiting', severity: 'low' },
  { id: 'risk4', name: 'Risk 4', description: 'SQL Injection', severity: 'critical' },
];

export const mockEntities: Entity[] = [
  {
    id: 'entity1',
    psm: 'User Service',
    apiPath: '/api/users',
    httpMethod: 'GET',
    status: 'active',
    fixedRisks: { risk1: true, risk2: false, risk3: true, risk4: false }
  },
  {
    id: 'entity2',
    psm: 'User Service',
    apiPath: '/api/users',
    httpMethod: 'POST',
    status: 'active',
    fixedRisks: { risk1: false, risk2: true, risk3: false, risk4: true }
  },
  {
    id: 'entity3',
    psm: 'Payment Service',
    apiPath: '/api/payments',
    httpMethod: 'POST',
    status: 'active',
    fixedRisks: { risk1: true, risk2: true, risk3: false, risk4: false }
  },
  {
    id: 'entity4',
    psm: 'Payment Service',
    apiPath: '/api/payments',
    httpMethod: 'GET',
    status: 'maintenance',
    fixedRisks: { risk1: false, risk2: false, risk3: true, risk4: true }
  },
  {
    id: 'entity5',
    psm: 'Order Service',
    apiPath: '/api/orders',
    httpMethod: 'PUT',
    status: 'active',
    fixedRisks: { risk1: true, risk2: false, risk3: true, risk4: false }
  },
  {
    id: 'entity6',
    psm: 'Order Service',
    apiPath: '/api/orders',
    httpMethod: 'DELETE',
    status: 'deprecated',
    fixedRisks: { risk1: false, risk2: true, risk3: false, risk4: true }
  }
];

export const mockGovernanceGroups: GovernanceGroup[] = [
  {
    id: 'gov1',
    name: 'Governance A',
    riskId: 'risk1',
    entityIds: ['entity1', 'entity2', 'entity5'],
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: 'gov2',
    name: 'Governance B',
    riskId: 'risk2',
    entityIds: ['entity1', 'entity6'],
    createdAt: '2024-02-10',
    status: 'completed'
  },
  {
    id: 'gov3',
    name: 'Governance C',
    riskId: 'risk1',
    entityIds: ['entity3', 'entity4'],
    createdAt: '2024-03-05',
    status: 'active'
  }
];
