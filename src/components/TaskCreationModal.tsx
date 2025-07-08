
import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Check, Loader2, Plus, Minus } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MetadataOption {
  id: string;
  label: string;
  category: string;
  inputType: 'text' | 'number' | 'dropdown';
  dropdownOptions?: string[];
}

interface MetadataValue {
  id: string;
  label: string;
  value: string;
}

const metadataOptions: MetadataOption[] = [
  // Employee Category
  { id: 'username', label: 'Username', category: 'Employee', inputType: 'text' },
  { id: 'department', label: 'Department', category: 'Employee', inputType: 'dropdown', dropdownOptions: ['Engineering', 'Security', 'Operations', 'Product'] },
  { id: 'baseCountry', label: 'Base Country', category: 'Employee', inputType: 'text' },
  { id: 'physicalCountry', label: 'Physical Country', category: 'Employee', inputType: 'text' },
  { id: 'employeeId', label: 'Employee ID', category: 'Employee', inputType: 'text' },
  { id: 'rolePosition', label: 'Role/Position', category: 'Employee', inputType: 'text' },
  
  // Traffic Category
  { id: 'psm', label: 'PSM (Product Service Management)', category: 'Traffic', inputType: 'text' },
  { id: 'api', label: 'API', category: 'Traffic', inputType: 'text' },
  { id: 'host', label: 'Host', category: 'Traffic', inputType: 'text' },
  { id: 'trafficVolume', label: 'Traffic Volume', category: 'Traffic', inputType: 'number' },
  { id: 'protocol', label: 'Protocol', category: 'Traffic', inputType: 'dropdown', dropdownOptions: ['HTTP', 'HTTPS', 'TCP', 'UDP'] },
  { id: 'port', label: 'Port', category: 'Traffic', inputType: 'number' },
  
  // Policy Category
  { id: 'policyAction', label: 'Policy Action', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Allow', 'Block', 'Monitor', 'Alert'] },
  { id: 'policyId', label: 'Policy ID', category: 'Policy', inputType: 'text' },
  { id: 'policyType', label: 'Policy Type', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Security', 'Compliance', 'Access', 'Network'] },
  { id: 'complianceLevel', label: 'Compliance Level', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Low', 'Medium', 'High', 'Critical'] },
  { id: 'approvalStatus', label: 'Approval Status', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Pending', 'Approved', 'Rejected', 'Under Review'] },
];

export const TaskCreationModal: React.FC<TaskCreationModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [goal, setGoal] = useState('');
  const [background, setBackground] = useState('');
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
  const [selectedMetadata, setSelectedMetadata] = useState<MetadataValue[]>([]);
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
    }, 2000);
  };

  const addMetadata = (option: MetadataOption) => {
    const newMetadata: MetadataValue = {
      id: `${option.id}-${Date.now()}`,
      label: option.label,
      value: '',
    };
    setSelectedMetadata(prev => [...prev, newMetadata]);
  };

  const removeMetadata = (id: string) => {
    setSelectedMetadata(prev => prev.filter(item => item.id !== id));
  };

  const updateMetadataValue = (id: string, value: string) => {
    setSelectedMetadata(prev => prev.map(item => 
      item.id === id ? { ...item, value } : item
    ));
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
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
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

  const MetadataInput: React.FC<{
    metadata: MetadataValue;
    option: MetadataOption;
    onUpdate: (id: string, value: string) => void;
    onRemove: (id: string) => void;
  }> = ({ metadata, option, onUpdate, onRemove }) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      padding: '8px',
      background: theme === 'dark' ? 'rgba(45, 55, 72, 0.3)' : 'rgba(248, 250, 252, 0.8)',
      borderRadius: '6px',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: '12px',
      color: theme === 'dark' ? '#a0aec0' : '#718096',
      minWidth: '100px',
    };

    const inputContainerStyle: React.CSSProperties = {
      flex: 1,
    };

    const smallInputStyle: React.CSSProperties = {
      ...inputStyle,
      padding: '8px',
      fontSize: '13px',
    };

    return (
      <div style={containerStyle}>
        <div style={labelStyle}>{metadata.label}</div>
        <div style={inputContainerStyle}>
          {option.inputType === 'dropdown' ? (
            <select
              style={smallInputStyle}
              value={metadata.value}
              onChange={(e) => onUpdate(metadata.id, e.target.value)}
            >
              <option value="">Select...</option>
              {option.dropdownOptions?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={option.inputType}
              style={smallInputStyle}
              value={metadata.value}
              onChange={(e) => onUpdate(metadata.id, e.target.value)}
              placeholder={`Enter ${metadata.label.toLowerCase()}`}
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => onRemove(metadata.id)}
          style={{
            background: 'none',
            border: 'none',
            color: theme === 'dark' ? '#f56565' : '#e53e3e',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <Minus size={16} />
        </button>
      </div>
    );
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
                {selectedMetadata.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: '600', color: theme === 'dark' ? '#a0aec0' : '#718096', marginBottom: '8px' }}>
                      SELECTED METADATA
                    </h4>
                    {selectedMetadata.map(metadata => {
                      const option = metadataOptions.find(opt => opt.id === metadata.label.toLowerCase().replace(/[^a-z0-9]/g, ''));
                      return option ? (
                        <MetadataInput
                          key={metadata.id}
                          metadata={metadata}
                          option={option}
                          onUpdate={updateMetadataValue}
                          onRemove={removeMetadata}
                        />
                      ) : null;
                    })}
                  </div>
                )}

                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Search metadata..."
                  value={metadataSearch}
                  onChange={(e) => setMetadataSearch(e.target.value)}
                />
                
                <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '12px' }}>
                  {Object.entries(groupedMetadata).map(([category, options]) => (
                    <div key={category} style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '600', color: theme === 'dark' ? '#a0aec0' : '#718096', marginBottom: '8px', textTransform: 'uppercase' }}>
                        {category}
                      </h4>
                      {options.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => addMetadata(option)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            marginBottom: '4px',
                            background: 'transparent',
                            border: 'none',
                            color: theme === 'dark' ? '#ffffff' : '#1a202c',
                            fontSize: '14px',
                            width: '100%',
                            textAlign: 'left',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = theme === 'dark' ? 'rgba(74, 85, 104, 0.3)' : 'rgba(237, 242, 247, 0.8)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <Plus size={16} />
                          <span>{option.label}</span>
                        </button>
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
