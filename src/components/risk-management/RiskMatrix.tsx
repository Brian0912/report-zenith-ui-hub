import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { Entity, Risk } from './mockRiskData';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface RiskMatrixProps {
  entities: Entity[];
  risks: Risk[];
  onEntityRiskHistory: (entityId: string, riskId: string) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({
  entities,
  risks,
  onEntityRiskHistory
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedEntities, setSelectedEntities] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [pendingToggle, setPendingToggle] = useState<{entityId: string, riskId: string} | null>(null);
  const [riskStatus, setRiskStatus] = useState<Record<string, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    entities.forEach(entity => {
      initial[entity.id] = {};
      risks.forEach(risk => {
        initial[entity.id][risk.id] = entity.riskStatus[risk.id]?.isResolved || false;
      });
    });
    return initial;
  });

  // Pagination calculations
  const totalPages = Math.ceil(entities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntities = entities.slice(startIndex, endIndex);

  const containerStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.6)'
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    backdropFilter: 'blur(10px)',
    boxShadow: theme === 'dark' 
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)',
    height: '700px',
    display: 'flex',
    flexDirection: 'column'
  };

  const batchControlsStyle: React.CSSProperties = {
    padding: '12px 20px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    flexShrink: 0
  };

  const batchControlsLeftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const batchControlsRightStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const batchButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
  };

  const tableContainerStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    position: 'relative',
    maxWidth: '100%'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: `${600 + risks.length * 200}px`
  };

  const headerStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderBottom: `2px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '13px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    whiteSpace: 'nowrap'
  };

  const rowStyle = (index: number): React.CSSProperties => ({
    background: index % 2 === 0 
      ? (theme === 'dark' ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)')
      : 'transparent',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    transition: 'all 0.2s ease'
  });

  const cellStyle: React.CSSProperties = {
    padding: '10px',
    verticalAlign: 'middle',
    borderRight: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const disabledCellStyle: React.CSSProperties = {
    ...cellStyle,
    background: theme === 'dark' 
      ? 'rgba(71, 85, 105, 0.3)' 
      : 'rgba(203, 213, 225, 0.3)',
    color: theme === 'dark' ? '#64748b' : '#94a3b8',
    textAlign: 'center'
  };

  const checkboxStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    accentColor: '#6366f1'
  };

  const psmStyle: React.CSSProperties = {
    fontWeight: '500',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    fontSize: '13px'
  };

  const entityStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const apiPathStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
  };

  const methodBadgeStyle = (method: string): React.CSSProperties => {
    const colorMap: Record<string, string> = {
      'GET': '#3b82f6',
      'POST': '#10b981',
      'PUT': '#f59e0b',
      'DELETE': '#ef4444',
      'PATCH': '#8b5cf6'
    };

    return {
      background: colorMap[method] || '#6b7280',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '600'
    };
  };

  const riskCellStyle: React.CSSProperties = {
    textAlign: 'center',
    minWidth: '180px'
  };

  const riskCellContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px'
  };

  const toggleSwitchStyle = (isOn: boolean): React.CSSProperties => ({
    position: 'relative',
    display: 'inline-block',
    width: '40px',
    height: '20px',
    background: isOn ? '#10b981' : (theme === 'dark' ? '#475569' : '#cbd5e1'),
    borderRadius: '10px',
    cursor: isOn ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    outline: 'none',
    opacity: isOn ? 0.7 : 1
  });

  const toggleKnobStyle = (isOn: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: '2px',
    left: isOn ? '22px' : '2px',
    width: '16px',
    height: '16px',
    background: 'white',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  });

  const actionButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    marginRight: '3px',
    whiteSpace: 'nowrap'
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    background: theme === 'dark' ? '#475569' : '#cbd5e1',
    cursor: 'not-allowed',
    opacity: 0.5
  };

  const paginationStyle: React.CSSProperties = {
    padding: '12px 20px',
    borderTop: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    flexShrink: 0
  };

  const pageInfoStyle: React.CSSProperties = {
    fontSize: '13px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b'
  };

  const paginationControlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const pageButtonStyle: React.CSSProperties = {
    background: theme === 'dark' ? '#334155' : '#f1f5f9',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const currentPageButtonStyle: React.CSSProperties = {
    ...pageButtonStyle,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none'
  };

  const selectStyle: React.CSSProperties = {
    background: theme === 'dark' ? '#334155' : '#f1f5f9',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const getSeverityColor = (severity: string) => {
    const colorMap: Record<string, string> = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#dc2626'
    };
    return colorMap[severity] || '#6b7280';
  };

  const hasRiskData = (entityId: string, riskId: string) => {
    const entity = entities.find(e => e.id === entityId);
    return entity && entity.riskStatus[riskId] !== undefined;
  };

  const hasAnyGovernanceData = (entityId: string, riskId: string) => {
    const entity = entities.find(e => e.id === entityId);
    const riskData = entity?.riskStatus[riskId];
    if (!riskData) return false;
    
    // Check if there's a valid current governance ID (not empty or just whitespace)
    const hasCurrentGovernance = !!(riskData.latestGovernanceId && 
                                   riskData.latestGovernanceId.trim() !== '' &&
                                   riskData.latestGovernanceId !== 'N/A');
    
    // Check if there's valid governance history with actual IDs
    const hasGovernanceHistory = !!(riskData.governanceHistory && 
                                   riskData.governanceHistory.length > 0 &&
                                   riskData.governanceHistory.some(g => {
                                     // Explicit type guard to ensure g is not null/undefined and is an object
                                     if (g === null || g === undefined || typeof g !== 'object') {
                                       return false;
                                     }
                                     
                                     // Now TypeScript knows g is not null and is an object
                                     if (!('id' in g)) {
                                       return false;
                                     }
                                     
                                     // Safe to cast now since we've verified the structure
                                     const govItem = g as { id?: string };
                                     return !!(govItem.id && govItem.id.trim() !== '' && govItem.id !== 'N/A');
                                   }));
    
    return hasCurrentGovernance || hasGovernanceHistory;
  };

  const getGovernanceStatus = (entityId: string, riskId: string) => {
    const entity = entities.find(e => e.id === entityId);
    const riskData = entity?.riskStatus[riskId];
    
    if (!riskData) return 'No Risk';
    if (riskData.isResolved) return 'Compliant';
    return 'Non-Compliant';
  };

  const handleToggleRisk = (entityId: string, riskId: string) => {
    if (!hasRiskData(entityId, riskId)) return;
    
    const currentState = riskStatus[entityId]?.[riskId] || false;
    // Only allow turning on if it's currently off
    if (!currentState) {
      setPendingToggle({ entityId, riskId });
      setConfirmationOpen(true);
    }
  };

  const confirmToggle = () => {
    if (pendingToggle) {
      setRiskStatus(prev => ({
        ...prev,
        [pendingToggle.entityId]: {
          ...prev[pendingToggle.entityId],
          [pendingToggle.riskId]: true
        }
      }));
    }
    setConfirmationOpen(false);
    setPendingToggle(null);
  };

  const cancelToggle = () => {
    setConfirmationOpen(false);
    setPendingToggle(null);
  };

  const handleGovernanceClick = (entityId: string, riskId: string) => {
    const entity = entities.find(e => e.id === entityId);
    const governanceId = entity?.riskStatus[riskId]?.latestGovernanceId;
    if (governanceId) {
      navigate(`/governance/${governanceId}`);
    }
  };

  const handleEntitySelect = (entityId: string, selected: boolean) => {
    const newSelected = new Set(selectedEntities);
    if (selected) {
      newSelected.add(entityId);
    } else {
      newSelected.delete(entityId);
    }
    setSelectedEntities(newSelected);
  };

  const handleSelectAll = () => {
    const allSelected = selectedEntities.size === paginatedEntities.length;
    if (allSelected) {
      setSelectedEntities(new Set());
    } else {
      setSelectedEntities(new Set(paginatedEntities.map(e => e.id)));
    }
  };

  const handleBatchToggle = () => {
    const selectedEntityIds = Array.from(selectedEntities);
    if (selectedEntityIds.length === 0) return;

    setRiskStatus(prev => {
      const newStatus = { ...prev };
      selectedEntityIds.forEach(entityId => {
        risks.forEach(risk => {
          if (hasRiskData(entityId, risk.id)) {
            if (!newStatus[entityId]) newStatus[entityId] = {};
            // Only turn on, never turn off
            if (!newStatus[entityId][risk.id]) {
              newStatus[entityId][risk.id] = true;
            }
          }
        });
      });
      return newStatus;
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={batchControlsStyle}>
          <div style={batchControlsLeftStyle}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={selectedEntities.size === paginatedEntities.length && paginatedEntities.length > 0}
                onChange={handleSelectAll}
                style={checkboxStyle}
              />
              Select All
            </label>
            
            <button
              style={batchButtonStyle}
              onClick={handleBatchToggle}
              disabled={selectedEntities.size === 0}
              onMouseEnter={(e) => {
                if (selectedEntities.size > 0) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)';
              }}
            >
              🔄 Batch Toggle {selectedEntities.size > 0 && `(${selectedEntities.size} selected)`}
            </button>
          </div>

          <div style={batchControlsRightStyle}>
            <span style={pageInfoStyle}>
              Showing {startIndex + 1}-{Math.min(endIndex, entities.length)} of {entities.length}
            </span>
          </div>
        </div>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={headerStyle}>
              <tr>
                <th style={{...headerCellStyle, width: '40px'}}>
                  <input 
                    type="checkbox" 
                    style={checkboxStyle}
                    checked={selectedEntities.size === paginatedEntities.length && paginatedEntities.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{...headerCellStyle, width: '100px'}}>P.S.M</th>
                <th style={{...headerCellStyle, width: '200px'}}>Entity</th>
                {risks.map((risk) => (
                  <th 
                    key={risk.id} 
                    style={{
                      ...headerCellStyle, 
                      ...riskCellStyle,
                      borderBottom: `3px solid ${getSeverityColor(risk.severity)}`
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div>{risk.name}</div>
                      <div style={{
                        fontSize: '9px',
                        color: getSeverityColor(risk.severity),
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        marginTop: '2px'
                      }}>
                        {risk.severity}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedEntities.map((entity, index) => (
                <tr 
                  key={entity.id} 
                  style={rowStyle(index)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 
                      ? (theme === 'dark' ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)')
                      : 'transparent';
                  }}
                >
                  <td style={cellStyle}>
                    <input 
                      type="checkbox" 
                      style={checkboxStyle}
                      checked={selectedEntities.has(entity.id)}
                      onChange={(e) => handleEntitySelect(entity.id, e.target.checked)}
                    />
                  </td>
                  <td style={cellStyle}>
                    <div style={psmStyle}>{entity.psm}</div>
                  </td>
                  <td style={cellStyle}>
                    <div style={entityStyle}>
                      <span style={apiPathStyle}>{entity.apiPath}</span>
                      <span style={methodBadgeStyle(entity.method)}>
                        {entity.method}
                      </span>
                    </div>
                  </td>
                  {risks.map((risk) => {
                    const hasData = hasRiskData(entity.id, risk.id);
                    const status = getGovernanceStatus(entity.id, risk.id);
                    
                    if (!hasData) {
                      return (
                        <td key={risk.id} style={disabledCellStyle}>
                          <div style={riskCellContentStyle}>
                            <div style={{ 
                              fontSize: '12px', 
                              fontWeight: '500',
                              marginBottom: '6px',
                              color: theme === 'dark' ? '#94a3b8' : '#64748b'
                            }}>
                              No Risk
                            </div>
                            <button
                              style={disabledButtonStyle}
                              disabled={true}
                              title="No risk data available"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      );
                    }

                    const statusColor = status === 'Compliant' ? '#10b981' : 
                                      status === 'Non-Compliant' ? '#ef4444' : '#6b7280';
                    
                    return (
                      <td key={risk.id} style={{...cellStyle, ...riskCellStyle}}>
                        <div style={riskCellContentStyle}>
                          <div style={{ 
                            fontSize: '12px', 
                            fontWeight: '500',
                            marginBottom: '6px',
                            color: statusColor
                          }}>
                            {status}
                          </div>
                          
                          <button
                            style={actionButtonStyle}
                            onClick={() => navigate(`/entity/${entity.id}/risk/${risk.id}`)}
                            title="View API-Risk details"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={paginationStyle}>
          <div style={pageInfoStyle}>
            Page {currentPage} of {totalPages}
          </div>
          
          <div style={paginationControlsStyle}>
            <button 
              style={pageButtonStyle}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, currentPage - 2) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  style={pageNum === currentPage ? currentPageButtonStyle : pageButtonStyle}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              style={pageButtonStyle}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            
            <select
              style={selectStyle}
              value={itemsPerPage}
              onChange={(e) => changeItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>

      <AlertDialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Risk Resolution</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark this risk as resolved? This action will update the governance status and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelToggle}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmToggle}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
