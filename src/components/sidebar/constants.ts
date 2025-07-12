
import { Wrench, Search, Shield } from 'lucide-react';
import { ProductGroup } from './types';

export const productGroups: ProductGroup[] = [
  {
    id: 'sentinel',  
    label: 'SENTINEL',
    items: [
      {
        id: 'report',
        label: 'Report',
        icon: Shield,
        path: '/sentinel/report-center'
      }
    ]
  },
  {
    id: 'aplus',
    label: 'APLUS',
    items: [
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
