
import React, { useState } from 'react';
import { RiskFilters } from '../components/risk-management/RiskFilters';
import { RiskMatrix } from '../components/risk-management/RiskMatrix';
import { GovernanceHistoryPanel } from '../components/risk-management/GovernanceHistoryPanel';
import { mockEntities, mockRisks } from '../components/risk-management/mockRiskData';

const AplusRiskManagement = () => {
  const [filteredEntities, setFilteredEntities] = useState(mockEntities);
  const [selectedRisks, setSelectedRisks] = useState(mockRisks.map(r => r.id));
  const [showGovernanceHistory, setShowGovernanceHistory] = useState(false);
  const [historyEntityRisk, setHistoryEntityRisk] = useState<{entityId: string, riskId: string} | null>(null);
  const [showAllGovernanceList, setShowAllGovernanceList] = useState(false);

  const handleEntityHistoryClick = (entityId: string, riskId: string) => {
    setHistoryEntityRisk({entityId, riskId});
    setShowGovernanceHistory(true);
    setShowAllGovernanceList(false);
  };

  const handleGovernanceListClick = () => {
    setShowAllGovernanceList(true);
    setShowGovernanceHistory(true);
    setHistoryEntityRisk(null);
  };

  const handleClosePanel = () => {
    setShowGovernanceHistory(false);
    setShowAllGovernanceList(false);
    setHistoryEntityRisk(null);
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Aplus Risk Management
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Manage API risks across entities, P.S.M services, and governance groups
        </p>
        
        <button
          onClick={handleGovernanceListClick}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            marginBottom: '1rem'
          }}
        >
          Governance List
        </button>
      </div>

      <RiskFilters
        entities={mockEntities}
        risks={mockRisks}
        onEntitiesFilter={setFilteredEntities}
        selectedRisks={selectedRisks}
        onRisksChange={setSelectedRisks}
      />

      <RiskMatrix
        entities={filteredEntities}
        risks={mockRisks.filter(r => selectedRisks.includes(r.id))}
        onEntityHistoryClick={handleEntityHistoryClick}
      />

      {showGovernanceHistory && (
        <GovernanceHistoryPanel
          entityRisk={historyEntityRisk}
          showAllGovernance={showAllGovernanceList}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
};

export default AplusRiskManagement;
