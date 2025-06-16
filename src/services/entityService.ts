
import { Entity } from '../components/risk-management/mockRiskData';

// Updated mock data with partial risk coverage
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
      risk4: { isResolved: false, latestGovernanceId: 'gov4' },
      risk6: { isResolved: false, latestGovernanceId: 'gov5' },
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
      risk5: { isResolved: false, latestGovernanceId: 'gov7' },
      risk6: { isResolved: true, latestGovernanceId: 'gov8' },
      risk7: { isResolved: false }
    }
  },
  {
    id: 'entity3',
    psm: 'UserService',
    apiPath: '/api/users/profile',
    method: 'GET',
    riskStatus: {
      risk2: { isResolved: false, latestGovernanceId: 'gov9' },
      risk3: { isResolved: true, latestGovernanceId: 'gov10' },
      risk5: { isResolved: true, latestGovernanceId: 'gov11' },
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
      risk3: { isResolved: false, latestGovernanceId: 'gov13' },
      risk4: { isResolved: true, latestGovernanceId: 'gov14' },
      risk6: { isResolved: true, latestGovernanceId: 'gov15' },
      risk7: { isResolved: false }
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
      risk4: { isResolved: true, latestGovernanceId: 'gov18' },
      risk5: { isResolved: false, latestGovernanceId: 'gov19' },
      risk6: { isResolved: true, latestGovernanceId: 'gov20' }
    }
  },
  {
    id: 'entity6',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov21' },
      risk3: { isResolved: true, latestGovernanceId: 'gov22' },
      risk4: { isResolved: false, latestGovernanceId: 'gov23' },
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
      risk4: { isResolved: false, latestGovernanceId: 'gov27' },
      risk5: { isResolved: true, latestGovernanceId: 'gov28' },
      risk8: { isResolved: false, latestGovernanceId: 'gov29' }
    }
  },
  {
    id: 'entity8',
    psm: 'PaymentService',
    apiPath: '/api/payments/history',
    method: 'GET',
    riskStatus: {
      risk2: { isResolved: true, latestGovernanceId: 'gov30' },
      risk3: { isResolved: false, latestGovernanceId: 'gov31' },
      risk6: { isResolved: true, latestGovernanceId: 'gov32' },
      risk7: { isResolved: false, latestGovernanceId: 'gov33' }
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
      risk6: { isResolved: true, latestGovernanceId: 'gov38' },
      risk8: { isResolved: false, latestGovernanceId: 'gov39' }
    }
  },
  {
    id: 'entity10',
    psm: 'AuthService',
    apiPath: '/api/auth/logout',
    method: 'POST',
    riskStatus: {
      risk2: { isResolved: true, latestGovernanceId: 'gov40' },
      risk4: { isResolved: true, latestGovernanceId: 'gov41' },
      risk5: { isResolved: false, latestGovernanceId: 'gov42' },
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
      risk4: { isResolved: false, latestGovernanceId: 'gov45' },
      risk5: { isResolved: true, latestGovernanceId: 'gov46' },
      risk7: { isResolved: true, latestGovernanceId: 'gov47' }
    }
  },
  {
    id: 'entity12',
    psm: 'AuthService',
    apiPath: '/api/auth/verify',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov48' },
      risk3: { isResolved: false, latestGovernanceId: 'gov49' },
      risk6: { isResolved: true, latestGovernanceId: 'gov50' }
    }
  },
  // NotificationService APIs
  {
    id: 'entity13',
    psm: 'NotificationService',
    apiPath: '/api/notifications',
    method: 'GET',
    riskStatus: {
      risk2: { isResolved: false, latestGovernanceId: 'gov51' },
      risk3: { isResolved: true, latestGovernanceId: 'gov52' },
      risk6: { isResolved: false, latestGovernanceId: 'gov53' },
      risk7: { isResolved: true, latestGovernanceId: 'gov54' }
    }
  },
  {
    id: 'entity14',
    psm: 'NotificationService',
    apiPath: '/api/notifications/send',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov55' },
      risk4: { isResolved: true, latestGovernanceId: 'gov56' },
      risk5: { isResolved: false, latestGovernanceId: 'gov57' },
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
      risk4: { isResolved: false, latestGovernanceId: 'gov60' },
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
      risk2: { isResolved: true, latestGovernanceId: 'gov63' },
      risk3: { isResolved: false, latestGovernanceId: 'gov64' },
      risk6: { isResolved: true, latestGovernanceId: 'gov65' },
      risk7: { isResolved: false, latestGovernanceId: 'gov66' }
    }
  },
  {
    id: 'entity17',
    psm: 'AnalyticsService',
    apiPath: '/api/analytics/reports',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov67' },
      risk4: { isResolved: false, latestGovernanceId: 'gov68' },
      risk5: { isResolved: true, latestGovernanceId: 'gov69' },
      risk8: { isResolved: false, latestGovernanceId: 'gov70' }
    }
  }
];

export async function fetchEntities(): Promise<Entity[]> {
  return Promise.resolve(mockEntities);
}
