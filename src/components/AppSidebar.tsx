
import React from 'react';
import { Shield, BarChart3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Sentinel",
    url: "/sentinel",
    icon: BarChart3,
  },
  {
    title: "Aplus Risk Management",
    url: "/aplus-risk-management", 
    icon: Shield,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const sidebarStyle: React.CSSProperties = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(10, 10, 11, 0.95) 0%, rgba(24, 24, 27, 0.95) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
    backdropFilter: 'blur(20px)',
    borderRight: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const headerStyle: React.CSSProperties = {
    padding: '20px',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '700',
    background: isDark 
      ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
      : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
    fontWeight: '500',
  };

  return (
    <Sidebar style={sidebarStyle}>
      <SidebarHeader style={headerStyle}>
        <div style={titleStyle}>Crystal</div>
        <div style={subtitleStyle}>Risk Management Platform</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url || 
                  (item.url === '/sentinel' && location.pathname === '/');
                
                const buttonStyle: React.CSSProperties = {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  margin: '4px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isActive 
                    ? (isDark 
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.15) 100%)'
                      : 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)')
                    : 'transparent',
                  border: isActive 
                    ? `1px solid ${isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(5, 150, 105, 0.3)'}`
                    : '1px solid transparent',
                  color: isActive 
                    ? (isDark ? '#10B981' : '#059669')
                    : (isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'),
                };

                const iconStyle: React.CSSProperties = {
                  width: '20px',
                  height: '20px',
                  color: 'inherit',
                };

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      style={buttonStyle}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = isDark 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.05)';
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.transform = 'translateX(0px)';
                        }
                      }}
                    >
                      <div onClick={() => navigate(item.url)}>
                        <item.icon style={iconStyle} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>
                          {item.title}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
