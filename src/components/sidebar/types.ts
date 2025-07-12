
import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  description: string;
}

export interface ProductGroup {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  subItems: MenuItem[];
}

export interface SidebarProps {}
