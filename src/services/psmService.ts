
import { Entity } from '../components/risk-management/mockRiskData';

// Modified mock entities - some with no risks
const mockEntities: Entity[] = [
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
    riskStatus: {} // No risks associated
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
    riskStatus: {} // No risks associated
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
    riskStatus: {} // No risks associated
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
    riskStatus: {} // No risks associated
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
    riskStatus: {} // No risks associated
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
    riskStatus: {} // No risks associated
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
    riskStatus: {} // No risks associated
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

export async function fetchEntities(): Promise<Entity[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return Promise.resolve(mockEntities);
}

export async function fetchEntityById(id: string): Promise<Entity | undefined> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return Promise.resolve(mockEntities.find(entity => entity.id === id));
}
