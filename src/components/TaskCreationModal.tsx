
import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Check, Loader2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MetadataOption {
  id: string;
  label: string;
  category: string;
}

const metadataOptions: MetadataOption[] = [
  // Employee Category
  { id: 'username', label: 'Username', category: 'Employee' },
  { id: 'department', label: 'Department', category: 'Employee' },
  { id: 'baseCountry', label: 'Base Country', category: 'Employee' },
  { id: 'physicalCountry', label: 'Physical Country', category: 'Employee' },
  { id: 'employeeId', label: 'Employee ID', category: 'Employee' },
  { id: 'rolePosition', label: 'Role/Position', category: 'Employee' },
  
  // Traffic Category
  { id: 'psm', label: 'PSM (Product Service Management)', category: 'Traffic' },
  { id: 'api', label: 'API', category: 'Traffic' },
  { id: 'host', label: 'Host', category: 'Traffic' },
  { id: 'trafficVolume', label: 'Traffic Volume', category: 'Traffic' },
  { id: 'protocol', label: 'Protocol', category: 'Traffic' },
  { id: 'port', label: 'Port', category: 'Traffic' },
  
  // Policy Category
  { id: 'policyAction', label: 'Policy Action', category: 'Policy' },
  { id: 'policyId', label: 'Policy ID', category: 'Policy' },
  { id: 'policyType', label: 'Policy Type', category: 'Policy' },
  { id: 'complianceLevel', label: 'Compliance Level', category: 'Policy' },
  { id: 'approvalStatus', label: 'Approval Status', category: 'Policy' },
];

export const TaskCreationModal: React.FC<TaskCreationModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [goal, setGoal] = useState('');
  const [background, setBackground] = useState('');
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
  const [selectedMetadata, setSelectedMetadata] = useState<string[]>([]);
  const [metadataSearch, setMetadataSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setHasUnsavedChanges(goal.trim() !== '' || background.trim() !== '' || selectedMetadata.length > 0);
  }, [goal, background, selectedMetadata]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) return;
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !background.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setGoal('');
      setBackground('');
      setSelectedMetadata([]);
      setIsMetadataExpanded(false);
      setHasUnsavedChanges(false);
      onClose();
    }, 3000);
  };

  const toggleMetadata = (id: string) => {
    setSelectedMetadata(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredMetadata = metadataOptions.filter(option =>
    option.label.toLowerCase().includes(metadataSearch.toLowerCase())
  );

  const groupedMetadata = filteredMetadata.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, MetadataOption[]>);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const modalStyle: React.CSSProperties = {
    width: '450px',
    height: '100vh',
    background: theme === 'dark' ? '#1a1a2e' : '#ffffff',
    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideIn 0.3s ease-out',
    borderLeft: `1px solid ${theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
  };

  const headerStyle: React.CSSProperties = {
    padding: '24px',
    borderBottom: `1px solid ${theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#4a5568' : '#d1d5db'}`,
    background: theme === 'dark' ? '#2d3748' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
  };

  if (showSuccess) {
    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <div style={{ ...contentStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', color: '#10b981' }}>
              <Check size={48} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: theme === 'dark' ? '#ffffff' : '#1a202c', marginBottom: '8px' }}>
              Task Created Successfully!
            </h2>
            <p style={{ color: theme === 'dark' ? '#a0aec0' : '#718096', textAlign: 'center' }}>
              Your task has been created and is now being executed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyle} onClick={handleClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: theme === 'dark' ? '#ffffff' : '#1a202c' }}>
            Create New Task
          </h2>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme === 'dark' ? '#a0aec0' : '#718096',
              padding: '4px',
              borderRadius: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={contentStyle}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: theme === 'dark' ? '#ffffff' : '#1a202c' }}>
              Goal *
            </label>
            <textarea
              style={textareaStyle}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Describe what you want to achieve..."
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: theme === 'dark' ? '#ffffff' : '#1a202c' }}>
              Background *
            </label>
            <textarea
              style={textareaStyle}
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Provide context and background information..."
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <button
              type="button"
              onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: theme === 'dark' ? '#ffffff' : '#1a202c',
                fontSize: '14px',
                fontWeight: '500',
                padding: '8px 0',
              }}
            >
              {isMetadataExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              Add Metadata (Optional)
              {selectedMetadata.length > 0 && (
                <span style={{ 
                  background: theme === 'dark' ? '#3b82f6' : '#2563eb',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  {selectedMetadata.length}
                </span>
              )}
            </button>

            {isMetadataExpanded && (
              <div style={{ marginTop: '16px' }}>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Search metadata..."
                  value={metadataSearch}
                  onChange={(e) => setMetadataSearch(e.target.value)}
                />
                
                <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '12px' }}>
                  {Object.entries(groupedMetadata).map(([category, options]) => (
                    <div key={category} style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '600', color: theme === 'dark' ? '#a0aec0' : '#718096', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {category}
                      </h4>
                      {options.map(option => (
                        <label
                          key={option.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            marginBottom: '4px',
                            background: selectedMetadata.includes(option.id) 
                              ? (theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)')
                              : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!selectedMetadata.includes(option.id)) {
                              e.currentTarget.style.background = theme === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(237, 242, 247, 0.8)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!selectedMetadata.includes(option.id)) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedMetadata.includes(option.id)}
                            onChange={() => toggleMetadata(option.id)}
                            style={{ margin: 0 }}
                          />
                          <span style={{ fontSize: '14px', color: theme === 'dark' ? '#ffffff' : '#1a202c' }}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!goal.trim() || !background.trim() || isSubmitting}
            style={{
              ...buttonStyle,
              opacity: (!goal.trim() || !background.trim() || isSubmitting) ? 0.5 : 1,
              cursor: (!goal.trim() || !background.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : null}
            {isSubmitting ? 'Creating Task...' : 'Create Task'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
