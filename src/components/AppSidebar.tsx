
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Sentinel",
    url: "/",
    description: "Report Center"
  },
  {
    title: "Aplus Risk Management",
    url: "/aplus-risk-management",
    description: "Risk Management System"
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <SidebarHeader style={{ padding: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff' }}>
          Crystal Risk Management
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel style={{ color: '#a0a0a0' }}>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    style={{
                      backgroundColor: location.pathname === item.url ? '#3b82f6' : 'transparent',
                      color: location.pathname === item.url ? '#ffffff' : '#d1d5db',
                      borderRadius: '0.375rem',
                      marginBottom: '0.25rem'
                    }}
                  >
                    <Link to={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div>
                        <div style={{ fontWeight: '500' }}>{item.title}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{item.description}</div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
