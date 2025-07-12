
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from './types';

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  isCollapsed: boolean;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, isActive, isCollapsed }) => {
  const navigate = useNavigate();

  const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    padding: isCollapsed ? '12px 0' : '10px 16px',
    color: isActive ? '#1f2937' : '#6b7280',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    backgroundColor: isActive ? '#f3f4f6' : 'transparent',
    borderRight: isActive && !isCollapsed ? '3px solid #3b82f6' : '3px solid transparent',
    minHeight: '48px',
    width: '100%'
  };

  const iconContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    marginRight: isCollapsed ? '0' : '10px',
    flexShrink: 0
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: '500',
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.3s ease',
    whiteSpace: 'nowrap'
  };

  const IconComponent = item.icon;

  return (
    <div
      style={menuItemStyle}
      onClick={() => navigate(item.path)}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <div style={iconContainerStyle}>
        <IconComponent size={24} />
      </div>
      <div style={labelStyle}>
        {item.label}
      </div>
    </div>
  );
};
