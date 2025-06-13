
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
    }
  ];

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '70px' : '280px',
    height: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    borderRight: `1px solid ${theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    boxShadow: theme === 'dark' 
      ? '4px 0 20px rgba(0, 0, 0, 0.3)'
      : '4px 0 20px rgba(0, 0, 0, 0.1)',
    zIndex: 1000
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px 20px',
    borderBottom: `1px solid ${theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: isCollapsed ? '20px' : '24px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    transition: 'all 0.3s ease'
  };

  const menuStyle: React.CSSProperties = {
    padding: '20px 0',
    flex: 1
  };

  const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    margin: '4px 12px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: isActive 
      ? (theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)')
      : 'transparent',
    border: isActive 
      ? `1px solid ${theme === 'dark' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.3)'}`
      : '1px solid transparent',
    boxShadow: isActive 
      ? (theme === 'dark' ? '0 4px 12px rgba(99, 102, 241, 0.2)' : '0 4px 12px rgba(99, 102, 241, 0.15)')
      : 'none'
  });

  const iconStyle: React.CSSProperties = {
    fontSize: '20px',
    marginRight: isCollapsed ? '0' : '16px',
    transition: 'all 0.3s ease'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '500',
    color: theme === 'dark' ? '#ffffff' : '#2d3748',
    opacity: isCollapsed ? 0 : 1,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme === 'dark' ? '#a0aec0' : '#718096',
    opacity: isCollapsed ? 0 : 1,
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
    background: theme === 'dark' ? '#4a5568' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    zIndex: 1001
  };

  const themeToggleStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px',
    borderRadius: '12px',
    background: theme === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(237, 242, 247, 0.8)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={sidebarStyle}>
      <button 
        style={toggleButtonStyle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
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
                  e.currentTarget.style.background = theme === 'dark' 
                    ? 'rgba(74, 85, 104, 0.3)' 
                    : 'rgba(237, 242, 247, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
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
