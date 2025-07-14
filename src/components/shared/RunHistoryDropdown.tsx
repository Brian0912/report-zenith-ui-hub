
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Run {
  id: string;
  timestamp: Date;
  status: string;
}

interface RunHistoryDropdownProps {
  runs: Run[];
  onRunSelect?: (runId: string) => void;
  buttonStyle?: React.CSSProperties;
}

export const RunHistoryDropdown: React.FC<RunHistoryDropdownProps> = ({
  runs,
  onRunSelect,
  buttonStyle
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultButtonStyle: React.CSSProperties = {
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

  const dropdownContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
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
    zIndex: 50,
    marginTop: '4px',
    maxHeight: '200px',
    overflowY: 'auto'
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleRunSelect = (runId: string) => {
    if (onRunSelect) {
      onRunSelect(runId);
    }
    setIsOpen(false);
  };

  return (
    <div style={dropdownContainerStyle}>
      <button 
        style={{ ...defaultButtonStyle, ...buttonStyle }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        Run History
        <ChevronDown size={16} />
      </button>
      
      {isOpen && (
        <div style={dropdownStyle}>
          {runs.map((run, index) => (
            <div
              key={run.id}
              style={{
                padding: '8px 12px',
                borderBottom: index < runs.length - 1 ? '1px solid #f3f4f6' : 'none',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#6b7280'
              }}
              onClick={() => handleRunSelect(run.id)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {formatTimestamp(run.timestamp)} - {run.status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
