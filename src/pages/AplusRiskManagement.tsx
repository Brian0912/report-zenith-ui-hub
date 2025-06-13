
import React, { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RiskMatrix } from '../components/risk-management/RiskMatrix';
import { RiskFilters } from '../components/risk-management/RiskFilters';
import { GovernanceHistoryPanel } from '../components/risk-management/GovernanceHistoryPanel';
import { mockEntities, mockRisks } from '../components/risk-management/mockRiskData';

const AplusRiskManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [selectedRisks, setSelectedRisks] = useState<string[]>(mockRisks.map(r => r.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPSMs, setSelectedPSMs] = useState<string[]>([]);
  const [isGovernanceHistoryOpen, setIsGovernanceHistoryOpen] = useState(false);
  const [historyContext, setHistoryContext] = useState<{entityId?: string, riskId?: string} | null>(null);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: isDark 
      ? 'linear-gradient(135deg, #0A0A0B 0%, #1A1A1B 100%)'
      : 'linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)',
    color: isDark ? '#FFFFFF' : '#000000',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '24px',
    borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    background: isDark 
      ? 'rgba(10, 10, 11, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    background: isDark 
      ? 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)'
      : 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
    fontWeight: '500',
    marginLeft: 'auto',
  };

  const governanceButtonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '12px',
    background: isDark 
      ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
      : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isDark 
      ? '0 4px 20px rgba(59, 130, 246, 0.3)'
      : '0 4px 20px rgba(37, 99, 235, 0.3)',
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px',
  };

  const filteredEntities = mockEntities.filter(entity => {
    const matchesSearch = !searchQuery || 
      entity.psm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.apiPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.httpMethod.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPSM = selectedPSMs.length === 0 || selectedPSMs.includes(entity.psm);
    
    return matchesSearch && matchesPSM;
  });

  const openGovernanceHistory = (entityId?: string, riskId?: string) => {
    setHistoryContext({ entityId, riskId });
    setIsGovernanceHistoryOpen(true);
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <SidebarTrigger />
        <h1 style={titleStyle}>Aplus Risk Management</h1>
        <div style={subtitleStyle}>API Risk Assessment & Governance</div>
        <button 
          style={governanceButtonStyle}
          onClick={() => openGovernanceHistory()}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = isDark 
              ? '0 6px 25px rgba(59, 130, 246, 0.4)'
              : '0 6px 25px rgba(37, 99, 235, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = isDark 
              ? '0 4px 20px rgba(59, 130, 246, 0.3)'
              : '0 4px 20px rgba(37, 99, 235, 0.3)';
          }}
        >
          Governance List
        </button>
      </header>

      <div style={contentStyle}>
        <RiskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPSMs={selectedPSMs}
          onPSMsChange={setSelectedPSMs}
          selectedRisks={selectedRisks}
          onRisksChange={setSelectedRisks}
          entities={mockEntities}
          risks={mockRisks}
        />

        <RiskMatrix
          entities={filteredEntities}
          risks={mockRisks.filter(risk => selectedRisks.includes(risk.id))}
          onGovernanceHistoryClick={openGovernanceHistory}
        />
      </div>

      <GovernanceHistoryPanel
        isOpen={isGovernanceHistoryOpen}
        onClose={() => setIsGovernanceHistoryOpen(false)}
        context={historyContext}
      />
    </div>
  );
};

export default AplusRiskManagement;
