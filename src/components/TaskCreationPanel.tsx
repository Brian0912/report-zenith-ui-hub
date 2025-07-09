import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Loader2, Plus, Copy, Trash2, Info } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface TaskCreationPanelProps {
  onSuccess?: () => void;
}

interface MetadataOption {
  id: string;
  label: string;
  category: string;
  inputType: 'text' | 'number' | 'dropdown';
  dropdownOptions?: string[];
  description?: string;
}

interface MetadataValue {
  id: string;
  optionId: string;
  label: string;
  value: string;
  category: string;
  inputType: 'text' | 'number' | 'dropdown';
  dropdownOptions?: string[];
  isValid: boolean;
  error?: string;
}

const metadataOptions: MetadataOption[] = [
  // Employee Category
  { id: 'username', label: 'Username', category: 'Employee', inputType: 'text', description: 'Employee username or login ID' },
  { id: 'department', label: 'Department', category: 'Employee', inputType: 'dropdown', dropdownOptions: ['Engineering', 'Security', 'Operations', 'Product'], description: 'Employee department' },
  { id: 'baseCountry', label: 'Base Country', category: 'Employee', inputType: 'text', description: 'Employee base country' },
  { id: 'physicalCountry', label: 'Physical Country', inputType: 'text', description: 'Current physical location' },
  { id: 'employeeId', label: 'Employee ID', category: 'Employee', inputType: 'text', description: 'Unique employee identifier' },
  { id: 'rolePosition', label: 'Role/Position', category: 'Employee', inputType: 'text', description: 'Job title or role' },
  
  // Traffic Category
  { id: 'psm', label: 'PSM (Product Service Management)', category: 'Traffic', inputType: 'text', description: 'Product service management identifier' },
  { id: 'api', label: 'API', category: 'Traffic', inputType: 'text', description: 'API endpoint or service' },
  { id: 'host', label: 'Host', category: 'Traffic', inputType: 'text', description: 'Host server or domain' },
  { id: 'trafficVolume', label: 'Traffic Volume', category: 'Traffic', inputType: 'number', description: 'Traffic volume in requests/sec' },
  { id: 'protocol', label: 'Protocol', category: 'Traffic', inputType: 'dropdown', dropdownOptions: ['HTTP', 'HTTPS', 'TCP', 'UDP'], description: 'Network protocol' },
  { id: 'port', label: 'Port', category: 'Traffic', inputType: 'number', description: 'Network port number' },
  
  // Policy Category
  { id: 'policyAction', label: 'Policy Action', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Allow', 'Block', 'Monitor', 'Alert'], description: 'Policy enforcement action' },
  { id: 'policyId', label: 'Policy ID', category: 'Policy', inputType: 'text', description: 'Unique policy identifier' },
  { id: 'policyType', label: 'Policy Type', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Security', 'Compliance', 'Access', 'Network'], description: 'Type of policy' },
  { id: 'complianceLevel', label: 'Compliance Level', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Low', 'Medium', 'High', 'Critical'], description: 'Compliance requirement level' },
  { id: 'approvalStatus', label: 'Approval Status', category: 'Policy', inputType: 'dropdown', dropdownOptions: ['Pending', 'Approved', 'Rejected', 'Under Review'], description: 'Current approval status' },
];

export const TaskCreationPanel: React.FC<TaskCreationPanelProps> = ({ onSuccess }) => {
  const { theme } = useTheme();
  const [goal, setGoal] = useState('');
  const [background, setBackground] = useState('');
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
  const [selectedMetadata, setSelectedMetadata] = useState<MetadataValue[]>([]);
  const [metadataSearch, setMetadataSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || !background.trim()) return;

    // Validate all metadata fields
    const invalidFields = selectedMetadata.filter(field => !field.isValid);
    if (invalidFields.length > 0) {
      return;
    }

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
      onSuccess?.();
    }, 2000);
  };

  const validateMetadataValue = (value: string, inputType: string): { isValid: boolean; error?: string } => {
    if (!value.trim()) {
      return { isValid: false, error: 'This field is required' };
    }

    switch (inputType) {
      case 'number':
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
          return { isValid: false, error: 'Please enter a valid positive number' };
        }
        break;
      case 'text':
        if (value.length < 2) {
          return { isValid: false, error: 'Please enter at least 2 characters' };
        }
        break;
    }

    return { isValid: true };
  };

  const addMetadata = (option: MetadataOption) => {
    const newMetadata: MetadataValue = {
      id: `${option.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      optionId: option.id,
      label: option.label,
      value: '',
      category: option.category,
      inputType: option.inputType,
      dropdownOptions: option.dropdownOptions,
      isValid: false,
      error: 'This field is required'
    };
    setSelectedMetadata(prev => [...prev, newMetadata]);
  };

  const removeMetadata = (id: string) => {
    setSelectedMetadata(prev => prev.filter(item => item.id !== id));
  };

  const updateMetadataValue = (id: string, value: string) => {
    setSelectedMetadata(prev => prev.map(item => {
      if (item.id === id) {
        const validation = validateMetadataValue(value, item.inputType);
        return {
          ...item,
          value,
          isValid: validation.isValid,
          error: validation.error
        };
      }
      return item;
    }));
  };

  const duplicateMetadata = (id: string) => {
    const existingItem = selectedMetadata.find(item => item.id === id);
    if (existingItem) {
      const option = metadataOptions.find(opt => opt.id === existingItem.optionId);
      if (option) {
        addMetadata(option);
      }
    }
  };

  const clearAllMetadata = () => {
    setSelectedMetadata([]);
  };

  const getMetadataCountByType = (optionId: string) => {
    return selectedMetadata.filter(item => item.optionId === optionId).length;
  };

  const filteredMetadata = metadataOptions.filter(option =>
    option.label.toLowerCase().includes(metadataSearch.toLowerCase()) ||
    option.category.toLowerCase().includes(metadataSearch.toLowerCase())
  );

  const groupedMetadata = filteredMetadata.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, MetadataOption[]>);

  const groupedSelectedMetadata = selectedMetadata.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MetadataValue[]>);

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    height: '100%',
    overflow: 'auto',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#ffffff'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #d1d5db',
    backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
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
    onUpdate: (id: string, value: string) => void;
    onRemove: (id: string) => void;
    onDuplicate: (id: string) => void;
  }> = ({ metadata, onUpdate, onRemove, onDuplicate }) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '12px',
      padding: '12px',
      background: theme === 'dark' ? 'rgba(45, 55, 72, 0.4)' : 'rgba(248, 250, 252, 0.9)',
      borderRadius: '8px',
      border: metadata.isValid ? 'none' : `1px solid ${theme === 'dark' ? '#f56565' : '#e53e3e'}`,
      position: 'relative',
    };

    const labelContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '120px',
      gap: '4px',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: '13px',
      fontWeight: '500',
      color: theme === 'dark' ? '#e2e8f0' : '#374151',
    };

    const typeStyle: React.CSSProperties = {
      fontSize: '11px',
      color: theme === 'dark' ? '#a0aec0' : '#6b7280',
      padding: '2px 6px',
      background: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
      borderRadius: '4px',
      fontWeight: '500',
    };

    const inputContainerStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    };

    const smallInputStyle: React.CSSProperties = {
      ...inputStyle,
      padding: '10px',
      fontSize: '14px',
      borderColor: metadata.isValid ? (theme === 'dark' ? '#4a5568' : '#d1d5db') : (theme === 'dark' ? '#f56565' : '#e53e3e'}),
    };

    const errorStyle: React.CSSProperties = {
      fontSize: '11px',
      color: theme === 'dark' ? '#f56565' : '#e53e3e',
      marginTop: '2px',
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      gap: '4px',
    };

    const actionButtonStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '6px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    };

    return (
      <div style={containerStyle}>
        <div style={labelContainerStyle}>
          <div style={labelStyle}>{metadata.label}</div>
          <div style={typeStyle}>{metadata.inputType.toUpperCase()}</div>
        </div>
        <div style={inputContainerStyle}>
          {metadata.inputType === 'dropdown' ? (
            <select
              style={smallInputStyle}
              value={metadata.value}
              onChange={(e) => onUpdate(metadata.id, e.target.value)}
            >
              <option value="">Select {metadata.label.toLowerCase()}...</option>
              {metadata.dropdownOptions?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={metadata.inputType}
              style={smallInputStyle}
              value={metadata.value}
              onChange={(e) => onUpdate(metadata.id, e.target.value)}
              placeholder={`Enter ${metadata.label.toLowerCase()}`}
            />
          )}
          {!metadata.isValid && metadata.error && (
            <div style={errorStyle}>{metadata.error}</div>
          )}
        </div>
        <div style={actionsStyle}>
          <button
            type="button"
            onClick={() => onDuplicate(metadata.id)}
            style={{
              ...actionButtonStyle,
              color: theme === 'dark' ? '#60a5fa' : '#2563eb',
            }}
            title="Duplicate this field"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <Copy size={14} />
          </button>
          <button
            type="button"
            onClick={() => onRemove(metadata.id)}
            style={{
              ...actionButtonStyle,
              color: theme === 'dark' ? '#f56565' : '#e53e3e',
            }}
            title="Remove this field"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? 'rgba(245, 101, 101, 0.1)' : 'rgba(229, 62, 62, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div style={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
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
    );
  }

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
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
  );
};
