
import React, { useState } from 'react';
import { Clock, User, AlertCircle, Info, AlertTriangle, Bug, Copy, Calendar, Target, FileText } from 'lucide-react';
import { Report } from './mockData';
import { ReportStatusBadge } from './ReportStatusBadge';
import { sharedStyles } from './shared/styles';

interface TaskLogsSidebarProps {
  task: Report;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskLogsSidebar: React.FC<TaskLogsSidebarProps> = ({ task, isOpen, onClose }) => {
  const [logFilter, setLogFilter] = useState<string>('all');

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

  const formatDateRange = (start: Date, end: Date) => {
    const startStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(start);
    
    const endStr = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(end);
    
    return `${startStr} - ${endStr}`;
  };

  const getAnalysisTypeDisplay = (type: string) => {
    return type === 'situational' ? 'Situational Analysis' : 'Impact Analysis';
  };

  const getMetadataLabel = (category: string, key: string) => {
    const categoryLabels: Record<string, Record<string, string>> = {
      priority: { high: 'High Priority', medium: 'Medium Priority', low: 'Low Priority', urgent: 'Urgent' },
      type: { feature: 'Feature Request', bug: 'Bug Fix', enhancement: 'Enhancement', research: 'Research', documentation: 'Documentation' },
      team: { frontend: 'Frontend', backend: 'Backend', design: 'Design', qa: 'Quality Assurance', devops: 'DevOps' },
      complexity: { simple: 'Simple', moderate: 'Moderate', complex: 'Complex', expert: 'Expert Level' }
    };
    
    return categoryLabels[category]?.[key] || key;
  };

  const filteredLogs = task.logs.filter(log => logFilter === 'all' || log.level === logFilter);

  const handleCopyLogs = () => {
    const logsText = filteredLogs.map(log => 
      `[${formatTimestamp(log.timestamp)}] ${log.level.toUpperCase()}: ${log.message}`
    ).join('\n');
    navigator.clipboard.writeText(logsText);
  };

  const generateAvatar = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
          <h3 style={{
            ...sharedStyles.heading,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Clock size={20} />
            Overview
          </h3>
          <div style={sharedStyles.card}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              marginBottom: '20px' 
            }}>
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
              gap: '20px'
            }}>
              <div>
                <div style={sharedStyles.label}>Created</div>
                <div style={sharedStyles.value}>
                  {formatTimestamp(task.createdAt)}
                </div>
              </div>
              <div>
                <div style={sharedStyles.label}>Last Updated</div>
                <div style={sharedStyles.value}>
                  {formatTimestamp(task.schedule.lastRun)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        {task.taskCreation && (
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
              {/* Goal */}
              <div style={{ marginBottom: '24px' }}>
                <div style={sharedStyles.label}>Goal</div>
                <div style={sharedStyles.value}>
                  {task.taskCreation.goal}
                </div>
              </div>
              
              {/* Analysis Type */}
              <div style={{ marginBottom: '24px' }}>
                <div style={sharedStyles.label}>Analysis Type</div>
                <div style={{
                  ...sharedStyles.value,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Target size={16} style={{ color: '#10b981' }} />
                  {getAnalysisTypeDisplay(task.taskCreation.analysisType)}
                </div>
              </div>
              
              {/* Background */}
              <div style={{ marginBottom: '24px' }}>
                <div style={sharedStyles.label}>Background</div>
                <div style={sharedStyles.value}>
                  {task.taskCreation.background}
                </div>
              </div>
              
              {/* Time Range */}
              <div style={{ marginBottom: '24px' }}>
                <div style={sharedStyles.label}>Time Range</div>
                <div style={{
                  ...sharedStyles.value,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Calendar size={16} style={{ color: '#6b7280' }} />
                  {formatDateRange(task.taskCreation.timeRange.start, task.taskCreation.timeRange.end)}
                </div>
              </div>
              
              {/* Metadata */}
              {task.taskCreation.metadata.length > 0 && (
                <div>
                  <div style={sharedStyles.label}>Metadata</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {task.taskCreation.metadata.map((meta) => (
                      <div key={meta.id} style={{
                        padding: '12px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ 
                          fontSize: '12px', 
                          fontWeight: '600',
                          color: '#3b82f6',
                          marginBottom: '4px',
                          textTransform: 'capitalize'
                        }}>
                          {getMetadataLabel(meta.category, meta.key)}
                        </div>
                        <div style={{ 
                          fontSize: '13px', 
                          color: '#4b5563',
                          lineHeight: '1.4'
                        }}>
                          {meta.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
                        {log.stage}
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
