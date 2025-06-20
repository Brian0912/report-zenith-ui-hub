import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { PsmSearch } from '../components/risk-management/PsmSearch';
import { ApiSearch } from '../components/risk-management/ApiSearch';
import { RiskFilters } from '../components/risk-management/RiskFilters';
import { RiskMatrix } from '../components/risk-management/RiskMatrix';
import { GovernanceHistoryPanel } from '../components/risk-management/GovernanceHistoryPanel';
import { GovernanceSidebar } from '../components/risk-management/GovernanceSidebar';
import { fetchEntities } from '../services/entityService';
import { fetchRisks } from '../services/riskService';
import { fetchGovernanceGroups } from '../services/governanceService';
import { Entity, Risk, GovernanceGroup } from '../components/risk-management/mockRiskData';

export const AplusRiskManagement: React.FC = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [governanceGroups, setGovernanceGroups] = useState<GovernanceGroup[]>([]);
  const [filteredEntities, setFilteredEntities] = useState<Entity[]>([]);
  const [visibleRisks, setVisibleRisks] = useState<string[]>([]);
  const [showGovernanceHistory, setShowGovernanceHistory] = useState(false);
  const [selectedEntityRisk, setSelectedEntityRisk] = useState<{entityId: string, riskId: string} | null>(null);
  const [showGovernanceList, setShowGovernanceList] = useState(false);
  const [selectedPsms, setSelectedPsms] = useState<string[]>([]);
  const [selectedApis, setSelectedApis] = useState<string[]>([]);
  const [selectedServiceTrees, setSelectedServiceTrees] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize filters from URL on load
  useEffect(() => {
    const psmParams = searchParams.get('psms');
    const serviceTreeParams = searchParams.get('serviceTrees');
    
    if (psmParams) {
      setSelectedPsms(psmParams.split(',').filter(Boolean));
    }
    if (serviceTreeParams) {
      setSelectedServiceTrees(serviceTreeParams.split(',').filter(Boolean));
    }
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    if (selectedPsms.length > 0) {
      newParams.set('psms', selectedPsms.join(','));
    } else {
      newParams.delete('psms');
    }
    
    if (selectedServiceTrees.length > 0) {
      newParams.set('serviceTrees', selectedServiceTrees.join(','));
    } else {
      newParams.delete('serviceTrees');
    }
    
    setSearchParams(newParams, { replace: true });
  }, [selectedPsms, selectedServiceTrees, setSearchParams]);

  // Load data from services
  useEffect(() => {
    const loadData = async () => {
      try {
        const [entitiesData, risksData, governanceData] = await Promise.all([
          fetchEntities(),
          fetchRisks(),
          fetchGovernanceGroups()
        ]);
        
        setEntities(entitiesData);
        setRisks(risksData);
        setGovernanceGroups(governanceData);
        setFilteredEntities(entitiesData);
        setVisibleRisks(risksData.map(r => r.id));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply all filters when any filter changes
  useEffect(() => {
    let filtered = entities;

    // Apply PSM filter
    if (selectedPsms.length > 0) {
      filtered = filtered.filter(entity => selectedPsms.includes(entity.psm));
    }

    // Apply API filter
    if (selectedApis.length > 0) {
      filtered = filtered.filter(entity => selectedApis.includes(entity.apiPath));
    }

    // Apply Service Tree filter
    if (selectedServiceTrees.length > 0) {
      filtered = filtered.filter(entity => {
        const entityString = `${entity.apiPath} ${entity.method}`;
        return selectedServiceTrees.some(st => 
          entity.psm.includes(st) || entityString.includes(st)
        );
      });
    }

    setFilteredEntities(filtered);
  }, [entities, selectedPsms, selectedApis, selectedServiceTrees]);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    marginRight: showGovernanceList ? '400px' : '0',
    transition: 'margin-right 0.3s ease'
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px 32px 12px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const heroSectionStyle: React.CSSProperties = {
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  };

  const titleContainerStyle: React.CSSProperties = {
    flex: 1
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '4px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginBottom: '12px'
  };

  const governanceButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 3px 12px rgba(99, 102, 241, 0.3)',
    flexShrink: 0
  };

  const filtersContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gap: '16px',
    alignItems: 'start',
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.8)'
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    padding: '12px',
    border: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    backdropFilter: 'blur(10px)',
    marginBottom: '12px'
  };

  const contentStyle: React.CSSProperties = {
    padding: '0 32px 32px'
  };

  const matrixHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  };

  const matrixTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const handleEntityRiskHistory = (entityId: string, riskId: string) => {
    setSelectedEntityRisk({ entityId, riskId });
    setShowGovernanceHistory(true);
  };

  const handleOtherFiltersChange = (filtered: Entity[]) => {
    // This handles the Risk Categories filters
    setFilteredEntities(filtered);
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ fontSize: '18px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={heroSectionStyle}>
            <div style={titleContainerStyle}>
              <h1 style={titleStyle}>Aplus Risk Management</h1>
              <p style={subtitleStyle}>
                Comprehensive API risk monitoring and governance dashboard
              </p>
            </div>
            
            <button
              style={governanceButtonStyle}
              onClick={() => setShowGovernanceList(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 3px 12px rgba(99, 102, 241, 0.3)';
              }}
            >
              📋 Governance List
            </button>
          </div>

          <div style={filtersContainerStyle}>
            <PsmSearch
              entities={entities}
              selectedPsms={selectedPsms}
              onPsmChange={setSelectedPsms}
            />
            <ApiSearch
              selectedApis={selectedApis}
              onApiChange={setSelectedApis}
            />
            <RiskFilters
              entities={entities}
              risks={risks}
              selectedServiceTrees={selectedServiceTrees}
              onServiceTreeChange={setSelectedServiceTrees}
              onFilterChange={handleOtherFiltersChange}
              onRiskVisibilityChange={setVisibleRisks}
            />
          </div>
        </div>

        <div style={contentStyle}>
          <div style={matrixHeaderStyle}>
            <h2 style={matrixTitleStyle}>Risk Matrix</h2>
          </div>
          
          <RiskMatrix
            entities={filteredEntities}
            risks={risks.filter(risk => visibleRisks.includes(risk.id))}
            onEntityRiskHistory={handleEntityRiskHistory}
          />
        </div>
      </div>

      <GovernanceHistoryPanel
        isOpen={showGovernanceHistory}
        onClose={() => {
          setShowGovernanceHistory(false);
          setSelectedEntityRisk(null);
        }}
        entityRisk={selectedEntityRisk}
        showAll={false}
        governanceGroups={governanceGroups}
      />

      <GovernanceSidebar
        isOpen={showGovernanceList}
        onClose={() => setShowGovernanceList(false)}
        governanceGroups={governanceGroups}
      />
    </>
  );
};
