
import React, { useState } from 'react';
import { AplusHeader } from '../components/AplusHeader';
import { CleanMetricsDashboard } from '../components/CleanMetricsDashboard';
import { RiskFilters } from '../components/risk-management/RiskFilters';
import { RiskMatrix } from '../components/risk-management/RiskMatrix';
import { GovernanceSidebar } from '../components/risk-management/GovernanceSidebar';
import { mockReports } from '../components/mockData';
import { mockEntities, mockRisks, mockGovernanceGroups } from '../components/risk-management/mockRiskData';

export const AplusRiskManagement: React.FC = () => {
  const [selectedServiceTrees, setSelectedServiceTrees] = useState<string[]>([]);
  const [filteredEntities, setFilteredEntities] = useState(mockEntities);
  const [visibleRiskIds, setVisibleRiskIds] = useState<string[]>(mockRisks.map(r => r.id));
  const [isGovernanceSidebarOpen, setIsGovernanceSidebarOpen] = useState(false);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
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
    color: '#1e293b',
    margin: 0,
    marginBottom: '8px'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#64748b',
    margin: 0
  };

  const contentLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px'
  };

  const filtersLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  };

  const visibleRisks = mockRisks.filter(risk => visibleRiskIds.includes(risk.id));

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
          <div style={filtersLayoutStyle}>
            <RiskFilters 
              entities={mockEntities}
              risks={mockRisks}
              selectedServiceTrees={selectedServiceTrees}
              onServiceTreeChange={setSelectedServiceTrees}
              onFilterChange={setFilteredEntities}
              onRiskVisibilityChange={setVisibleRiskIds}
            />
          </div>
          
          <RiskMatrix 
            entities={filteredEntities}
            risks={visibleRisks}
            onEntityRiskHistory={() => setIsGovernanceSidebarOpen(true)}
          />
        </div>
      </div>

      <GovernanceSidebar 
        isOpen={isGovernanceSidebarOpen}
        onClose={() => setIsGovernanceSidebarOpen(false)}
        governanceGroups={mockGovernanceGroups}
      />
    </div>
  );
};
