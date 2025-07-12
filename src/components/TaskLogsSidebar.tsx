import React, { useState } from 'react';
import { Clock, AlertCircle, Info, AlertTriangle, Bug, Copy, Calendar, FileText, ChevronDown, Eye, Download, Play, Users, Save, History, TrendingUp, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Report } from './mockData';
import { ReportStatusBadge } from './ReportStatusBadge';
import { sharedStyles } from './shared/styles';
import { useDownload } from '../hooks/useDownload';
import { useTaskEditor } from '../hooks/useTaskEditor';
import { EnhancedTimeRangePicker } from './EnhancedTimeRangePicker';
import { WorkflowProgress, WorkflowStep, WORKFLOW_STEPS } from './TaskLogsSidebar/WorkflowProgress';
import { MetadataEditMode } from './TaskLogsSidebar/MetadataEditMode';

interface TaskLogsSidebarProps {
  task: Report;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskLogsSidebar: React.FC<TaskLogsSidebarProps> = ({ task, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { startDownload } = useDownload();
  const [logFilter, setLogFilter] = useState<string>('all');
  const [showRunHistory, setShowRunHistory] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(task.isSubscribed || false);
  const [subscriberCount, setSubscriberCount] = useState(task.subscriberCount || 0);

  // Edit functionality
  const {
    currentValues,
    hasUnsavedChanges,
    isSaving,
    updateFrequency,
    updateTimeRange,
    updateMetadata,
    saveChanges,
    resetChanges
  } = useTaskEditor(task);

  const isEditable = task.status === 'completed';
  const frequencyOptions = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'];

  // Workflow progress calculation
  const getWorkflowSteps = (): WorkflowStep[] => {
    const stepStatuses = WORKFLOW_STEPS.map((stepLabel, index) => {
      let status: WorkflowStep['status'] = 'pending';
      
      if (task.status === 'completed') {
        status = 'completed';
      } else if (task.status === 'error') {
        status = index === 0 ? 'completed' : index === 1 ? 'error' : 'pending';
      } else if (task.status === 'running') {
        const progressSteps = Math.floor((task.progress || 0) / (100 / WORKFLOW_STEPS.length));
        if (index < progressSteps) {
          status = 'completed';
        } else if (index === progressSteps) {
          status = 'current';
        }
      } else if (task.status === 'queued') {
        status = index === 0 ? 'current' : 'pending';
      }

      return {
        id: `step-${index}`,
        label: stepLabel,
        status
      };
    });

    return stepStatuses;
  };

  // Map log stages to step names
  const mapLogStageToStepName = (stage: string): string => {
    const stageMap: Record<string, string> = {
      'INITIALIZATION': 'Task Submitted',
      'DATA_COLLECTION': 'Data Collection',
      'METRICS_GENERATION': 'Metrics Generation',
      'ANALYSIS': 'Analysis',
      'REPORT_GENERATION': 'Report',
      'COMPLETION': 'Completion'
    };
    return stageMap[stage] || stage;
  };

  const calculateNextRun = (frequency: string, baseDate: Date = new Date()) => {
    const nextRun = new Date(baseDate);
    
    switch (frequency) {
      case 'Daily':
        nextRun.setDate(nextRun.getDate() + 1);
        break;
      case 'Weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        break;
      case 'Bi-weekly':
        nextRun.setDate(nextRun.getDate() + 14);
        break;
      case 'Monthly':
        nextRun.setMonth(nextRun.getMonth() + 1);
        break;
      case 'Quarterly':
        nextRun.setMonth(nextRun.getMonth() + 3);
        break;
      default:
        nextRun.setDate(nextRun.getDate() + 1);
    }
    
    return nextRun;
  };

  const formatNextRunTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertCircle size={16} style={{ color: '#EF4444' }} />;
      case 'warning': return <AlertTriangle size={16} style={{ color: '#F59E0B' }} />;
      case 'debug': return <Bug size={16} style={{ color: '#8B5CF6' }} />;
      default: return <Info size={16} style={{ color: '#3B82F6' }} />;
    }
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

  const getAnalysisTypeDisplay = (type: string) => {
    if (type === 'situational') {
      return {
        text: 'Situational Analysis',
        icon: <History size={16} style={{ color: '#10b981' }} />
      };
    } else {
      return {
        text: 'Impact Analysis', 
        icon: <TrendingUp size={16} style={{ color: '#10b981' }} />
      };
    }
  };

  const filteredLogs = task.logs.filter(log => logFilter === 'all' || log.level === logFilter);

  const handleCopyLogs = () => {
    const logsText = filteredLogs.map(log => 
      `[${formatTimestamp(log.timestamp)}] ${log.level.toUpperCase()}: ${log.message}`
    ).join('\n');
    navigator.clipboard.writeText(logsText);
  };

  const handleFrequencyChange = (frequency: string) => {
    updateFrequency(frequency);
    setShowFrequencyDropdown(false);
  };

  const handleSubscribeClick = () => {
    setIsSubscribed(!isSubscribed);
    setSubscriberCount(prev => isSubscribed ? prev - 1 : prev + 1);
    console.log(`${isSubscribed ? 'Unsubscribed from' : 'Subscribed to'} task: ${task.id}`);
  };

  const handleViewReport = () => {
    setShowActionDropdown(false);
    navigate(`/tasks/${task.id}/report`);
  };

  const handleExport = () => {
    setShowActionDropdown(false);
    startDownload(`${task.title} - Complete Package`, task.id);
  };

  const handleRerun = () => {
    setShowActionDropdown(false);
    console.log(`Rerunning task: ${task.id}`);
  };

  const generateAvatar = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const runHistory = task.versions?.map((version, index) => ({
    timestamp: index === 0 ? '2h ago' : 
               index === 1 ? '1d ago' : 
               index === 2 ? '2w ago' : 
               index === 3 ? '3w ago' : '1mo ago',
    status: version.status === 'completed' ? 'completed' : 
            version.status === 'error' ? 'error' : 'completed',
    duration: ['45s', '52s', '12s', '48s', '41s'][index] || '45s',
    error: version.status === 'error' ? 'Data connection timeout' : undefined
  })) || [
    { timestamp: '2h ago', status: 'completed', duration: '45s' },
    { timestamp: '1w ago', status: 'completed', duration: '52s' },
    { timestamp: '3w ago', status: 'error', duration: '12s', error: 'Data connection timeout' },
    { timestamp: '1mo ago', status: 'completed', duration: '48s' },
    { timestamp: '2mo ago', status: 'completed', duration: '41s' }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      backgroundColor: '#fafafa'
    }}>
      <div style={{ 
        flex: 1, 
        overflow: 'auto', 
        padding: '32px'
      }}>
        {/* Overview Section */}
        <div style={sharedStyles.section}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              ...sharedStyles.heading,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Clock size={20} />
              Overview
            </h3>
            
            {hasUnsavedChanges && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '12px',
                  color: '#F59E0B',
                  fontWeight: '500'
                }}>
                  unsaved changes
                </span>
                <button
                  onClick={saveChanges}
                  disabled={isSaving}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                    opacity: isSaving ? 0.7 : 1,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSaving) {
                      e.currentTarget.style.backgroundColor = '#059669';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSaving) {
                      e.currentTarget.style.backgroundColor = '#10B981';
                    }
                  }}
                >
                  <Save size={12} />
                  {isSaving ? 'Saving...' : 'Save All'}
                </button>
              </div>
            )}
          </div>
          
          <div style={sharedStyles.card}>
            {/* Header with Owner, Status, and Actions */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '20px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {generateAvatar(task.pointOfContact.name)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...sharedStyles.value, marginBottom: '4px' }}>
                    {task.pointOfContact.name}
                  </div>
                  <div style={{ ...sharedStyles.label, margin: '0' }}>
                    Task Owner
                  </div>
                </div>
                <ReportStatusBadge status={task.status} />
              </div>

              {/* Action Dropdown */}
              <div style={{ position: 'relative', marginLeft: '16px' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'transparent',
                    color: '#6B7280',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setShowActionDropdown(!showActionDropdown)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                    e.currentTarget.style.borderColor = '#9CA3AF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#D1D5DB';
                  }}
                >
                  Actions
                  <ChevronDown size={12} style={{
                    transform: showActionDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }} />
                </button>

                {showActionDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    marginTop: '4px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    zIndex: 1000,
                    minWidth: '160px',
                    overflow: 'hidden'
                  }}>
                    <button
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '13px',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onClick={handleViewReport}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Eye size={14} />
                      View Report
                    </button>
                    <button
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '13px',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onClick={handleExport}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Download size={14} />
                      Export
                    </button>
                    <button
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '13px',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onClick={handleRerun}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Play size={14} />
                      Rerun
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {task.status === 'running' && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={sharedStyles.value}>Progress</span>
                  <span style={{ ...sharedStyles.label, margin: '0' }}>
                    {task.progress}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)',
                    width: `${task.progress}%`,
                    transition: 'width 0.3s ease',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            )}

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <div style={sharedStyles.label}>Created</div>
                <div style={sharedStyles.value}>
                  {formatTimestamp(task.createdAt)}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={sharedStyles.label}>Last Updated</div>
                <div 
                  style={{
                    ...sharedStyles.value,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    padding: '2px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease'
                  }}
                  onClick={() => setShowRunHistory(!showRunHistory)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {formatTimestamp(task.schedule.lastRun)}
                  <ChevronDown 
                    size={14} 
                    style={{ 
                      transform: showRunHistory ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </div>
                
                {showRunHistory && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    marginTop: '4px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    zIndex: 50,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #f1f5f9',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Run History
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {runHistory.map((run, index) => (
                        <div 
                          key={index}
                          style={{
                            padding: '12px 16px',
                            borderBottom: index < runHistory.length - 1 ? '1px solid #f8fafc' : 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => setShowRunHistory(false)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ 
                              color: run.status === 'completed' ? '#22c55e' : '#ef4444',
                              fontWeight: '500'
                            }}>
                              {run.timestamp}
                            </div>
                            {run.error && (
                              <div style={{ 
                                fontSize: '11px', 
                                color: '#ef4444',
                                fontStyle: 'italic'
                              }}>
                                {run.error}
                              </div>
                            )}
                          </div>
                          <div style={{ 
                            fontSize: '11px', 
                            color: '#64748b',
                            fontWeight: '500'
                          }}>
                            {run.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px'
            }}>
              <div style={{ position: 'relative' }}>
                <div style={sharedStyles.label}>Frequency</div>
                {isEditable ? (
                  <div 
                    style={{
                      ...sharedStyles.value,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                      e.currentTarget.style.borderColor = '#E5E7EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <Calendar size={16} style={{ color: '#6b7280' }} />
                    {currentValues.frequency}
                    <ChevronDown 
                      size={14} 
                      style={{ 
                        transform: showFrequencyDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }} 
                    />
                  </div>
                ) : (
                  <div style={{
                    ...sharedStyles.value,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Calendar size={16} style={{ color: '#6b7280' }} />
                    {currentValues.frequency}
                  </div>
                )}

                {showFrequencyDropdown && isEditable && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    marginTop: '4px',
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                    zIndex: 1000,
                    minWidth: '200px',
                    overflow: 'hidden'
                  }}>
                    {frequencyOptions.map((freq) => {
                      const nextRun = calculateNextRun(freq);
                      const nextRunDisplay = formatNextRunTimestamp(nextRun);
                      
                      return (
                        <button
                          key={freq}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: freq === currentValues.frequency ? '#F0F9FF' : 'transparent',
                            border: 'none',
                            textAlign: 'left',
                            fontSize: '13px',
                            color: freq === currentValues.frequency ? '#0369A1' : '#374151',
                            cursor: 'pointer',
                            fontWeight: freq === currentValues.frequency ? '600' : '400',
                            transition: 'background-color 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px'
                          }}
                          onClick={() => handleFrequencyChange(freq)}
                          onMouseEnter={(e) => {
                            if (freq !== currentValues.frequency) {
                              e.currentTarget.style.backgroundColor = '#F9FAFB';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (freq !== currentValues.frequency) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          <span>{freq}</span>
                          <span style={{
                            fontSize: '11px',
                            color: freq === currentValues.frequency ? '#0369A1' : '#9CA3AF',
                            fontWeight: '400'
                          }}>
                            Next: {nextRunDisplay}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <div style={sharedStyles.label}>Follow Updates</div>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: isSubscribed ? '#F0F9FF' : 'transparent',
                    color: isSubscribed ? '#0369A1' : '#6B7280',
                    border: `1px solid ${isSubscribed ? '#0369A1' : '#D1D5DB'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={handleSubscribeClick}
                  onMouseEnter={(e) => {
                    if (!isSubscribed) {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                      e.currentTarget.style.borderColor = '#9CA3AF';
                    } else {
                      e.currentTarget.style.backgroundColor = '#E0F2FE';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isSubscribed ? '#F0F9FF' : 'transparent';
                    e.currentTarget.style.borderColor = isSubscribed ? '#0369A1' : '#D1D5DB';
                  }}
                >
                  <Users size={14} />
                  <span>{subscriberCount}</span>
                  <span>{isSubscribed ? 'Following' : 'Follow'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section - Moved above Steps */}
        <div style={sharedStyles.section}>
          <h3 style={{
            ...sharedStyles.heading,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FileText size={20} />
            Details
          </h3>
          <div style={sharedStyles.card}>
            {task.taskCreation ? (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <div style={sharedStyles.label}>Goal</div>
                  <div style={sharedStyles.value}>
                    {task.taskCreation.goal}
                  </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={sharedStyles.label}>Analysis Type</div>
                  <div style={{
                    ...sharedStyles.value,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {getAnalysisTypeDisplay(task.taskCreation.analysisType).icon}
                    {getAnalysisTypeDisplay(task.taskCreation.analysisType).text}
                  </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={sharedStyles.label}>Background</div>
                  <div style={sharedStyles.value}>
                    {task.taskCreation.background}
                  </div>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={sharedStyles.label}>Time Range</div>
                  <EnhancedTimeRangePicker
                    value={currentValues.timeRange}
                    onChange={updateTimeRange}
                    disabled={!isEditable}
                  />
                </div>
                
                {(currentValues.metadata.length > 0 || isEditable) && (
                  <div>
                    <MetadataEditMode
                      metadata={currentValues.metadata}
                      onChange={updateMetadata}
                      disabled={!isEditable}
                    />
                  </div>
                )}
              </>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '48px 24px',
                color: '#6b7280',
                fontSize: '14px'
              }}>
                No task creation details available
              </div>
            )}
          </div>
        </div>

        {/* Steps Section - Renamed from Progress Flow */}
        <div style={sharedStyles.section}>
          <h3 style={{
            ...sharedStyles.heading,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <List size={20} />
            Steps
          </h3>
          <div style={sharedStyles.card}>
            <WorkflowProgress steps={getWorkflowSteps()} />
          </div>
        </div>

        {/* Execution Logs Section */}
        <div style={sharedStyles.section}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h3 style={{
              ...sharedStyles.heading,
              margin: 0
            }}>
              Execution Logs
            </h3>
            
            <button
              onClick={handleCopyLogs}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: 'none',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                color: '#6b7280',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              <Copy size={12} />
              Copy Logs
            </button>
          </div>
          
          <select 
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              color: '#1a202c',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
            value={logFilter}
            onChange={(e) => setLogFilter(e.target.value)}
          >
            <option value="all">All Logs</option>
            <option value="error">Errors Only</option>
            <option value="warning">Warnings Only</option>
            <option value="info">Info Only</option>
            <option value="debug">Debug Only</option>
          </select>

          <div>
            {filteredLogs.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '48px 24px',
                color: '#6b7280',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                No logs available for this task
              </div>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ paddingTop: '2px' }}>
                    {getLogIcon(log.level)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '6px'
                    }}>
                      <span style={{ 
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#1a202c',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {mapLogStageToStepName(log.stage)}
                      </span>
                      <span style={{ 
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: '#374151',
                      lineHeight: '1.5'
                    }}>
                      {log.message}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
