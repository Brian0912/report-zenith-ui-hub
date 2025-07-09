
import React, { useState } from 'react';
import { Check, Loader2, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TaskCreationPanelProps {
  onSuccess?: () => void;
}

interface MetadataItem {
  id: string;
  label: string;
  value: string;
  category: string;
}

const metadataOptions = [
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

export const TaskCreationPanel: React.FC<TaskCreationPanelProps> = ({ onSuccess }) => {
  const { theme } = useTheme();
  const [goal, setGoal] = useState('');
  const [background, setBackground] = useState('');
  const [metadata, setMetadata] = useState<MetadataItem[]>([]);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      setMetadata([]);
      setIsMetadataExpanded(false);
      onSuccess?.();
    }, 2000);
  };

  const addMetadata = (option: typeof metadataOptions[0]) => {
    const newItem: MetadataItem = {
      id: `${option.id}-${Date.now()}`,
      label: option.label,
      value: '',
      category: option.category
    };
    setMetadata(prev => [...prev, newItem]);
  };

  const removeMetadata = (id: string) => {
    setMetadata(prev => prev.filter(item => item.id !== id));
  };

  const updateMetadata = (id: string, value: string) => {
    setMetadata(prev => prev.map(item => 
      item.id === id ? { ...item, value } : item
    ));
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#fafafa'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '32px 24px 120px 24px'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: theme === 'dark' ? '#e2e8f0' : '#374151'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #d1d5db',
    backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontFamily: 'inherit'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical' as const,
    lineHeight: '1.5'
  };

  const footerStyle: React.CSSProperties = {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff',
    borderTop: theme === 'dark' ? '1px solid #2d3748' : '1px solid #e2e8f0',
    display: 'flex',
    gap: '12px'
  };

  const buttonStyle: React.CSSProperties = {
    flex: 1,
    padding: '16px 24px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  };

  const metadataCardStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
    border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px'
  };

  const metadataToggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    fontSize: '16px',
    fontWeight: '600'
  };

  const metadataItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#f8fafc',
    borderRadius: '8px',
    marginBottom: '8px'
  };

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: theme === 'dark' ? '#3b82f6' : '#e0f2fe',
    color: theme === 'dark' ? '#ffffff' : '#0369a1',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  if (showSuccess) {
    return (
      <div style={{ 
        ...containerStyle, 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '48px 24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '24px', 
            color: '#10b981' 
          }}>
            <Check size={48} />
          </div>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: theme === 'dark' ? '#ffffff' : '#1a202c', 
            marginBottom: '12px' 
          }}>
            Task Created Successfully!
          </h2>
          <p style={{ 
            color: theme === 'dark' ? '#a0aec0' : '#718096',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            Your task has been created and is now being executed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={contentStyle}>
          {/* Goal Section */}
          <div style={sectionStyle}>
            <h3 style={sectionHeaderStyle}>Goal</h3>
            <label style={labelStyle}>
              What do you want to achieve? *
            </label>
            <textarea
              style={textareaStyle}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Describe the objective and expected outcomes of this task..."
              required
            />
          </div>

          {/* Background Section */}
          <div style={sectionStyle}>
            <h3 style={sectionHeaderStyle}>Background</h3>
            <label style={labelStyle}>
              Provide context and background information *
            </label>
            <textarea
              style={textareaStyle}
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Share relevant context, previous attempts, constraints, or additional details..."
              required
            />
          </div>

          {/* Metadata Section */}
          <div style={sectionStyle}>
            <div style={metadataCardStyle}>
              <button
                type="button"
                onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
                style={metadataToggleStyle}
              >
                <span>Add Metadata (optional)</span>
                {isMetadataExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {isMetadataExpanded && (
                <div style={{ marginTop: '20px' }}>
                  <p style={{ 
                    fontSize: '14px', 
                    color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                    marginBottom: '16px',
                    lineHeight: '1.5'
                  }}>
                    Add specific metadata to help categorize and filter your task.
                  </p>

                  {/* Available Options */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ ...labelStyle, marginBottom: '12px' }}>
                      Available Options
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {metadataOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => addMetadata(option)}
                          style={chipStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <Plus size={12} />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Metadata */}
                  {metadata.length > 0 && (
                    <div>
                      <label style={{ ...labelStyle, marginBottom: '12px' }}>
                        Selected Metadata
                      </label>
                      {metadata.map(item => (
                        <div key={item.id} style={metadataItemStyle}>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontSize: '12px', 
                              color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                              marginBottom: '4px'
                            }}>
                              {item.label}
                            </div>
                            <input
                              type="text"
                              value={item.value}
                              onChange={(e) => updateMetadata(item.id, e.target.value)}
                              placeholder={`Enter ${item.label.toLowerCase()}...`}
                              style={{
                                ...inputStyle,
                                padding: '8px 12px',
                                fontSize: '13px'
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMetadata(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: theme === 'dark' ? '#f56565' : '#e53e3e',
                              padding: '4px'
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={footerStyle}>
          <button
            type="submit"
            disabled={!goal.trim() || !background.trim() || isSubmitting}
            style={{
              ...buttonStyle,
              opacity: (!goal.trim() || !background.trim() || isSubmitting) ? 0.6 : 1,
              cursor: (!goal.trim() || !background.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && goal.trim() && background.trim()) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            {isSubmitting ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : null}
            {isSubmitting ? 'Creating Task...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};
