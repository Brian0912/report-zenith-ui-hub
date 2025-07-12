
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { BarChart3, Wrench, Search } from 'lucide-react';

interface SidebarProps {}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  path: string;
}

interface ProductGroup {
  id: string;
  label: string;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const productGroups: ProductGroup[] = [
    {
      id: 'sentinel',
      label: 'SENTINEL',
      items: [
        {
          id: 'report',
          label: 'Report',
          icon: BarChart3,
          path: '/sentinel/report-center'
        }
      ]
    },
    {
      id: 'aplus',
      label: 'APLUS',
      items: [
        {
          id: 'enhancement',
          label: 'Enhancement',
          icon: Wrench,
          path: '/aplus/enhancement'
        },
        {
          id: 'finding',
          label: 'Finding',
          icon: Search,
          path: '/aplus/finding'
        }
      ]
    }
  ];

  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarStyle: React.CSSProperties = {
    width: isCollapsed ? '80px' : '280px',
    height: '100vh',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px 20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: isCollapsed ? '20px' : '24px',
    fontWeight: '700',
    color: '#1f2937',
    transition: 'all 0.3s ease'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px 0',
    overflow: 'auto'
  };

  const groupStyle: React.CSSProperties = {
    marginBottom: '40px'
  };

  const groupLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#9ca3af',
    letterSpacing: '0.05em',
    marginBottom: '16px',
    paddingLeft: '20px',
    display: isCollapsed ? 'none' : 'block'
  };

  const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: isActive ? '#1f2937' : '#6b7280',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    backgroundColor: isActive ? '#f3f4f6' : 'transparent',
    borderRight: isActive ? '3px solid #3b82f6' : '3px solid transparent'
  });

  const iconStyle: React.CSSProperties = {
    marginRight: isCollapsed ? '0' : '12px',
    flexShrink: 0
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.3s ease',
    whiteSpace: 'nowrap'
  };

  const toggleButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '24px',
    right: '-12px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#6b7280',
    transition: 'all 0.2s ease',
    zIndex: 1001
  };

  return (
    <div style={sidebarStyle}>
      <button 
        style={toggleButtonStyle} 
        onClick={() => setIsCollapsed(!isCollapsed)}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#ffffff';
        }}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <div style={headerStyle}>
        <div style={logoStyle}>
          {isCollapsed ? '💎' : '💎 Crystal'}
        </div>
      </div>

      <div style={contentStyle}>
        {productGroups.map(group => (
          <div key={group.id} style={groupStyle}>
            <div style={groupLabelStyle}>
              {group.label}
            </div>
            
            {group.items.map(item => {
              const isActive = isItemActive(item.path);
              const IconComponent = item.icon;
              
              return (
                <div
                  key={item.id}
                  style={menuItemStyle(isActive)}
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
                  <div style={iconStyle}>
                    <IconComponent size={20} />
                  </div>
                  <div style={labelStyle}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
