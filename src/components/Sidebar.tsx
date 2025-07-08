
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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
      description: 'Security Finding Tracker'
    }
  ];

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '70px' : '280px',
    height: '100vh',
    backgroundColor: theme === 'dark' 
      ? 'hsl(220 15% 9%)'
      : 'hsl(0 0% 100%)',
    borderRight: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    transition: 'all 0.3s ease',
    position: 'relative',
    boxShadow: theme === 'dark' 
      ? '2px 0 8px rgba(0, 0, 0, 0.2)'
      : '2px 0 8px rgba(0, 0, 0, 0.05)',
    zIndex: 1000
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px 20px',
    borderBottom: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: isCollapsed ? '20px' : '24px',
    fontWeight: '700',
    color: theme === 'dark' ? 'hsl(220 15% 95%)' : 'hsl(220 15% 15%)',
    transition: 'all 0.3s ease'
  };

  const menuStyle: React.CSSProperties = {
    padding: '20px 0',
    flex: 1
  };

  const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '14px 20px',
    margin: '4px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive 
      ? 'hsl(221 83% 53%)'
      : 'transparent',
    color: isActive
      ? 'hsl(0 0% 98%)'
      : (theme === 'dark' ? 'hsl(220 15% 85%)' : 'hsl(220 15% 25%)')
  });

  const iconStyle: React.CSSProperties = {
    fontSize: '18px',
    marginRight: isCollapsed ? '0' : '12px',
    transition: 'all 0.3s ease'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    opacity: isCollapsed ? 0 : 1,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '12px',
    opacity: isCollapsed ? 0 : 0.7,
    transition: 'all 0.3s ease',
    marginTop: '2px'
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20px',
    right: '-15px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: theme === 'dark' ? 'hsl(220 15% 12%)' : 'hsl(0 0% 100%)',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    zIndex: 1001,
    color: theme === 'dark' ? 'hsl(220 15% 85%)' : 'hsl(220 15% 25%)'
  };

  const themeToggleStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: theme === 'dark' ? 'hsl(220 15% 12%)' : 'hsl(220 13% 97%)',
    border: `1px solid ${theme === 'dark' ? 'hsl(220 15% 18%)' : 'hsl(220 13% 91%)'}`,
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={sidebarStyle}>
      <button 
        style={toggleButtonStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
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
                  e.currentTarget.style.backgroundColor = theme === 'dark' 
                    ? 'hsl(220 15% 12%)' 
                    : 'hsl(220 13% 97%)';
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
                <div>
                  <div style={labelStyle}>{item.label}</div>
                  <div style={descriptionStyle}>{item.description}</div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <button 
        style={themeToggleStyle}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};
