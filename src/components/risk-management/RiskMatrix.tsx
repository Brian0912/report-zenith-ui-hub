
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

  // Pagination calculations
  const totalPages = Math.ceil(entities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEntities = entities.slice(startIndex, endIndex);

  const containerStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    height: '900px',
    display: 'flex',
    flexDirection: 'column'
  };

  const batchControlsStyle: React.CSSProperties = {
    padding: '12px 20px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    flexShrink: 0
  };

  const batchControlsRightStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
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
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderBottom: '2px solid #cbd5e1',
    position: 'sticky',
    top: 0,
    zIndex: 10
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '13px',
    color: '#334155',
    whiteSpace: 'nowrap'
  };

  const rowStyle = (index: number): React.CSSProperties => ({
    background: index % 2 === 0 
      ? 'rgba(248, 250, 252, 0.8)'
      : 'transparent',
    borderBottom: '1px solid #e2e8f0',
    transition: 'all 0.2s ease'
  });

  const cellStyle: React.CSSProperties = {
    padding: '10px',
    verticalAlign: 'middle',
    borderRight: '1px solid #e2e8f0'
  };

  const disabledCellStyle: React.CSSProperties = {
    ...cellStyle,
    background: 'rgba(203, 213, 225, 0.3)',
    color: '#94a3b8',
    textAlign: 'center'
  };

  const checkboxStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    accentColor: '#6366f1'
  };

  const psmStyle: React.CSSProperties = {
    fontWeight: '500',
    color: '#64748b',
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
    color: '#1e293b'
  };

  // Muted method badge colors
  const methodBadgeStyle = (method: string): React.CSSProperties => {
    const colorMap: Record<string, string> = {
      'GET': '#1e40af',      // Muted blue
      'POST': '#047857',     // Muted green  
      'PUT': '#b45309',      // Muted amber
      'DELETE': '#b91c1c',   // Muted red
      'PATCH': '#7c2d12'     // Muted purple
    };

    return {
      background: colorMap[method] || '#4b5563',
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

  // Muted status badge colors
  const statusBadgeStyle = (status: string): React.CSSProperties => {
    const colorMap: Record<string, string> = {
      'Compliant': '#047857',      // Muted green
      'Non-Compliant': '#b91c1c',  // Muted red
      'No Risk': '#4b5563'         // Muted gray
    };

    return {
      background: colorMap[status] || '#4b5563',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      marginBottom: '4px'
    };
  };

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
    whiteSpace: 'nowrap'
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...actionButtonStyle,
    background: '#cbd5e1',
    cursor: 'not-allowed',
    opacity: 0.5
  };

  const paginationStyle: React.CSSProperties = {
    padding: '12px 20px',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    flexShrink: 0
  };

  const pageInfoStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#64748b'
  };

  const paginationControlsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const pageButtonStyle: React.CSSProperties = {
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
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
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    color: '#334155'
  };

  // Muted severity colors for risk headers
  const getSeverityColor = (severity: string) => {
    const colorMap: Record<string, string> = {
      low: '#047857',      // Muted green
      medium: '#b45309',   // Muted amber
      high: '#b91c1c',     // Muted red
      critical: '#991b1b'  // Muted dark red
    };
    return colorMap[severity] || '#4b5563';
  };

  const hasRiskData = (entityId: string, riskId: string) => {
    const entity = entities.find(e => e.id === entityId);
    return entity && entity.riskStatus[riskId] !== undefined;
  };

  const getGovernanceStatus = (entityId: string, riskId: string) => {
    const entity = entities.find(e => e.id === entityId);
    const riskData = entity?.riskStatus[riskId];
    
    if (!riskData) return 'No Risk';
    
    return riskData.isResolved ? 'Compliant' : 'Non-Compliant';
  };

  const handleDetailsClick = (entityId: string, riskId: string) => {
    if (!hasRiskData(entityId, riskId)) return;
    navigate(`/entity/${entityId}/risk/${riskId}`);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500' }}>
            </label>
          </div>

          <div style={batchControlsRightStyle}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Showing {startIndex + 1}-{Math.min(endIndex, entities.length)} of {entities.length}
            </span>
          </div>
        </div>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead style={headerStyle}>
              <tr>
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
                    e.currentTarget.style.background = 'rgba(226, 232, 240, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 
                      ? 'rgba(248, 250, 252, 0.8)'
                      : 'transparent';
                  }}
                >
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
                            <div style={statusBadgeStyle('No Risk')}>No Risk</div>
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
                    
                    return (
                      <td key={risk.id} style={{...cellStyle, ...riskCellStyle}}>
                        <div style={riskCellContentStyle}>
                          <div style={statusBadgeStyle(status)}>
                            {status}
                          </div>
                          
                          <button
                            style={actionButtonStyle}
                            onClick={() => handleDetailsClick(entity.id, risk.id)}
                            title="View details"
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
            <AlertDialogCancel onClick={() => setConfirmationOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setConfirmationOpen(false)}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
