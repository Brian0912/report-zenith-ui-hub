
import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  path: string;
}

export interface ProductGroup {
  id: string;
  label: string;
  items: MenuItem[];
}

export interface SidebarProps {}
