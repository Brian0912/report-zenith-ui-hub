import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import { Plus, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { FormData, TEMPLATE_DATA, MetadataItemType, METADATA_CATEGORIES } from './TaskCreationPanel/types';
import { formReducer } from './TaskCreationPanel/formReducer';
import { useValidation, useAutoResize, VALIDATION_RULES } from './TaskCreationPanel/validation';
import { ValidationMessage } from './TaskCreationPanel/ValidationMessage';
import { WordCounter } from './TaskCreationPanel/WordCounter';
import { MetadataItem } from './TaskCreationPanel/MetadataItem';
import { MetadataSelector } from './TaskCreationPanel/MetadataSelector';

interface TaskCreationPanelProps {
  onSuccess?: () => void;
}

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

  const handleAddMetadata = (categoryKey: string, optionKey: string) => {
    const newItem: MetadataItemType = {
      id: Date.now() + Math.random().toString(),
      category: categoryKey as keyof typeof METADATA_CATEGORIES,
      key: optionKey,
      value: ''
    };
    dispatch({ type: 'ADD_METADATA', item: newItem });
    updateUiState({ showMetadataSelector: false, metadataSearch: '' });
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    borderRadius: '16px',
    border: '2px solid #d1d5db',
    resize: 'none' as const,
    outline: 'none',
    fontSize: '16px',
    color: '#374151',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '80px',
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Template Section */}
      {!uiState.showTemplate && !hasUnsavedChanges && (
        <div style={{
          padding: '20px 32px',
          background: 'linear-gradient(135deg, #e0f2fe 0%, #e1f5fe 100%)',
          borderBottom: '1px solid #b3e5fc'
        }}>
          <button
            onClick={() => updateUiState({ showTemplate: true })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#0277bd',
              fontSize: '16px',
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#01579b'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#0277bd'}
          >
            <Sparkles size={18} />
            Need inspiration? Try our template
          </button>
        </div>
      )}

      {uiState.showTemplate && (
        <div style={{
          padding: '20px 32px',
          background: 'linear-gradient(135deg, #e0f2fe 0%, #e1f5fe 100%)',
          borderBottom: '1px solid #b3e5fc'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <h4 style={{
                fontWeight: '600',
                color: '#01579b',
                marginBottom: '6px',
                fontSize: '16px'
              }}>Authentication System Template</h4>
              <p style={{
                fontSize: '14px',
                color: '#0277bd',
                margin: 0
              }}>A structured example for development projects</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleUseTemplate}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#0277bd',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01579b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0277bd'}
              >
                Use Template
              </button>
              <button
                onClick={() => updateUiState({ showTemplate: false })}
                style={{
                  padding: '8px 16px',
                  color: '#0277bd',
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(2, 119, 189, 0.1)'}
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
        padding: '32px',
        backgroundColor: '#fafbfc',
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {/* Goal Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '16px'
              }}>1</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>Goal</h3>
            {validation.goalValid && <CheckCircle size={20} style={{ color: '#10b981' }} />}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <label style={{
                fontSize: '16px',
                fontWeight: '600',
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
                  ...textareaStyle,
                  borderColor: formData.goal.length > 0
                    ? validation.goalValid 
                      ? '#10b981'
                      : '#f59e0b'
                    : '#d1d5db'
                }}
                onFocus={(e) => {
                  if (formData.goal.length > 0) {
                    e.target.style.boxShadow = validation.goalValid 
                      ? '0 0 0 4px rgba(16, 185, 129, 0.1)'
                      : '0 0 0 4px rgba(245, 158, 11, 0.1)';
                  } else {
                    e.target.style.boxShadow = '0 0 0 4px rgba(209, 213, 219, 0.1)';
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '16px'
              }}>2</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>Background</h3>
            {validation.backgroundValid && <CheckCircle size={20} style={{ color: '#10b981' }} />}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <label style={{
                fontSize: '16px',
                fontWeight: '600',
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
                  ...textareaStyle,
                  borderColor: formData.background.length > 0
                    ? validation.backgroundValid 
                      ? '#10b981'
                      : '#f59e0b'
                    : '#d1d5db'
                }}
                onFocus={(e) => {
                  if (formData.background.length > 0) {
                    e.target.style.boxShadow = validation.backgroundValid 
                      ? '0 0 0 4px rgba(16, 185, 129, 0.1)'
                      : '0 0 0 4px rgba(245, 158, 11, 0.1)';
                  } else {
                    e.target.style.boxShadow = '0 0 0 4px rgba(209, 213, 219, 0.1)';
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '16px'
              }}>3</span>
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>Metadata</h3>
            <span style={{
              fontSize: '12px',
              color: '#6b7280',
              backgroundColor: '#e5e7eb',
              padding: '4px 12px',
              borderRadius: '16px',
              fontWeight: '500'
            }}>Optional</span>
            {formData.metadata.length > 0 && (
              <span style={{
                fontSize: '12px',
                color: '#10b981',
                backgroundColor: '#dcfce7',
                padding: '4px 12px',
                borderRadius: '16px',
                fontWeight: '500'
              }}>
                {formData.metadata.length} item{formData.metadata.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Add relevant metadata to categorize and track your task
            </label>
            
            {/* Existing Metadata */}
            {formData.metadata.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {formData.metadata.map((item) => (
                  <MetadataItem
                    key={item.id}
                    item={item}
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
                  gap: '12px',
                  padding: '16px 24px',
                  color: '#6b7280',
                  backgroundColor: '#ffffff',
                  border: '2px dashed #d1d5db',
                  borderRadius: '16px',
                  fontSize: '16px',
                  fontWeight: '500',
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
                <Plus size={18} style={{
                  transition: 'transform 0.2s ease',
                  transform: uiState.showMetadataSelector ? 'rotate(45deg)' : 'rotate(0deg)'
                }} />
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
        padding: '32px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleSubmit}
            disabled={!validation.isFormValid || uiState.isSubmitting}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              borderRadius: '16px',
              fontWeight: '600',
              fontSize: '16px',
              border: 'none',
              cursor: validation.isFormValid && !uiState.isSubmitting ? 'pointer' : 'not-allowed',
              background: validation.isFormValid && !uiState.isSubmitting 
                ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' 
                : '#e5e7eb',
              color: validation.isFormValid && !uiState.isSubmitting ? '#ffffff' : '#9ca3af',
              transition: 'all 0.2s ease',
              transform: validation.isFormValid && !uiState.isSubmitting ? 'scale(1)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (validation.isFormValid && !uiState.isSubmitting) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #111827 0%, #000000 100%)';
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (validation.isFormValid && !uiState.isSubmitting) {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1f2937 0%, #111827 100%)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {uiState.isSubmitting ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Creating Task...
              </>
            ) : uiState.showSuccess ? (
              <>
                <CheckCircle size={18} />
                Task Created!
              </>
            ) : (
              <>
                <Plus size={18} />
                Create Task
              </>
            )}
          </button>
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
