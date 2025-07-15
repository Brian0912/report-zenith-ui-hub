import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import { Plus, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { FormData, TEMPLATE_DATA, MetadataItemType, METADATA_CATEGORIES } from './TaskCreationPanel/types';
import { formReducer } from './TaskCreationPanel/formReducer';
import { useValidation, useAutoResize, VALIDATION_RULES } from './TaskCreationPanel/validation';
import { ValidationMessage } from './TaskCreationPanel/ValidationMessage';
import { WordCounter } from './TaskCreationPanel/WordCounter';
import { MetadataItem } from './TaskCreationPanel/MetadataItem';
import { MetadataSelector } from './TaskCreationPanel/MetadataSelector';
import { AnalysisTypeSelector } from './TaskCreationPanel/AnalysisTypeSelector';
import { EnhancedTimeRangePicker } from './EnhancedTimeRangePicker';

interface TaskCreationPanelProps {
  onSuccess?: () => void;
}

export const TaskCreationPanel: React.FC<TaskCreationPanelProps> = ({ onSuccess }) => {
  const [formData, dispatch] = useReducer(formReducer, { 
    reportName: '',
    goal: '', 
    analysisType: '', 
    background: '', 
    timeRange: null,
    metadata: [] 
  });
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
  const hasUnsavedChanges = formData.reportName || formData.goal || formData.background || formData.metadata.length > 0 || formData.analysisType || formData.timeRange;

  useEffect(() => {
    autoResize(goalRef.current);
  }, [formData.goal, autoResize]);

  useEffect(() => {
    autoResize(backgroundRef.current);
  }, [formData.background, autoResize]);

  const updateUiState = useCallback((updates: Partial<typeof uiState>) => {
    setUiState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleFieldChange = (field: keyof Omit<FormData, 'metadata' | 'timeRange'>, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const handleAnalysisTypeChange = (type: 'situational' | 'impact') => {
    dispatch({ type: 'SET_ANALYSIS_TYPE', value: type });
  };

  const handleTimeRangeChange = (range: { start: Date; end: Date }) => {
    dispatch({ type: 'SET_TIME_RANGE', value: range });
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
    dispatch({ type: 'SET_ALL', data: { reportName: '', goal: '', analysisType: '', background: '', timeRange: null, metadata: [] } });

    setTimeout(() => {
      updateUiState({ showSuccess: false });
    }, 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    resize: 'none' as const,
    outline: 'none',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '80px',
  };

  // Report card style step indicators
  const stepIndicatorStyle = (stepNumber: number, isCompleted: boolean): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: isCompleted ? '#111827' : '#f3f4f6',
    color: isCompleted ? '#ffffff' : '#6b7280',
    border: isCompleted ? '1px solid #111827' : '1px solid #e5e7eb'
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      {/* Template Section */}
      {!uiState.showTemplate && !hasUnsavedChanges && (
        <div style={{
          padding: '16px 24px',
          background: '#f8fafc',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => updateUiState({ showTemplate: true })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#111827',
              fontSize: '14px',
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
          >
            <Sparkles size={16} />
            Need inspiration? Try our template
          </button>
        </div>
      )}

      {uiState.showTemplate && (
        <div style={{
          padding: '16px 24px',
          background: '#f8fafc',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div>
              <h4 style={{
                fontWeight: '600',
                color: '#111827',
                marginBottom: '4px',
                fontSize: '14px'
              }}>Authentication System Template</h4>
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0
              }}>A structured example for development projects</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleUseTemplate}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111827'}
              >
                Use Template
              </button>
              <button
                onClick={() => updateUiState({ showTemplate: false })}
                style={{
                  padding: '8px 12px',
                  color: '#6b7280',
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
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
        backgroundColor: '#ffffff',
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        {/* Report Name Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={stepIndicatorStyle(1, validation.reportNameValid)}>1</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>Report Name</h3>
            {validation.reportNameValid && <CheckCircle size={18} style={{ color: '#111827' }} />}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827'
            }}>
              Name your report <span style={{ color: '#ef4444' }}>*</span>
            </label>
            
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={formData.reportName}
                onChange={(e) => handleFieldChange('reportName', e.target.value)}
                placeholder="Enter a descriptive name for your report..."
                style={{
                  ...inputStyle,
                  borderColor: formData.reportName.length > 0
                    ? validation.reportNameValid 
                      ? '#111827'
                      : '#f59e0b'
                    : '#e5e7eb'
                }}
                onFocus={(e) => {
                  if (formData.reportName.length > 0) {
                    e.target.style.boxShadow = validation.reportNameValid 
                      ? '0 0 0 3px rgba(17, 24, 39, 0.1)'
                      : '0 0 0 3px rgba(245, 158, 11, 0.1)';
                  } else {
                    e.target.style.boxShadow = '0 0 0 3px rgba(229, 231, 235, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                }}
              />
              <ValidationMessage 
                isValid={validation.reportNameValid || formData.reportName.length === 0}
                message={`Report name must be at least ${VALIDATION_RULES.REPORT_NAME_MIN_LENGTH} characters long`}
              />
            </div>
          </div>
        </div>

        {/* Goal Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={stepIndicatorStyle(2, validation.goalValid)}>2</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>Goal</h3>
            {validation.goalValid && <CheckCircle size={18} style={{ color: '#111827' }} />}
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
                color: '#111827'
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
                      ? '#111827'
                      : '#f59e0b'
                    : '#e5e7eb'
                }}
                onFocus={(e) => {
                  if (formData.goal.length > 0) {
                    e.target.style.boxShadow = validation.goalValid 
                      ? '0 0 0 3px rgba(17, 24, 39, 0.1)'
                      : '0 0 0 3px rgba(245, 158, 11, 0.1)';
                  } else {
                    e.target.style.boxShadow = '0 0 0 3px rgba(229, 231, 235, 0.1)';
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

            {/* Analysis Type Selection */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#111827'
              }}>
                Which type of analysis best describes your goal? <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <AnalysisTypeSelector
                selectedType={formData.analysisType}
                onTypeChange={handleAnalysisTypeChange}
              />
              <ValidationMessage 
                isValid={validation.analysisTypeValid || formData.analysisType === ''}
                message="Please select an analysis type"
              />
            </div>
          </div>
        </div>

        {/* Background Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={stepIndicatorStyle(3, validation.backgroundValid)}>3</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>Background</h3>
            {validation.backgroundValid && <CheckCircle size={18} style={{ color: '#111827' }} />}
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
                color: '#111827'
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
                      ? '#111827'
                      : '#f59e0b'
                    : '#e5e7eb'
                }}
                onFocus={(e) => {
                  if (formData.background.length > 0) {
                    e.target.style.boxShadow = validation.backgroundValid 
                      ? '0 0 0 3px rgba(17, 24, 39, 0.1)'
                      : '0 0 0 3px rgba(245, 158, 11, 0.1)';
                  } else {
                    e.target.style.boxShadow = '0 0 0 3px rgba(229, 231, 235, 0.1)';
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

        {/* Time Range Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={stepIndicatorStyle(4, validation.timeRangeValid)}>4</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>Time Range</h3>
            {validation.timeRangeValid && <CheckCircle size={18} style={{ color: '#111827' }} />}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827'
            }}>
              Select the time range for data used to generate the report <span style={{ color: '#ef4444' }}>*</span>
            </label>
            
            <div>
              {formData.timeRange ? (
                <EnhancedTimeRangePicker 
                  value={formData.timeRange} 
                  onChange={handleTimeRangeChange} 
                />
              ) : (
                <EnhancedTimeRangePicker 
                  value={{ start: new Date(Date.now() - 24 * 60 * 60 * 1000), end: new Date() }} 
                  onChange={handleTimeRangeChange} 
                />
              )}
              <ValidationMessage 
                isValid={validation.timeRangeValid || formData.timeRange === null}
                message="Please select a time range"
              />
            </div>
          </div>
        </div>

        {/* Metadata Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={stepIndicatorStyle(5, false)}>5</div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>Metadata</h3>
            <span style={{
              fontSize: '11px',
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: '500'
            }}>Optional</span>
            {formData.metadata.length > 0 && (
              <span style={{
                fontSize: '11px',
                color: '#111827',
                backgroundColor: '#f3f4f6',
                padding: '4px 8px',
                borderRadius: '12px',
                fontWeight: '500'
              }}>
                {formData.metadata.length} item{formData.metadata.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827'
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
                  padding: '12px 16px',
                  color: '#6b7280',
                  backgroundColor: '#ffffff',
                  border: '1px dashed #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#111827';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }}
              >
                <Plus size={16} style={{
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
        padding: '24px',
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
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              border: 'none',
              cursor: validation.isFormValid && !uiState.isSubmitting ? 'pointer' : 'not-allowed',
              background: validation.isFormValid && !uiState.isSubmitting 
                ? '#111827' 
                : '#e5e7eb',
              color: validation.isFormValid && !uiState.isSubmitting ? '#ffffff' : '#9ca3af',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (validation.isFormValid && !uiState.isSubmitting) {
                e.currentTarget.style.backgroundColor = '#374151';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (validation.isFormValid && !uiState.isSubmitting) {
                e.currentTarget.style.backgroundColor = '#111827';
                e.currentTarget.style.transform = 'translateY(0)';
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
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
