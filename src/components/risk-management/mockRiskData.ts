
export interface Entity {
  id: string;
  psm: string;
  apiPath: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  riskStatus: Record<string, {
    isResolved: boolean;
    latestGovernanceId?: string;
    governanceHistory?: string[];
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
      risk1: { isResolved: true, latestGovernanceId: 'gov1', governanceHistory: ['gov1', 'gov50', 'gov49'] },
      risk2: { isResolved: false, latestGovernanceId: 'gov2', governanceHistory: ['gov2'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov3', governanceHistory: ['gov3', 'gov22'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov4', governanceHistory: ['gov4'] },
      risk5: { isResolved: true, governanceHistory: ['gov48', 'gov47'] },
      risk6: { isResolved: false, latestGovernanceId: 'gov5', governanceHistory: ['gov5', 'gov38', 'gov20'] },
      risk7: { isResolved: true, governanceHistory: ['gov24'] },
      risk8: { isResolved: false, governanceHistory: ['gov39', 'gov25'] }
    }
  },
  {
    id: 'entity2',
    psm: 'UserService',
    apiPath: '/api/users',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov6', governanceHistory: ['gov6', 'gov34'] },
      risk2: { isResolved: true, latestGovernanceId: 'gov1', governanceHistory: ['gov1', 'gov17', 'gov35'] },
      risk3: { isResolved: false, governanceHistory: ['gov36'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov2', governanceHistory: ['gov2', 'gov14', 'gov37'] },
      risk5: { isResolved: false, latestGovernanceId: 'gov7', governanceHistory: ['gov7', 'gov28', 'gov42'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov8', governanceHistory: ['gov8'] },
      risk7: { isResolved: false, governanceHistory: ['gov47'] },
      risk8: { isResolved: true, governanceHistory: ['gov43', 'gov58'] }
    }
  },
  {
    id: 'entity3',
    psm: 'UserService',
    apiPath: '/api/users/profile',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, governanceHistory: ['gov44', 'gov16', 'gov59'] },
      risk2: { isResolved: false, latestGovernanceId: 'gov9', governanceHistory: ['gov9', 'gov51'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov10', governanceHistory: ['gov10', 'gov52', 'gov64'] },
      risk4: { isResolved: false, governanceHistory: ['gov45', 'gov60', 'gov68'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov11', governanceHistory: ['gov11', 'gov46', 'gov57', 'gov69'] },
      risk6: { isResolved: false, governanceHistory: ['gov53', 'gov65'] },
      risk7: { isResolved: true, governanceHistory: ['gov54', 'gov61', 'gov66'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov12', governanceHistory: ['gov12', 'gov62', 'gov70'] }
    }
  },
  {
    id: 'entity4',
    psm: 'UserService',
    apiPath: '/api/users/preferences',
    method: 'PUT',
    riskStatus: {
      risk1: { isResolved: false, governanceHistory: ['gov55'] },
      risk2: { isResolved: true, governanceHistory: ['gov63'] },
      risk3: { isResolved: false, latestGovernanceId: 'gov13', governanceHistory: ['gov13', 'gov31', 'gov49'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov14', governanceHistory: ['gov14', 'gov18', 'gov41', 'gov56'] },
      risk5: { isResolved: false, governanceHistory: ['gov19'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov15', governanceHistory: ['gov15', 'gov32'] },
      risk7: { isResolved: false, governanceHistory: ['gov33'] },
      risk8: { isResolved: true, governanceHistory: ['gov40'] }
    }
  },
  // PaymentService APIs
  {
    id: 'entity5',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov16', governanceHistory: ['gov16', 'gov26', 'gov67'] },
      risk2: { isResolved: true, latestGovernanceId: 'gov17', governanceHistory: ['gov17', 'gov30'] },
      risk3: { isResolved: false, governanceHistory: ['gov52'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov18', governanceHistory: ['gov18', 'gov27', 'gov23'] },
      risk5: { isResolved: false, latestGovernanceId: 'gov19', governanceHistory: ['gov19'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov20', governanceHistory: ['gov20', 'gov38', 'gov50'] },
      risk7: { isResolved: false, governanceHistory: ['gov24'] },
      risk8: { isResolved: true, governanceHistory: ['gov29'] }
    }
  },
  {
    id: 'entity6',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov21', governanceHistory: ['gov21', 'gov48'] },
      risk2: { isResolved: false, governanceHistory: ['gov40'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov22', governanceHistory: ['gov22', 'gov31', 'gov36'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov23', governanceHistory: ['gov23', 'gov41', 'gov45', 'gov60'] },
      risk5: { isResolved: true, governanceHistory: ['gov42', 'gov46', 'gov57'] },
      risk6: { isResolved: false, governanceHistory: ['gov32'] },
      risk7: { isResolved: true, latestGovernanceId: 'gov24', governanceHistory: ['gov24', 'gov47', 'gov54', 'gov61'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov25', governanceHistory: ['gov25', 'gov43', 'gov58', 'gov62'] }
    }
  },
  {
    id: 'entity7',
    psm: 'PaymentService',
    apiPath: '/api/payments/refund',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov26', governanceHistory: ['gov26', 'gov44', 'gov59'] },
      risk2: { isResolved: false, governanceHistory: ['gov51'] },
      risk3: { isResolved: true, governanceHistory: ['gov64'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov27', governanceHistory: ['gov27', 'gov56', 'gov68'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov28', governanceHistory: ['gov28', 'gov69'] },
      risk6: { isResolved: false, governanceHistory: ['gov53', 'gov65'] },
      risk7: { isResolved: true, governanceHistory: ['gov66'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov29', governanceHistory: ['gov29', 'gov70'] }
    }
  },
  {
    id: 'entity8',
    psm: 'PaymentService',
    apiPath: '/api/payments/history',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, governanceHistory: ['gov55'] },
      risk2: { isResolved: true, latestGovernanceId: 'gov30', governanceHistory: ['gov30', 'gov63'] },
      risk3: { isResolved: false, latestGovernanceId: 'gov31', governanceHistory: ['gov31', 'gov49'] },
      risk4: { isResolved: true, governanceHistory: ['gov37'] },
      risk5: { isResolved: false, governanceHistory: ['gov33'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov32', governanceHistory: ['gov32'] },
      risk7: { isResolved: false, latestGovernanceId: 'gov33', governanceHistory: ['gov33', 'gov47'] },
      risk8: { isResolved: true, governanceHistory: ['gov39'] }
    }
  },
  // AuthService APIs
  {
    id: 'entity9',
    psm: 'AuthService',
    apiPath: '/api/auth/login',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov34', governanceHistory: ['gov34', 'gov1', 'gov6'] },
      risk2: { isResolved: true, latestGovernanceId: 'gov35', governanceHistory: ['gov35', 'gov2', 'gov9'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov36', governanceHistory: ['gov36', 'gov3', 'gov10'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov37', governanceHistory: ['gov37', 'gov4', 'gov14'] },
      risk5: { isResolved: false, governanceHistory: ['gov7', 'gov11'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov38', governanceHistory: ['gov38', 'gov5', 'gov8', 'gov15'] },
      risk7: { isResolved: true, governanceHistory: ['gov12'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov39', governanceHistory: ['gov39', 'gov13'] }
    }
  },
  {
    id: 'entity10',
    psm: 'AuthService',
    apiPath: '/api/auth/logout',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, governanceHistory: ['gov16'] },
      risk2: { isResolved: true, latestGovernanceId: 'gov40', governanceHistory: ['gov40', 'gov17'] },
      risk3: { isResolved: false, governanceHistory: ['gov18'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov41', governanceHistory: ['gov41', 'gov19'] },
      risk5: { isResolved: false, latestGovernanceId: 'gov42', governanceHistory: ['gov42', 'gov20'] },
      risk6: { isResolved: true, governanceHistory: ['gov21'] },
      risk7: { isResolved: false, governanceHistory: ['gov22'] },
      risk8: { isResolved: true, latestGovernanceId: 'gov43', governanceHistory: ['gov43', 'gov23'] }
    }
  },
  {
    id: 'entity11',
    psm: 'AuthService',
    apiPath: '/api/auth/refresh',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov44', governanceHistory: ['gov44', 'gov24'] },
      risk2: { isResolved: false, governanceHistory: ['gov25'] },
      risk3: { isResolved: true, governanceHistory: ['gov26'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov45', governanceHistory: ['gov45', 'gov27'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov46', governanceHistory: ['gov46', 'gov28'] },
      risk6: { isResolved: false, governanceHistory: ['gov29'] },
      risk7: { isResolved: true, latestGovernanceId: 'gov47', governanceHistory: ['gov47', 'gov30'] },
      risk8: { isResolved: false, governanceHistory: ['gov31'] }
    }
  },
  {
    id: 'entity12',
    psm: 'AuthService',
    apiPath: '/api/auth/verify',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov48', governanceHistory: ['gov48', 'gov32'] },
      risk2: { isResolved: true, governanceHistory: ['gov33'] },
      risk3: { isResolved: false, latestGovernanceId: 'gov49', governanceHistory: ['gov49', 'gov34'] },
      risk4: { isResolved: true, governanceHistory: ['gov35'] },
      risk5: { isResolved: false, governanceHistory: ['gov36'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov50', governanceHistory: ['gov50', 'gov37'] },
      risk7: { isResolved: false, governanceHistory: ['gov38'] },
      risk8: { isResolved: true, governanceHistory: ['gov39'] }
    }
  },
  // NotificationService APIs
  {
    id: 'entity13',
    psm: 'NotificationService',
    apiPath: '/api/notifications',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, governanceHistory: ['gov40'] },
      risk2: { isResolved: false, latestGovernanceId: 'gov51', governanceHistory: ['gov51', 'gov41'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov52', governanceHistory: ['gov52', 'gov42'] },
      risk4: { isResolved: false, governanceHistory: ['gov43'] },
      risk5: { isResolved: true, governanceHistory: ['gov44'] },
      risk6: { isResolved: false, latestGovernanceId: 'gov53', governanceHistory: ['gov53', 'gov45'] },
      risk7: { isResolved: true, latestGovernanceId: 'gov54', governanceHistory: ['gov54', 'gov46'] },
      risk8: { isResolved: false, governanceHistory: ['gov47'] }
    }
  },
  {
    id: 'entity14',
    psm: 'NotificationService',
    apiPath: '/api/notifications/send',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov55', governanceHistory: ['gov55', 'gov48'] },
      risk2: { isResolved: true, governanceHistory: ['gov49'] },
      risk3: { isResolved: false, governanceHistory: ['gov50'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov56', governanceHistory: ['gov56', 'gov51'] },
      risk5: { isResolved: false, latestGovernanceId: 'gov57', governanceHistory: ['gov57', 'gov52'] },
      risk6: { isResolved: true, governanceHistory: ['gov53'] },
      risk7: { isResolved: false, governanceHistory: ['gov54'] },
      risk8: { isResolved: true, latestGovernanceId: 'gov58', governanceHistory: ['gov58', 'gov55'] }
    }
  },
  {
    id: 'entity15',
    psm: 'NotificationService',
    apiPath: '/api/notifications/preferences',
    method: 'PUT',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov59', governanceHistory: ['gov59', 'gov56'] },
      risk2: { isResolved: false, governanceHistory: ['gov57'] },
      risk3: { isResolved: true, governanceHistory: ['gov58'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov60', governanceHistory: ['gov60', 'gov59'] },
      risk5: { isResolved: true, governanceHistory: ['gov60'] },
      risk6: { isResolved: false, governanceHistory: ['gov61'] },
      risk7: { isResolved: true, latestGovernanceId: 'gov61', governanceHistory: ['gov61', 'gov62'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov62', governanceHistory: ['gov62', 'gov63'] }
    }
  },
  // AnalyticsService APIs
  {
    id: 'entity16',
    psm: 'AnalyticsService',
    apiPath: '/api/analytics/events',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, governanceHistory: ['gov64'] },
      risk2: { isResolved: true, latestGovernanceId: 'gov63', governanceHistory: ['gov63', 'gov65'] },
      risk3: { isResolved: false, latestGovernanceId: 'gov64', governanceHistory: ['gov64', 'gov66'] },
      risk4: { isResolved: true, governanceHistory: ['gov67'] },
      risk5: { isResolved: false, governanceHistory: ['gov68'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov65', governanceHistory: ['gov65', 'gov69'] },
      risk7: { isResolved: false, latestGovernanceId: 'gov66', governanceHistory: ['gov66', 'gov70'] },
      risk8: { isResolved: true, governanceHistory: ['gov67'] }
    }
  },
  {
    id: 'entity17',
    psm: 'AnalyticsService',
    apiPath: '/api/analytics/reports',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov67', governanceHistory: ['gov67', 'gov68'] },
      risk2: { isResolved: false, governanceHistory: ['gov69'] },
      risk3: { isResolved: true, governanceHistory: ['gov70'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov68', governanceHistory: ['gov68', 'gov1'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov69', governanceHistory: ['gov69', 'gov2'] },
      risk6: { isResolved: false, governanceHistory: ['gov3'] },
      risk7: { isResolved: true, governanceHistory: ['gov4'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov70', governanceHistory: ['gov70', 'gov5'] }
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
