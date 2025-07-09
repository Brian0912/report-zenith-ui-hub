
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

interface SidebarProps {}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  description: string;
}

interface ProductGroup {
  id: string;
  label: string;
  icon: string;
  subItems: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['sentinel', 'aplus']);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const productGroups: ProductGroup[] = [
    {
      id: 'sentinel',
      label: 'Sentinel',
      icon: '🛡️',
      subItems: [
        {
          id: 'report-center',
          label: 'Report Center',
          icon: '📊',
          path: '/sentinel/report-center',
          description: 'Monitoring Dashboard'
        }
      ]
    },
    {
      id: 'aplus',
      label: 'Aplus',
      icon: '⚡',
      subItems: [
        {
          id: 'enhancement',
          label: 'Enhancement Management',
          icon: '🔧',
          path: '/aplus/enhancement',
          description: 'API Risk Dashboard'
        },
        {
          id: 'finding',
          label: 'Finding Management',
          icon: '🔍',
          path: '/aplus/finding',
          description: 'Security Findings'
        }
      ]
    }
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isGroupActive = (group: ProductGroup) => {
    return group.subItems.some(item => location.pathname === item.path);
  };

  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

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

  const groupStyle = (isActive: boolean): React.CSSProperties => ({
    margin: '0.25rem 0.5rem'
  });

  const groupHeaderStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? 'hsl(var(--primary))' : 'transparent',
    color: isActive ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
    fontWeight: '600'
  });

  const subItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem 0.5rem 2rem',
    margin: '0.125rem 0',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? 'hsl(var(--accent))' : 'transparent',
    color: isActive ? 'hsl(var(--accent-foreground))' : 'hsl(var(--muted-foreground))',
    fontSize: '0.875rem'
  });

  const iconStyle: React.CSSProperties = {
    fontSize: '1rem',
    marginRight: isCollapsed ? '0' : '0.75rem',
    transition: 'all 0.3s ease'
  };

  const subIconStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    marginRight: isCollapsed ? '0' : '0.5rem',
    transition: 'all 0.3s ease'
  };

  const labelContainerStyle: React.CSSProperties = {
    opacity: isCollapsed ? 0 : 1,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: 1
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

  const chevronStyle = (isExpanded: boolean): React.CSSProperties => ({
    fontSize: '0.75rem',
    marginLeft: 'auto',
    transition: 'transform 0.2s ease',
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
  });

  return (
    <div style={sidebarStyle}>
      <button 
        style={toggleButtonStyle} 
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
        }}
        onMouseLeave={e => {
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
        {productGroups.map(group => {
          const isGroupExpanded = expandedGroups.includes(group.id);
          const isActive = isGroupActive(group);
          
          return (
            <div key={group.id} style={groupStyle(isActive)}>
              <div 
                style={groupHeaderStyle(isActive)}
                onClick={() => {
                  if (!isCollapsed) {
                    toggleGroup(group.id);
                  }
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={iconStyle}>{group.icon}</span>
                {!isCollapsed && (
                  <div style={labelContainerStyle}>
                    <span>{group.label}</span>
                  </div>
                )}
                {!isCollapsed && (
                  <span style={chevronStyle(isGroupExpanded)}>▶</span>
                )}
              </div>

              {!isCollapsed && isGroupExpanded && (
                <div>
                  {group.subItems.map(item => {
                    const isItemActiveState = isItemActive(item.path);
                    
                    return (
                      <div 
                        key={item.id}
                        style={subItemStyle(isItemActiveState)}
                        onClick={() => navigate(item.path)}
                        onMouseEnter={e => {
                          if (!isItemActiveState) {
                            e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isItemActiveState) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span style={subIconStyle}>{item.icon}</span>
                        <div style={labelContainerStyle}>
                          <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.125rem' }}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
