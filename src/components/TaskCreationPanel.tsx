
import React, { useState } from 'react';
import { Check, Loader2, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

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

  if (showSuccess) {
    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 32px',
        textAlign: 'center',
        backgroundColor: '#fafafa',
        height: '100%'
      }}>
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
          color: '#1a202c', 
          marginBottom: '12px' 
        }}>
          Task Created Successfully!
        </h2>
        <p style={{ 
          color: '#718096',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Your task has been created and is now being executed.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: '32px',
          backgroundColor: '#fafafa'
        }}>
          {/* Goal Section */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Goal
            </h3>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              What do you want to achieve? *
            </label>
            <textarea
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                color: '#1a202c',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                fontFamily: 'inherit',
                minHeight: '120px',
                resize: 'vertical',
                lineHeight: '1.5'
              }}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Describe the objective and expected outcomes of this task..."
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Background Section */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a202c',
              marginBottom: '16px'
            }}>
              Background
            </h3>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              Provide context and background information *
            </label>
            <textarea
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                color: '#1a202c',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                fontFamily: 'inherit',
                minHeight: '120px',
                resize: 'vertical',
                lineHeight: '1.5'
              }}
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Share relevant context, previous attempts, constraints, or additional details..."
              required
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Metadata Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ 
                borderBottom: isMetadataExpanded ? '1px solid #f0f0f0' : 'none',
                paddingBottom: isMetadataExpanded ? '20px' : '0',
                marginBottom: isMetadataExpanded ? '20px' : '0'
              }}>
                <button
                  type="button"
                  onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#1a202c',
                    fontSize: '18px',
                    fontWeight: '600',
                    padding: '8px 0'
                  }}
                >
                  <span>Add Metadata (optional)</span>
                  {isMetadataExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
              
              {isMetadataExpanded && (
                <div>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6b7280',
                    marginBottom: '20px',
                    lineHeight: '1.5'
                  }}>
                    Add specific metadata to help categorize and filter your task.
                  </p>

                  {/* Available Options */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      Available Options
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {metadataOptions.map(option => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => addMetadata(option)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 12px',
                            backgroundColor: '#e0f2fe',
                            color: '#0369a1',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
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
                      <label style={{
                        display: 'block',
                        marginBottom: '12px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#374151'
                      }}>
                        Selected Metadata
                      </label>
                      {metadata.map(item => (
                        <div key={item.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '16px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '12px',
                          marginBottom: '12px',
                          border: '1px solid #f0f0f0'
                        }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#6b7280',
                              marginBottom: '6px',
                              fontWeight: '500'
                            }}>
                              {item.label}
                            </div>
                            <input
                              type="text"
                              value={item.value}
                              onChange={(e) => updateMetadata(item.id, e.target.value)}
                              placeholder={`Enter ${item.label.toLowerCase()}...`}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                backgroundColor: '#ffffff',
                                color: '#1a202c',
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.2s ease'
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#3b82f6';
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#d1d5db';
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
                              color: '#e53e3e',
                              padding: '6px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(229, 62, 62, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
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

        {/* Sticky Footer */}
        <div style={{
          padding: '24px 32px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #f0f0f0',
          position: 'sticky',
          bottom: 0
        }}>
          <button
            type="submit"
            disabled={!goal.trim() || !background.trim() || isSubmitting}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '12px',
              border: 'none',
              background: (!goal.trim() || !background.trim() || isSubmitting) 
                ? '#d1d5db' 
                : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (!goal.trim() || !background.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'center',
              boxShadow: (!goal.trim() || !background.trim() || isSubmitting) 
                ? 'none' 
                : '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && goal.trim() && background.trim()) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = (!goal.trim() || !background.trim() || isSubmitting) 
                ? 'none' 
                : '0 4px 12px rgba(59, 130, 246, 0.3)';
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
