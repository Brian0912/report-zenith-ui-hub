
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const menuItems = [
    {
      id: 'sentinel',
      label: 'Sentinel',
      icon: '🛡️',
      path: '/',
      description: 'Report Center'
    },
    {
      id: 'aplus',
      label: 'Aplus Risk Management',
      icon: '⚡',
      path: '/aplus',
      description: 'API Risk Dashboard'
    },
    {
      id: 'risk-finding',
      label: 'Risk & Finding Management',
      icon: '🔍',
      path: '/risk-finding',
      description: 'Aplus Finding Tracker'
    }
  ];

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '80px' : '280px',
    height: '100vh',
    backgroundColor: 'hsl(var(--card))',
    borderRight: '1px solid hsl(var(--border))',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderBottom: '1px solid hsl(var(--border))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: isCollapsed ? '1.25rem' : '1.5rem',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    transition: 'all 0.3s ease'
  };

  const menuStyle: React.CSSProperties = {
    padding: '1rem 0',
    flex: 1
  };

  const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    margin: '0.25rem 0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive 
      ? 'hsl(var(--primary))'
      : 'transparent',
    color: isActive
      ? 'hsl(var(--primary-foreground))'
      : 'hsl(var(--foreground))',
    textDecoration: 'none'
  });

  const iconStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    marginRight: isCollapsed ? '0' : '0.75rem',
    transition: 'all 0.3s ease'
  };

  const labelContainerStyle: React.CSSProperties = {
    opacity: isCollapsed ? 0 : 1,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: '500',
    lineHeight: '1.25'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    opacity: 0.7,
    marginTop: '0.125rem'
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.5rem',
    right: '-12px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '0.75rem',
    color: 'hsl(var(--muted-foreground))',
    transition: 'all 0.2s ease',
    zIndex: 1001
  };

  return (
    <div style={sidebarStyle}>
      <button 
        style={toggleButtonStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
        }}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <div style={headerStyle}>
        <div style={logoStyle}>
          {isCollapsed ? '💎' : '💎 Crystal'}
        </div>
      </div>

      <nav style={menuStyle}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.id}
              style={menuItemStyle(isActive)}
              onClick={() => navigate(item.path)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={iconStyle}>{item.icon}</span>
              {!isCollapsed && (
                <div style={labelContainerStyle}>
                  <div style={labelStyle}>{item.label}</div>
                  <div style={descriptionStyle}>{item.description}</div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
