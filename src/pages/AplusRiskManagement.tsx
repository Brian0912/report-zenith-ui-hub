
import React, { useState } from 'react';
import { AplusHeader } from '../components/AplusHeader';
import { CleanMetricsDashboard } from '../components/CleanMetricsDashboard';
import { RiskFilters } from '../components/risk-management/RiskFilters';
import { RiskMatrix } from '../components/risk-management/RiskMatrix';
import { GovernanceSidebar } from '../components/risk-management/GovernanceSidebar';
import { mockReports } from '../components/mockData';

export const AplusRiskManagement: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'hsl(var(--muted))'
  };

  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 24px'
  };

  const titleSectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    margin: 0,
    marginBottom: '8px'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: 'hsl(var(--muted-foreground))',
    margin: 0
  };

  const contentLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '32px'
  };

  // Transform mockReports to risk metrics for display
  const riskMetrics = [
    {
      label: 'Total Risks',
      value: 24,
      color: 'hsl(var(--primary))',
      icon: '🛡️'
    },
    {
      label: 'High Risk',
      value: 3,
      color: 'hsl(var(--destructive))',
      icon: '🚨'
    },
    {
      label: 'Medium Risk',
      value: 8,
      color: 'hsl(var(--warning))',
      icon: '⚠️'
    },
    {
      label: 'Low Risk',
      value: 13,
      color: 'hsl(var(--success))',
      icon: '✅'
    }
  ];

  return (
    <div style={containerStyle}>
      <AplusHeader />
      
      <div style={mainContentStyle}>
        <div style={titleSectionStyle}>
          <h1 style={titleStyle}>API Risk Management Dashboard</h1>
          <p style={subtitleStyle}>
            Comprehensive API security risk assessment and monitoring
          </p>
        </div>

        <CleanMetricsDashboard reports={mockReports} />
        
        <div style={contentLayoutStyle}>
          <div>
            <RiskFilters />
            <RiskMatrix onEntitySelect={setSelectedEntity} />
          </div>
          
          <GovernanceSidebar 
            selectedEntity={selectedEntity}
            onEntitySelect={setSelectedEntity}
          />
        </div>
      </div>
    </div>
  );
};
