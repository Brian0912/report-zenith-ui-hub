
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ProductGroup } from './types';
import { SidebarMenuItem } from './SidebarMenuItem';

interface SidebarMenuGroupProps {
  group: ProductGroup;
  isCollapsed: boolean;
}

export const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({ group, isCollapsed }) => {
  const location = useLocation();

  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  const groupStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const groupLabelStyle: React.CSSProperties = {
    fontSize: isCollapsed ? '10px' : '11px',
    fontWeight: '600',
    color: '#9ca3af',
    letterSpacing: '0.05em',
    marginBottom: isCollapsed ? '8px' : '12px',
    paddingLeft: isCollapsed ? '0' : '16px',
    textAlign: isCollapsed ? 'center' : 'left',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={groupStyle}>
      <div style={groupLabelStyle}>
        {group.label}
      </div>
      
      {group.items.map(item => {
        const isActive = isItemActive(item.path);
        
        return (
          <SidebarMenuItem
            key={item.id}
            item={item}
            isActive={isActive}
            isCollapsed={isCollapsed}
          />
        );
      })}
    </div>
  );
};
