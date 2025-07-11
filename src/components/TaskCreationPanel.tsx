import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react';
import { X, Plus, Save, AlertCircle, CheckCircle, Sparkles, Clock, User, Search, HelpCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface TaskCreationPanelProps {
  onSuccess?: () => void;
}

// Constants
const VALIDATION_RULES = {
  GOAL_MIN_WORDS: 10,
  BACKGROUND_MIN_WORDS: 20,
  MEANINGFUL_CONTENT_RATIO: 0.7,
  MIN_WORD_LENGTH: 2,
  AUTO_RESIZE_MAX_HEIGHT: 200,
  DEBOUNCE_DELAY: 300
};

const TEMPLATE_DATA = {
  goal: "Implement a user authentication system",
  background: "We need a secure and scalable authentication system for our web application. It should support email/password login, social logins, and multi-factor authentication. The system must integrate with our existing user database and comply with GDPR regulations.",
  metadata: [
    { id: '1', category: 'priority', value: 'high' },
    { id: '2', category: 'type', value: 'feature' }
  ]
};

const METADATA_CATEGORIES = {
  priority: {
    label: 'Priority',
    options: ['low', 'medium', 'high']
  },
  type: {
    label: 'Type',
    options: ['bug', 'feature', 'improvement']
  },
  status: {
    label: 'Status',
    options: ['open', 'in progress', 'closed']
  }
};

type MetadataItemType = {
  id: string;
  category: keyof typeof METADATA_CATEGORIES;
  value: string;
};

type FormData = {
  goal: string;
  background: string;
  metadata: MetadataItemType[];
};

type FormAction =
  | { type: 'SET_FIELD'; field: keyof Omit<FormData, 'metadata'>; value: string }
  | { type: 'ADD_METADATA'; item: MetadataItemType }
  | { type: 'UPDATE_METADATA'; id: string; value: string }
  | { type: 'REMOVE_METADATA'; id: string }
  | { type: 'SET_ALL'; data: FormData };

function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_METADATA':
      if (state.metadata.find(m => m.id === action.item.id)) {
        return state;
      }
      return { ...state, metadata: [...state.metadata, action.item] };
    case 'UPDATE_METADATA':
      return {
        ...state,
        metadata: state.metadata.map(m =>
          m.id === action.id ? { ...m, value: action.value } : m
        )
      };
    case 'REMOVE_METADATA':
      return {
        ...state,
        metadata: state.metadata.filter(m => m.id !== action.id)
      };
    case 'SET_ALL':
      return action.data;
    default:
      return state;
  }
}

function useValidation(formData: FormData) {
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length >= VALIDATION_RULES.MIN_WORD_LENGTH).length;
  };

  const meaningfulContentRatio = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return 0;
    const meaningfulWords = words.filter(word => word.length >= VALIDATION_RULES.MIN_WORD_LENGTH).length;
    return meaningfulWords / words.length;
  };

  const wordCounts = {
    goal: countWords(formData.goal),
    background: countWords(formData.background)
  };

  const goalValid =
    wordCounts.goal >= VALIDATION_RULES.GOAL_MIN_WORDS &&
    meaningfulContentRatio(formData.goal) >= VALIDATION_RULES.MEANINGFUL_CONTENT_RATIO;

  const backgroundValid =
    wordCounts.background >= VALIDATION_RULES.BACKGROUND_MIN_WORDS &&
    meaningfulContentRatio(formData.background) >= VALIDATION_RULES.MEANINGFUL_CONTENT_RATIO;

  const isFormValid = goalValid && backgroundValid;

  return { wordCounts, goalValid, backgroundValid, isFormValid };
}

function useAutoResize() {
  const resize = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = 'auto';
    const newHeight = Math.min(el.scrollHeight, VALIDATION_RULES.AUTO_RESIZE_MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
  };

  return resize;
}

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const ValidationMessage: React.FC<{ isValid: boolean; message: string }> = ({ isValid, message }) => {
  if (isValid) return null;
  return (
    <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px' }}>
      <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
      {message}
    </div>
  );
};

const WordCounter: React.FC<{ count: number; minWords: number }> = ({ count, minWords }) => {
  const isValid = count >= minWords;
  return (
    <div style={{ fontSize: '12px', color: isValid ? '#16a34a' : '#dc2626' }}>
      {count} / {minWords} words
    </div>
  );
};

const MetadataItem: React.FC<{
  item: MetadataItemType;
  category: { label: string; options: string[] };
  onUpdate: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}> = ({ item, category, onUpdate, onRemove }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#f3e8ff',
        padding: '8px 12px',
        borderRadius: '8px'
      }}
    >
      <div style={{ fontWeight: '600', color: '#9333ea', minWidth: '80px' }}>{category.label}:</div>
      <select
        value={item.value}
        onChange={(e) => onUpdate(item.id, e.target.value)}
        style={{
          flex: 1,
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          fontSize: '14px',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        {category.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label="Remove metadata"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9333ea',
          padding: '4px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#6b21a8')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#9333ea')}
      >
        <X size={16} />
      </button>
    </div>
  );
};

const MetadataSelector: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MetadataItemType) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}> = ({ isOpen, onClose, onSelect, searchTerm, onSearchChange }) => {
  const allOptions = useMemo(() => {
    const items: MetadataItemType[] = [];
    Object.entries(METADATA_CATEGORIES).forEach(([categoryKey, category]) => {
      category.options.forEach((opt) => {
        items.push({
          id: `${categoryKey}-${opt}`,
          category: categoryKey as keyof typeof METADATA_CATEGORIES,
          value: opt
        });
      });
    });
    return items;
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return allOptions;
    return allOptions.filter(
      (item) =>
        item.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        METADATA_CATEGORIES[item.category].label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allOptions, searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        right: 0,
        maxHeight: '240px',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        zIndex: 1000,
        padding: '8px'
      }}
      role="listbox"
      aria-label="Metadata options"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search metadata..."
        style={{
          width: '100%',
          padding: '8px 12px',
          marginBottom: '8px',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          outline: 'none',
          fontSize: '14px'
        }}
        autoFocus
      />
      {filteredOptions.length === 0 && (
        <div style={{ padding: '8px', color: '#6b7280', fontSize: '14px' }}>No metadata found</div>
      )}
      {filteredOptions.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => {
            onSelect(item);
            onClose();
          }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#374151',
            marginBottom: '4px',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e7ff')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
        >
          <span>
            <strong>{METADATA_CATEGORIES[item.category].label}:</strong> {item.value}
          </span>
          <Plus size={14} />
        </button>
      ))}
    </div>
  );
};

const HelpTooltip: React.FC<{ isVisible: boolean; onToggle: () => void }> = ({ isVisible, onToggle }) => {
  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        aria-label="Help"
        onClick={onToggle}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#64748b',
          padding: '4px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
      >
        <HelpCircle size={18} />
      </button>
      {isVisible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '280px',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            padding: '12px',
            borderRadius: '12px',
            fontSize: '13px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            zIndex: 1000
          }}
        >
          <p style={{ margin: 0 }}>
            Use the form to clearly define your task's goal and background. Add metadata to help categorize and track your task effectively.
          </p>
        </div>
      )}
    </div>
  );
};

// Main component
export const TaskCreationPanel: React.FC<TaskCreationPanelProps> = ({ onSuccess }) => {
  const [formData, dispatch] = useReducer(formReducer, { goal: '', background: '', metadata: [] });
  const [uiState, setUiState] = useState({
    isSubmitting: false,
    showSuccess: false,
    showTemplate: false,
    showMetadataSelector: false,
    showTooltip: false,
    metadataSearch: ''
  });

  const goalRef = useRef<HTMLTextAreaElement>(null);
  const backgroundRef = useRef<HTMLTextAreaElement>(null);
  const autoResize = useAutoResize();
  const validation = useValidation(formData);
  const hasUnsavedChanges = formData.goal || formData.background || formData.metadata.length > 0;

  useEffect(() => {
    autoResize(goalRef.current);
  }, [formData.goal, autoResize]);

  useEffect(() => {
    autoResize(backgroundRef.current);
  }, [formData.background, autoResize]);

  const updateUiState = useCallback((updates: Partial<typeof uiState>) => {
    setUiState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleFieldChange = (field: keyof Omit<FormData, 'metadata'>, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleAddMetadata = (item: MetadataItemType) => {
    dispatch({ type: 'ADD_METADATA', item });
  };

  const handleUpdateMetadata = (id: string, value: string) => {
    dispatch({ type: 'UPDATE_METADATA', id, value });
  };

  const handleRemoveMetadata = (id: string) => {
    dispatch({ type: 'REMOVE_METADATA', id });
  };

  const handleUseTemplate = () => {
    dispatch({ type: 'SET_ALL', data: TEMPLATE_DATA });
    updateUiState({ showTemplate: false });
  };

  const handleSubmit = async () => {
    if (!validation.isFormValid) return;
    updateUiState({ isSubmitting: true, showSuccess: false });

    // Simulate async task creation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    updateUiState({ isSubmitting: false, showSuccess: true });
    if (onSuccess) onSuccess();

    // Reset form after success
    dispatch({ type: 'SET_ALL', data: { goal: '', background: '', metadata: [] } });

    setTimeout(() => {
      updateUiState({ showSuccess: false });
    }, 3000);
  };

  // Keyboard shortcut: Ctrl + Enter to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (validation.isFormValid && !uiState.isSubmitting) {
          handleSubmit();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [validation.isFormValid, uiState.isSubmitting]);

  return (
    <div style={{ height: 'calc(100vh - 80px - 48px)', display: 'flex', flexDirection: 'column' }}>
      <div 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%'
        }}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        {/* Header */}
        <div style={{
          minHeight: '72px',
          maxHeight: '72px',
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={16} style={{ color: '#ffffff' }} />
            </div>
            <div>
              <h2 id="modal-title" style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a202c',
                margin: 0,
                lineHeight: '1.3'
              }}>Create New Task</h2>
              <p style={{
                fontSize: '14px',
                color: '#64748b',
                margin: 0
              }}>Structure your task for better clarity</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {hasUnsavedChanges && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#ea580c',
                fontSize: '14px'
              }}>
                <Save size={14} />
                <span>Unsaved</span>
              </div>
            )}
            <HelpTooltip 
              isVisible={uiState.showTooltip}
              onToggle={() => updateUiState({ showTooltip: !uiState.showTooltip })}
            />
          </div>
        </div>

        {/* Template Section */}
        {!uiState.showTemplate && !hasUnsavedChanges && (
          <div style={{
            padding: '16px',
            backgroundColor: '#eff6ff',
            borderBottom: '1px solid #dbeafe'
          }}>
            <button
              onClick={() => updateUiState({ showTemplate: true })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1d4ed8',
                fontSize: '14px',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e40af'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#1d4ed8'}
            >
              <Sparkles size={14} />
              Need inspiration? Try our template
            </button>
          </div>
        )}

        {uiState.showTemplate && (
          <div style={{
            padding: '16px',
            backgroundColor: '#eff6ff',
            borderBottom: '1px solid #dbeafe'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div>
                <h4 style={{
                  fontWeight: '500',
                  color: '#1e3a8a',
                  marginBottom: '4px',
                  fontSize: '14px'
                }}>Authentication System Template</h4>
                <p style={{
                  fontSize: '14px',
                  color: '#1d4ed8',
                  margin: 0
                }}>A structured example for development projects</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleUseTemplate}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    borderRadius: '6px',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Use Template
                </button>
                <button
                  onClick={() => updateUiState({ showTemplate: false })}
                  style={{
                    padding: '4px 12px',
                    color: '#2563eb',
                    backgroundColor: 'transparent',
                    borderRadius: '6px',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{
          padding: '24px',
          backgroundColor: '#f8fafc',
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {/* Goal Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: '#16a34a',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>1</span>
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>Goal</h3>
              {validation.goalValid && <CheckCircle size={16} style={{ color: '#10b981' }} />}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  What do you want to achieve? <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <WordCounter 
                  count={validation.wordCounts.goal} 
                  minWords={VALIDATION_RULES.GOAL_MIN_WORDS}
                />
              </div>
              
              <div style={{ position: 'relative' }}>
                <textarea
                  ref={goalRef}
                  value={formData.goal}
                  onChange={(e) => handleFieldChange('goal', e.target.value)}
                  placeholder="Describe the objective and expected outcomes of this task..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `2px solid ${
                      formData.goal.length > 0
                        ? validation.goalValid 
                          ? '#86efac'
                          : '#fed7aa'
                        : '#d1d5db'
                    }`,
                    borderRadius: '12px',
                    resize: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#374151',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    if (formData.goal.length > 0) {
                      e.target.style.boxShadow = validation.goalValid 
                        ? '0 0 0 4px rgba(134, 239, 172, 0.2)'
                        : '0 0 0 4px rgba(254, 215, 170, 0.2)';
                    } else {
                      e.target.style.boxShadow = '0 0 0 4px rgba(209, 213, 219, 0.2)';
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <ValidationMessage 
                  isValid={validation.goalValid || formData.goal.length === 0}
                  message={`Please provide more meaningful content (min ${VALIDATION_RULES.GOAL_MIN_WORDS} words)`}
                />
              </div>
            </div>
          </div>

          {/* Background Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: '#2563eb',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>2</span>
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>Background</h3>
              {validation.backgroundValid && <CheckCircle size={16} style={{ color: '#10b981' }} />}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Provide context and background information <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <WordCounter 
                  count={validation.wordCounts.background} 
                  minWords={VALIDATION_RULES.BACKGROUND_MIN_WORDS}
                />
              </div>
              
              <div style={{ position: 'relative' }}>
                <textarea
                  ref={backgroundRef}
                  value={formData.background}
                  onChange={(e) => handleFieldChange('background', e.target.value)}
                  placeholder="Share relevant context, previous attempts, constraints, or additional details..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `2px solid ${
                      formData.background.length > 0
                        ? validation.backgroundValid 
                          ? '#86efac'
                          : '#fed7aa'
                        : '#d1d5db'
                    }`,
                    borderRadius: '12px',
                    resize: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#374151',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    if (formData.background.length > 0) {
                      e.target.style.boxShadow = validation.backgroundValid 
                        ? '0 0 0 4px rgba(134, 239, 172, 0.2)'
                        : '0 0 0 4px rgba(254, 215, 170, 0.2)';
                    } else {
                      e.target.style.boxShadow = '0 0 0 4px rgba(209, 213, 219, 0.2)';
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <ValidationMessage 
                  isValid={validation.backgroundValid || formData.background.length === 0}
                  message={`Please provide more detailed context (min ${VALIDATION_RULES.BACKGROUND_MIN_WORDS} words)`}
                />
              </div>
            </div>
          </div>

          {/* Metadata Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#f3e8ff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: '#9333ea',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>3</span>
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>Metadata</h3>
              <span style={{
                fontSize: '12px',
                color: '#6b7280',
                backgroundColor: '#e5e7eb',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>Optional</span>
              {formData.metadata.length > 0 && (
                <span style={{
                  fontSize: '12px',
                  color: '#16a34a',
                  backgroundColor: '#dcfce7',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  {formData.metadata.length} item{formData.metadata.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Add relevant metadata to categorize and track your task
              </label>
              
              {/* Existing Metadata */}
              {formData.metadata.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {formData.metadata.map((item) => (
                    <MetadataItem
                      key={item.id}
                      item={item}
                      category={METADATA_CATEGORIES[item.category]}
                      onUpdate={handleUpdateMetadata}
                      onRemove={handleRemoveMetadata}
                    />
                  ))}
                </div>
              )}
              
              {/* Add Metadata Button */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => updateUiState({ showMetadataSelector: !uiState.showMetadataSelector })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    color: '#6b7280',
                    backgroundColor: '#ffffff',
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#9ca3af';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                >
                  <Plus size={14} />
                  Add Metadata
                </button>
                
                <MetadataSelector
                  isOpen={uiState.showMetadataSelector}
                  onClose={() => updateUiState({ showMetadataSelector: false, metadataSearch: '' })}
                  onSelect={handleAddMetadata}
                  searchTerm={uiState.metadataSearch}
                  onSearchChange={(value) => updateUiState({ metadataSearch: value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              <kbd style={{
                padding: '2px 8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                fontSize: '12px'
              }}>Ctrl</kbd> + <kbd style={{
                padding: '2px 8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                fontSize: '12px'
              }}>Enter</kbd> to submit
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!validation.isFormValid || uiState.isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '500',
                border: 'none',
                cursor: validation.isFormValid && !uiState.isSubmitting ? 'pointer' : 'not-allowed',
                backgroundColor: validation.isFormValid && !uiState.isSubmitting ? '#1f2937' : '#e5e7eb',
                color: validation.isFormValid && !uiState.isSubmitting ? '#ffffff' : '#9ca3af',
                transition: 'all 0.2s ease',
                transform: validation.isFormValid && !uiState.isSubmitting ? 'scale(1)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (validation.isFormValid && !uiState.isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#111827';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (validation.isFormValid && !uiState.isSubmitting) {
                  e.currentTarget.style.backgroundColor = '#1f2937';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {uiState.isSubmitting ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Creating Task...
                </>
              ) : uiState.showSuccess ? (
                <>
                  <CheckCircle size={16} />
                  Task Created!
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Create Task
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
