import { GovernanceGroup } from '../components/risk-management/mockRiskData';

const mockGovernanceGroups: GovernanceGroup[] = [
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

export async function fetchGovernanceGroups(): Promise<GovernanceGroup[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return Promise.resolve(mockGovernanceGroups);
}

export async function fetchGovernanceGroupById(id: string): Promise<GovernanceGroup | undefined> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return Promise.resolve(mockGovernanceGroups.find(group => group.id === id));
}
