
import React from 'react';

interface SidebarHeaderProps {
  isCollapsed: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCollapsed }) => {
  const headerStyle: React.CSSProperties = {
    padding: isCollapsed ? '20px 12px' : '20px 16px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: isCollapsed ? '18px' : '20px',
    fontWeight: '700',
    color: '#1f2937',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={headerStyle}>
      <div style={logoStyle}>
        {isCollapsed ? '💎' : '💎 Crystal'}
      </div>
    </div>
  );
};
