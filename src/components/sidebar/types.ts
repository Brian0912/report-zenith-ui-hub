
import React from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  description: string;
}

export interface ProductGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  subItems: MenuItem[];
}

export interface SidebarProps {}
