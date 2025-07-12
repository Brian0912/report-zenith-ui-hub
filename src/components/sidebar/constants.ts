
import { Shield, Zap, BarChart3, Wrench, Search } from 'lucide-react';
import { ProductGroup } from './types';

export const productGroups: ProductGroup[] = [
  {
    id: 'sentinel',
    label: 'Sentinel',
    icon: Shield,
    subItems: [
      {
        id: 'report-center',
        label: 'Report Center',
        icon: BarChart3,
        path: '/sentinel/report-center',
        description: 'Monitoring Dashboard'
      }
    ]
  },
  {
    id: 'aplus',
    label: 'Aplus',
    icon: Zap,
    subItems: [
      {
        id: 'enhancement',
        label: 'Enhancement Management',
        icon: Wrench,
        path: '/aplus/enhancement',
        description: 'API Risk Dashboard'
      },
      {
        id: 'finding',
        label: 'Finding Management',
        icon: Search,
        path: '/aplus/finding',
        description: 'Security Findings'
      }
    ]
  }
];
