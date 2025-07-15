
import React, { useState } from 'react';
import { ChevronDown, CheckCircle, AlertCircle, Loader, Clock } from 'lucide-react';

interface RunHistoryItem {
  timestamp: string;
  status: 'completed' | 'running' | 'error' | 'queued';
  duration: string;
  error?: string;
}

interface RunHistoryDropdownProps {
  runs: RunHistoryItem[];
  latestRun: string;
}

export const RunHistoryDropdown: React.FC<RunHistoryDropdownProps> = ({ runs, latestRun }) => {
  const [showRunHistory, setShowRunHistory] = useState(false);

  const handleRunHistoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRunHistory(!showRunHistory);
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    color: '#6B7280',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    marginTop: '4px',
    minWidth: '280px',
    maxHeight: '400px',
    overflowY: 'auto',
    animation: 'slideIn 0.2s ease-out'
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        style={buttonStyle}
        onClick={handleRunHistoryClick}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        Run History
        <ChevronDown size={16} style={{
          transform: showRunHistory ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }} />
      </button>
      
      {showRunHistory && (
        <div style={dropdownStyle}>
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #F3F4F6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FAFAFA'
          }}>
            <span style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Run History
            </span>
            <span style={{ 
              fontSize: '12px', 
              color: '#6B7280' 
            }}>
              {runs.length} runs
            </span>
          </div>
          
          {/* Run History Items */}
          {runs.map((run, index) => (
            <div
              key={index}
              style={{
                padding: '12px 16px',
                borderBottom: index < runs.length - 1 ? '1px solid #F3F4F6' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '6px' 
              }}>
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  color: '#374151' 
                }}>
                  {run.timestamp}
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  backgroundColor: 
                    run.status === 'completed' ? '#DCFCE7' :
                    run.status === 'running' ? '#DBEAFE' :
                    run.status === 'error' ? '#FEE2E2' : '#FEF3C7',
                  color:
                    run.status === 'completed' ? '#166534' :
                    run.status === 'running' ? '#1D4ED8' :
                    run.status === 'error' ? '#DC2626' : '#D97706'
                }}>
                  {run.status === 'completed' && <CheckCircle size={10} />}
                  {run.status === 'running' && <Loader size={10} />}
                  {run.status === 'error' && <AlertCircle size={10} />}
                  {run.status === 'queued' && <Clock size={10} />}
                  {run.status.toUpperCase()}
                </div>
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#6B7280',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Duration: {run.duration}</span>
                {run.error && (
                  <span style={{ 
                    color: '#DC2626', 
                    fontStyle: 'italic',
                    fontSize: '11px'
                  }}>
                    {run.error}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
