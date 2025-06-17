
import { Entity } from '../components/risk-management/mockRiskData';

// Updated mock data with governance history
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
      risk4: { isResolved: false, latestGovernanceId: 'gov4', governanceHistory: ['gov4'] },
      risk6: { isResolved: false, latestGovernanceId: 'gov5', governanceHistory: ['gov5', 'gov38', 'gov20'] },
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
      risk5: { isResolved: false, latestGovernanceId: 'gov7', governanceHistory: ['gov7', 'gov28', 'gov42'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov8', governanceHistory: ['gov8'] },
      risk7: { isResolved: false, governanceHistory: ['gov47'] }
    }
  },
  {
    id: 'entity3',
    psm: 'UserService',
    apiPath: '/api/users/profile',
    method: 'GET',
    riskStatus: {
      risk2: { isResolved: false, latestGovernanceId: 'gov9', governanceHistory: ['gov9', 'gov51'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov10', governanceHistory: ['gov10', 'gov52', 'gov64'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov11', governanceHistory: ['gov11', 'gov46', 'gov57', 'gov69'] },
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
      risk3: { isResolved: false, latestGovernanceId: 'gov13', governanceHistory: ['gov13', 'gov31', 'gov49'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov14', governanceHistory: ['gov14', 'gov18', 'gov41', 'gov56'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov15', governanceHistory: ['gov15', 'gov32'] },
      risk7: { isResolved: false, governanceHistory: ['gov33'] }
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
      risk4: { isResolved: true, latestGovernanceId: 'gov18', governanceHistory: ['gov18', 'gov27', 'gov23'] },
      risk5: { isResolved: false, latestGovernanceId: 'gov19', governanceHistory: ['gov19'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov20', governanceHistory: ['gov20', 'gov38', 'gov50'] }
    }
  },
  {
    id: 'entity6',
    psm: 'PaymentService',
    apiPath: '/api/payments',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov21', governanceHistory: ['gov21', 'gov48'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov22', governanceHistory: ['gov22', 'gov31', 'gov36'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov23', governanceHistory: ['gov23', 'gov41', 'gov45', 'gov60'] },
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
      risk4: { isResolved: false, latestGovernanceId: 'gov27', governanceHistory: ['gov27', 'gov56', 'gov68'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov28', governanceHistory: ['gov28', 'gov69'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov29', governanceHistory: ['gov29', 'gov70'] }
    }
  },
  {
    id: 'entity8',
    psm: 'PaymentService',
    apiPath: '/api/payments/history',
    method: 'GET',
    riskStatus: {
      risk2: { isResolved: true, latestGovernanceId: 'gov30', governanceHistory: ['gov30', 'gov63'] },
      risk3: { isResolved: false, latestGovernanceId: 'gov31', governanceHistory: ['gov31', 'gov49'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov32', governanceHistory: ['gov32'] },
      risk7: { isResolved: false, latestGovernanceId: 'gov33', governanceHistory: ['gov33', 'gov47'] }
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
      risk6: { isResolved: true, latestGovernanceId: 'gov38', governanceHistory: ['gov38', 'gov5', 'gov8', 'gov15'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov39', governanceHistory: ['gov39', 'gov13'] }
    }
  },
  {
    id: 'entity10',
    psm: 'AuthService',
    apiPath: '/api/auth/logout',
    method: 'POST',
    riskStatus: {
      risk2: { isResolved: true, latestGovernanceId: 'gov40', governanceHistory: ['gov40', 'gov17'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov41', governanceHistory: ['gov41', 'gov19'] },
      risk5: { isResolved: false, latestGovernanceId: 'gov42', governanceHistory: ['gov42', 'gov20'] },
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
      risk4: { isResolved: false, latestGovernanceId: 'gov45', governanceHistory: ['gov45', 'gov27'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov46', governanceHistory: ['gov46', 'gov28'] },
      risk7: { isResolved: true, latestGovernanceId: 'gov47', governanceHistory: ['gov47', 'gov30'] }
    }
  },
  {
    id: 'entity12',
    psm: 'AuthService',
    apiPath: '/api/auth/verify',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov48', governanceHistory: ['gov48', 'gov32'] },
      risk3: { isResolved: false, latestGovernanceId: 'gov49', governanceHistory: ['gov49', 'gov34'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov50', governanceHistory: ['gov50', 'gov37'] }
    }
  },
  // NotificationService APIs
  {
    id: 'entity13',
    psm: 'NotificationService',
    apiPath: '/api/notifications',
    method: 'GET',
    riskStatus: {
      risk2: { isResolved: false, latestGovernanceId: 'gov51', governanceHistory: ['gov51', 'gov41'] },
      risk3: { isResolved: true, latestGovernanceId: 'gov52', governanceHistory: ['gov52', 'gov42'] },
      risk6: { isResolved: false, latestGovernanceId: 'gov53', governanceHistory: ['gov53', 'gov45'] },
      risk7: { isResolved: true, latestGovernanceId: 'gov54', governanceHistory: ['gov54', 'gov46'] }
    }
  },
  {
    id: 'entity14',
    psm: 'NotificationService',
    apiPath: '/api/notifications/send',
    method: 'POST',
    riskStatus: {
      risk1: { isResolved: false, latestGovernanceId: 'gov55', governanceHistory: ['gov55', 'gov48'] },
      risk4: { isResolved: true, latestGovernanceId: 'gov56', governanceHistory: ['gov56', 'gov51'] },
      risk5: { isResolved: false, latestGovernanceId: 'gov57', governanceHistory: ['gov57', 'gov52'] },
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
      risk4: { isResolved: false, latestGovernanceId: 'gov60', governanceHistory: ['gov60', 'gov59'] },
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
      risk2: { isResolved: true, latestGovernanceId: 'gov63', governanceHistory: ['gov63', 'gov65'] },
      risk3: { isResolved: false, latestGovernanceId: 'gov64', governanceHistory: ['gov64', 'gov66'] },
      risk6: { isResolved: true, latestGovernanceId: 'gov65', governanceHistory: ['gov65', 'gov69'] },
      risk7: { isResolved: false, latestGovernanceId: 'gov66', governanceHistory: ['gov66', 'gov70'] }
    }
  },
  {
    id: 'entity17',
    psm: 'AnalyticsService',
    apiPath: '/api/analytics/reports',
    method: 'GET',
    riskStatus: {
      risk1: { isResolved: true, latestGovernanceId: 'gov67', governanceHistory: ['gov67', 'gov68'] },
      risk4: { isResolved: false, latestGovernanceId: 'gov68', governanceHistory: ['gov68', 'gov1'] },
      risk5: { isResolved: true, latestGovernanceId: 'gov69', governanceHistory: ['gov69', 'gov2'] },
      risk8: { isResolved: false, latestGovernanceId: 'gov70', governanceHistory: ['gov70', 'gov5'] }
    }
  }
];

export async function fetchEntities(): Promise<Entity[]> {
  return Promise.resolve(mockEntities);
}
