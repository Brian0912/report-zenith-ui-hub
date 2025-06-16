
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

export const mockEntities: Entity[] = [
  // UserService APIs
  {
    id: 'entity1',
    psm: 'UserService',
    apiPath: '/api/users',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov1' },
      risk2: { isResolved: false, latestGovernanceId: 'gov2' },
      risk3: { isResolved: true, latestGovernanceId: 'gov3' },
      risk4: { isResolved: false, latestGovernanceId: 'gov4' },
      risk5: { isResolved: true },
      risk6: { isResolved: false, latestGovernanceId: 'gov5' },
      risk7: { isResolved: true },
      risk8: { isResolved: false }
    }
  },
  {
    id: 'entity2',
    psm: 'UserService',
    apiPath: '/api/users',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov6' },
      risk2: { isResolved: true, latestGovernanceId: 'gov1' },
      risk3: { isResolved: false },
      risk4: { isResolved: true, latestGovernanceId: 'gov2' },
      risk5: { isResolved: false, latestGovernanceId: 'gov7' },
      risk6: { isResolved: true, latestGovernanceId: 'gov8' },
      risk7: { isResolved: false },
      risk8: { isResolved: true }
    }
  },
  {
    id: 'entity3',
    psm: 'UserService',
    apiPath: '/api/users/profile',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true },
      risk2: { isResolved: false, latestGovernanceId: 'gov9' },
      risk3: { isResolved: true, latestGovernanceId: 'gov10' },
      risk4: { isResolved: false },
      risk5: { isResolved: true, latestGovernanceId: 'gov11' },
      risk6: { isResolved: false },
      risk7: { isResolved: true },
      risk8: { isResolved: false, latestGovernanceId: 'gov12' }
    }
  },
  {
    id: 'entity4',
    psm: 'UserService',
    apiPath: '/api/users/preferences',
    method: 'PUT',
    riskStatus: {
      risk1: { isResolved: false },
      risk2: { isResolved: true },
      risk3: { isResolved: false, latestGovernanceId: 'gov13' },
      risk4: { isResolved: true, latestGovernanceId: 'gov14' },
      risk5: { isResolved: false },
      risk6: { isResolved: true, latestGovernanceId: 'gov15' },
      risk7: { isResolved: false },
      risk8: { isResolved: true }
    }
  },
  // PaymentService APIs
  {
    id: 'entity5',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov16' },
      risk2: { isResolved: true, latestGovernanceId: 'gov17' },
      risk3: { isResolved: false },
      risk4: { isResolved: true, latestGovernanceId: 'gov18' },
      risk5: { isResolved: false, latestGovernanceId: 'gov19' },
      risk6: { isResolved: true, latestGovernanceId: 'gov20' },
      risk7: { isResolved: false },
      risk8: { isResolved: true }
    }
  },
  {
    id: 'entity6',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov21' },
      risk2: { isResolved: false },
      risk3: { isResolved: true, latestGovernanceId: 'gov22' },
      risk4: { isResolved: false, latestGovernanceId: 'gov23' },
      risk5: { isResolved: true },
      risk6: { isResolved: false },
      risk7: { isResolved: true, latestGovernanceId: 'gov24' },
      risk8: { isResolved: false, latestGovernanceId: 'gov25' }
    }
  },
  {
    id: 'entity7',
    psm: 'PaymentService',
    apiPath: '/api/payments/refund',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov26' },
      risk2: { isResolved: false },
      risk3: { isResolved: true },
      risk4: { isResolved: false, latestGovernanceId: 'gov27' },
      risk5: { isResolved: true, latestGovernanceId: 'gov28' },
      risk6: { isResolved: false },
      risk7: { isResolved: true },
      risk8: { isResolved: false, latestGovernanceId: 'gov29' }
    }
  },
  {
    id: 'entity8',
    psm: 'PaymentService',
    apiPath: '/api/payments/history',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false },
      risk2: { isResolved: true, latestGovernanceId: 'gov30' },
      risk3: { isResolved: false, latestGovernanceId: 'gov31' },
      risk4: { isResolved: true },
      risk5: { isResolved: false },
      risk6: { isResolved: true, latestGovernanceId: 'gov32' },
      risk7: { isResolved: false, latestGovernanceId: 'gov33' },
      risk8: { isResolved: true }
    }
  },
  // AuthService APIs
  {
    id: 'entity9',
    psm: 'AuthService',
    apiPath: '/api/auth/login',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov34' },
      risk2: { isResolved: true, latestGovernanceId: 'gov35' },
      risk3: { isResolved: true, latestGovernanceId: 'gov36' },
      risk4: { isResolved: true, latestGovernanceId: 'gov37' },
      risk5: { isResolved: false },
      risk6: { isResolved: true, latestGovernanceId: 'gov38' },
      risk7: { isResolved: true },
      risk8: { isResolved: false, latestGovernanceId: 'gov39' }
    }
  },
  {
    id: 'entity10',
    psm: 'AuthService',
    apiPath: '/api/auth/logout',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false },
      risk2: { isResolved: true, latestGovernanceId: 'gov40' },
      risk3: { isResolved: false },
      risk4: { isResolved: true, latestGovernanceId: 'gov41' },
      risk5: { isResolved: false, latestGovernanceId: 'gov42' },
      risk6: { isResolved: true },
      risk7: { isResolved: false },
      risk8: { isResolved: true, latestGovernanceId: 'gov43' }
    }
  },
  {
    id: 'entity11',
    psm: 'AuthService',
    apiPath: '/api/auth/refresh',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov44' },
      risk2: { isResolved: false },
      risk3: { isResolved: true },
      risk4: { isResolved: false, latestGovernanceId: 'gov45' },
      risk5: { isResolved: true, latestGovernanceId: 'gov46' },
      risk6: { isResolved: false },
      risk7: { isResolved: true, latestGovernanceId: 'gov47' },
      risk8: { isResolved: false }
    }
  },
  {
    id: 'entity12',
    psm: 'AuthService',
    apiPath: '/api/auth/verify',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov48' },
      risk2: { isResolved: true },
      risk3: { isResolved: false, latestGovernanceId: 'gov49' },
      risk4: { isResolved: true },
      risk5: { isResolved: false },
      risk6: { isResolved: true, latestGovernanceId: 'gov50' },
      risk7: { isResolved: false },
      risk8: { isResolved: true }
    }
  },
  // NotificationService APIs
  {
    id: 'entity13',
    psm: 'NotificationService',
    apiPath: '/api/notifications',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true },
      risk2: { isResolved: false, latestGovernanceId: 'gov51' },
      risk3: { isResolved: true, latestGovernanceId: 'gov52' },
      risk4: { isResolved: false },
      risk5: { isResolved: true },
      risk6: { isResolved: false, latestGovernanceId: 'gov53' },
      risk7: { isResolved: true, latestGovernanceId: 'gov54' },
      risk8: { isResolved: false }
    }
  },
  {
    id: 'entity14',
    psm: 'NotificationService',
    apiPath: '/api/notifications/send',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov55' },
      risk2: { isResolved: true },
      risk3: { isResolved: false },
      risk4: { isResolved: true, latestGovernanceId: 'gov56' },
      risk5: { isResolved: false, latestGovernanceId: 'gov57' },
      risk6: { isResolved: true },
      risk7: { isResolved: false },
      risk8: { isResolved: true, latestGovernanceId: 'gov58' }
    }
  },
  {
    id: 'entity15',
    psm: 'NotificationService',
    apiPath: '/api/notifications/preferences',
    method: 'PUT',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov59' },
      risk2: { isResolved: false },
      risk3: { isResolved: true },
      risk4: { isResolved: false, latestGovernanceId: 'gov60' },
      risk5: { isResolved: true },
      risk6: { isResolved: false },
      risk7: { isResolved: true, latestGovernanceId: 'gov61' },
      risk8: { isResolved: false, latestGovernanceId: 'gov62' }
    }
  },
  // AnalyticsService APIs
  {
    id: 'entity16',
    psm: 'AnalyticsService',
    apiPath: '/api/analytics/events',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false },
      risk2: { isResolved: true, latestGovernanceId: 'gov63' },
      risk3: { isResolved: false, latestGovernanceId: 'gov64' },
      risk4: { isResolved: true },
      risk5: { isResolved: false },
      risk6: { isResolved: true, latestGovernanceId: 'gov65' },
      risk7: { isResolved: false, latestGovernanceId: 'gov66' },
      risk8: { isResolved: true }
    }
  },
  {
    id: 'entity17',
    psm: 'AnalyticsService',
    apiPath: '/api/analytics/reports',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov67' },
      risk2: { isResolved: false },
      risk3: { isResolved: true },
      risk4: { isResolved: false, latestGovernanceId: 'gov68' },
      risk5: { isResolved: true, latestGovernanceId: 'gov69' },
      risk6: { isResolved: false },
      risk7: { isResolved: true },
      risk8: { isResolved: false, latestGovernanceId: 'gov70' }
    }
  }
];

export const mockGovernanceGroups: GovernanceGroup[] = [
  {
    id: 'gov1',
    name: 'Q4 2024 Security Audit',
    createdDate: '2024-10-01',
    riskId: 'risk1',
    entityIds: ['entity1', 'entity2'],
    status: 'completed',
    complianceRate: 85
  },
  {
    id: 'gov2',
    name: 'Data Protection Review',
    createdDate: '2024-11-15',
    riskId: 'risk2',
    entityIds: ['entity1'],
    status: 'active',
    complianceRate: 60
  },
  {
    id: 'gov3',
    name: 'Rate Limiting Assessment',
    createdDate: '2024-12-01',
    riskId: 'risk3',
    entityIds: ['entity1', 'entity6'],
    status: 'pending',
    complianceRate: 30
  },
  {
    id: 'gov4',
    name: 'Input Validation Improvement',
    createdDate: '2024-11-20',
    riskId: 'risk4',
    entityIds: ['entity1', 'entity2'],
    status: 'active',
    complianceRate: 45
  },
  {
    id: 'gov5',
    name: 'SQL Injection Prevention',
    createdDate: '2024-10-15',
    riskId: 'risk6',
    entityIds: ['entity1'],
    status: 'completed',
    complianceRate: 90
  },
  {
    id: 'gov6',
    name: 'Authentication Enhancement',
    createdDate: '2024-12-05',
    riskId: 'risk1',
    entityIds: ['entity2'],
    status: 'active',
    complianceRate: 55
  },
  {
    id: 'gov7',
    name: 'CORS Policy Review',
    createdDate: '2024-11-10',
    riskId: 'risk5',
    entityIds: ['entity2'],
    status: 'completed',
    complianceRate: 75
  },
  {
    id: 'gov8',
    name: 'Critical Data Security',
    createdDate: '2024-10-20',
    riskId: 'risk6',
    entityIds: ['entity2'],
    status: 'completed',
    complianceRate: 95
  },
  {
    id: 'gov9',
    name: 'Profile Data Protection',
    createdDate: '2024-11-25',
    riskId: 'risk2',
    entityIds: ['entity3'],
    status: 'active',
    complianceRate: 40
  },
  {
    id: 'gov10',
    name: 'Profile API Rate Limits',
    createdDate: '2024-12-08',
    riskId: 'risk3',
    entityIds: ['entity3'],
    status: 'pending',
    complianceRate: 20
  },
  {
    id: 'gov11',
    name: 'User Profile CORS',
    createdDate: '2024-11-05',
    riskId: 'risk5',
    entityIds: ['entity3'],
    status: 'completed',
    complianceRate: 80
  },
  {
    id: 'gov12',
    name: 'Profile Logging Security',
    createdDate: '2024-12-02',
    riskId: 'risk8',
    entityIds: ['entity3'],
    status: 'active',
    complianceRate: 35
  },
  {
    id: 'gov13',
    name: 'Preferences Rate Control',
    createdDate: '2024-11-18',
    riskId: 'risk3',
    entityIds: ['entity4'],
    status: 'active',
    complianceRate: 50
  },
  {
    id: 'gov14',
    name: 'Preferences Input Validation',
    createdDate: '2024-10-25',
    riskId: 'risk4',
    entityIds: ['entity4'],
    status: 'completed',
    complianceRate: 85
  },
  {
    id: 'gov15',
    name: 'User Preferences Security',
    createdDate: '2024-11-12',
    riskId: 'risk6',
    entityIds: ['entity4'],
    status: 'completed',
    complianceRate: 90
  },
  {
    id: 'gov16',
    name: 'Payment Authentication',
    createdDate: '2024-10-10',
    riskId: 'risk1',
    entityIds: ['entity5'],
    status: 'completed',
    complianceRate: 95
  },
  {
    id: 'gov17',
    name: 'Payment Data Protection',
    createdDate: '2024-10-12',
    riskId: 'risk2',
    entityIds: ['entity5'],
    status: 'completed',
    complianceRate: 98
  },
  {
    id: 'gov18',
    name: 'Payment Input Security',
    createdDate: '2024-11-08',
    riskId: 'risk4',
    entityIds: ['entity5'],
    status: 'completed',
    complianceRate: 92
  },
  {
    id: 'gov19',
    name: 'Payment CORS Policy',
    createdDate: '2024-12-03',
    riskId: 'risk5',
    entityIds: ['entity5'],
    status: 'active',
    complianceRate: 60
  },
  {
    id: 'gov20',
    name: 'Payment SQL Security',
    createdDate: '2024-10-18',
    riskId: 'risk6',
    entityIds: ['entity5'],
    status: 'completed',
    complianceRate: 96
  },
  {
    id: 'gov21',
    name: 'Payment Retrieval Auth',
    createdDate: '2024-11-22',
    riskId: 'risk1',
    entityIds: ['entity6'],
    status: 'active',
    complianceRate: 45
  },
  {
    id: 'gov22',
    name: 'Payment Query Limits',
    createdDate: '2024-12-06',
    riskId: 'risk3',
    entityIds: ['entity6'],
    status: 'pending',
    complianceRate: 25
  },
  {
    id: 'gov23',
    name: 'Payment Query Validation',
    createdDate: '2024-11-14',
    riskId: 'risk4',
    entityIds: ['entity6'],
    status: 'active',
    complianceRate: 55
  },
  {
    id: 'gov24',
    name: 'Payment API Versioning',
    createdDate: '2024-10-28',
    riskId: 'risk7',
    entityIds: ['entity6'],
    status: 'completed',
    complianceRate: 88
  },
  {
    id: 'gov25',
    name: 'Payment Query Logging',
    createdDate: '2024-12-04',
    riskId: 'risk8',
    entityIds: ['entity6'],
    status: 'active',
    complianceRate: 40
  }
];
