
import { BarChart3, Wrench, Search } from 'lucide-react';
import { ProductGroup } from './types';

export const productGroups: ProductGroup[] = [
  {
    id: 'sentinel',
    label: 'SENTINEL',
    icon: null,
    subItems: [
      {
        id: 'report-center',
        label: 'Report',
        icon: BarChart3,
        path: '/sentinel/report-center'
      }
    ]
  },
  {
    id: 'aplus',
    label: 'APLUS',
    icon: null,
    subItems: [
      {
        id: 'enhancement',
        label: 'Enhancement',
        icon: Wrench,
        path: '/aplus/enhancement'
      },
      {
        id: 'finding',
        label: 'Finding',
        icon: Search,
        path: '/aplus/finding'
      }
    ]
  }
];
