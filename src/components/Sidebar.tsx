
import React, { useState } from 'react';
import { SidebarHeader } from './sidebar/SidebarHeader';
import { SidebarToggle } from './sidebar/SidebarToggle';
import { SidebarMenuGroup } from './sidebar/SidebarMenuGroup';
import { productGroups } from './sidebar/constants';
import { SidebarProps } from './sidebar/types';

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '72px' : '200px',
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '20px 0',
    overflow: 'auto'
  };

  return (
    <div style={sidebarStyle}>
      <SidebarToggle 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <SidebarHeader isCollapsed={isCollapsed} />

      <div style={contentStyle}>
        {productGroups.map(group => (
          <SidebarMenuGroup
            key={group.id}
            group={group}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </div>
  );
};
