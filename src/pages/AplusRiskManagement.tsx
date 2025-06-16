import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { RiskFilters } from '../components/risk-management/RiskFilters';
import { RiskMatrix } from '../components/risk-management/RiskMatrix';
import { GovernanceHistoryPanel } from '../components/risk-management/GovernanceHistoryPanel';
import { Entity, Risk, GovernanceGroup } from '../components/risk-management/mockRiskData';
import { fetchEntities } from '../services/psmService';
import { fetchRisks } from '../services/riskService';
import { fetchGovernanceGroups } from '../services/governanceService';

export const AplusRiskManagement: React.FC = () => {
  const { theme } = useTheme();
  const [entities, setEntities] = useState<Entity[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [governanceGroups, setGovernanceGroups] = useState<GovernanceGroup[]>([]);
  const [filteredEntities, setFilteredEntities] = useState<Entity[]>([]);
  const [visibleRisks, setVisibleRisks] = useState<string[]>([]);
  const [showGovernanceHistory, setShowGovernanceHistory] = useState(false);
  const [selectedEntityRisk, setSelectedEntityRisk] = useState<{entityId: string, riskId: string} | null>(null);
  const [showGovernanceList, setShowGovernanceList] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
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
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Metrics calculations
  const totalApis = entities.length;
  const activeRisks = risks.length;
  const resolvedCount = entities.reduce((acc, entity) => {
    return acc + Object.values(entity.riskStatus).filter(status => status.isResolved).length;
  }, 0);
  const totalRiskInstances = entities.length * risks.length;
  const complianceRate = totalRiskInstances > 0 ? Math.round((resolvedCount / totalRiskInstances) * 100) : 0;

  const [animatedMetrics, setAnimatedMetrics] = useState({
    totalApis: 0,
    activeRisks: 0,
    complianceRate: 0
  });

  useEffect(() => {
    if (loading) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedMetrics({
        totalApis: Math.round(totalApis * easeOut),
        activeRisks: Math.round(activeRisks * easeOut),
        complianceRate: Math.round(complianceRate * easeOut)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [totalApis, activeRisks, complianceRate, loading]);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    color: theme === 'dark' ? '#ffffff' : '#1a202c'
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px 32px 12px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const heroSectionStyle: React.CSSProperties = {
    marginBottom: '12px'
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

  const metricsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    marginBottom: '12px'
  };

  const metricCardStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.6) 0%, rgba(31, 41, 55, 0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
    borderRadius: '10px',
    padding: '12px',
    border: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    boxShadow: theme === 'dark' 
      ? '0 3px 12px rgba(0, 0, 0, 0.3)'
      : '0 3px 12px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'default'
  };

  const metricValueStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '2px'
  };

  const metricLabelStyle: React.CSSProperties = {
    fontSize: '11px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    fontWeight: '500'
  };

  const actionBarStyle: React.CSSProperties = {
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
    boxShadow: '0 3px 12px rgba(99, 102, 241, 0.3)'
  };

  const handleEntityRiskHistory = (entityId: string, riskId: string) => {
    setSelectedEntityRisk({ entityId, riskId });
    setShowGovernanceHistory(true);
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: theme === 'dark' ? '#94a3b8' : '#64748b'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={heroSectionStyle}>
          <h1 style={titleStyle}>Aplus Risk Management</h1>
          <p style={subtitleStyle}>
            Comprehensive API risk monitoring and governance dashboard
          </p>
          
          <div style={metricsGridStyle}>
            <div 
              style={metricCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 6px 18px rgba(0, 0, 0, 0.4)'
                  : '0 6px 18px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 3px 12px rgba(0, 0, 0, 0.3)'
                  : '0 3px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{...metricValueStyle, color: '#3b82f6'}}>
                {animatedMetrics.totalApis}
              </div>
              <div style={metricLabelStyle}>Total APIs Monitored</div>
            </div>
            
            <div 
              style={metricCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 6px 18px rgba(0, 0, 0, 0.4)'
                  : '0 6px 18px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 3px 12px rgba(0, 0, 0, 0.3)'
                  : '0 3px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{...metricValueStyle, color: '#f59e0b'}}>
                {animatedMetrics.activeRisks}
              </div>
              <div style={metricLabelStyle}>Active Risk Categories</div>
            </div>
            
            <div 
              style={metricCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 6px 18px rgba(0, 0, 0, 0.4)'
                  : '0 6px 18px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme === 'dark' 
                  ? '0 3px 12px rgba(0, 0, 0, 0.3)'
                  : '0 3px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{...metricValueStyle, color: complianceRate >= 70 ? '#10b981' : complianceRate >= 40 ? '#f59e0b' : '#ef4444'}}>
                {animatedMetrics.complianceRate}%
              </div>
              <div style={metricLabelStyle}>Governance Compliance</div>
            </div>
          </div>
        </div>

        <div style={actionBarStyle}>
          <RiskFilters
            entities={entities}
            risks={risks}
            onFilterChange={setFilteredEntities}
            onRiskVisibilityChange={setVisibleRisks}
          />
        </div>
      </div>

      <div style={contentStyle}>
        <div style={matrixHeaderStyle}>
          <h2 style={matrixTitleStyle}>Risk Matrix</h2>
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
        
        <RiskMatrix
          entities={filteredEntities}
          risks={risks.filter(risk => visibleRisks.includes(risk.id))}
          onEntityRiskHistory={handleEntityRiskHistory}
        />
      </div>

      <GovernanceHistoryPanel
        isOpen={showGovernanceHistory || showGovernanceList}
        onClose={() => {
          setShowGovernanceHistory(false);
          setShowGovernanceList(false);
          setSelectedEntityRisk(null);
        }}
        entityRisk={selectedEntityRisk}
        showAll={showGovernanceList}
        governanceGroups={governanceGroups}
      />
    </div>
  );
};
