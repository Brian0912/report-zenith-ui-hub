
import React, { useState } from 'react';
import { Clock, User, AlertCircle, Info, AlertTriangle, Bug, Copy } from 'lucide-react';
import { Report } from './mockData';

interface TaskLogsSidebarProps {
  task: Report;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskLogsSidebar: React.FC<TaskLogsSidebarProps> = ({ task, isOpen, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState(task.versions[task.versions.length - 1]?.id || '');
  const [logFilter, setLogFilter] = useState<string>('all');

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertCircle size={16} style={{ color: '#EF4444' }} />;
      case 'warning': return <AlertTriangle size={16} style={{ color: '#F59E0B' }} />;
      case 'debug': return <Bug size={16} style={{ color: '#8B5CF6' }} />;
      default: return <Info size={16} style={{ color: '#3B82F6' }} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badgeStyle: React.CSSProperties = {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    };

    switch (status) {
      case 'completed':
        return <span style={{ ...badgeStyle, background: '#10B981', color: 'white' }}>Completed</span>;
      case 'running':
        return <span style={{ ...badgeStyle, background: '#3B82F6', color: 'white' }}>Running</span>;
      case 'error':
        return <span style={{ ...badgeStyle, background: '#EF4444', color: 'white' }}>Error</span>;
      case 'queued':
        return <span style={{ ...badgeStyle, background: '#F59E0B', color: 'white' }}>Queued</span>;
      default:
        return <span style={{ ...badgeStyle, background: '#6B7280', color: 'white' }}>Unknown</span>;
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const currentVersion = task.versions.find(v => v.id === selectedVersion) || task.versions[0];
  const filteredLogs = task.logs.filter(log => logFilter === 'all' || log.level === logFilter);

  const handleCopyLogs = () => {
    const logsText = filteredLogs.map(log => 
      `[${formatTimestamp(log.timestamp)}] ${log.level.toUpperCase()}: ${log.message}`
    ).join('\n');
    navigator.clipboard.writeText(logsText);
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
        {/* Task Overview */}
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
            <Clock size={16} />
            Task Overview
          </h3>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '16px' 
            }}>
              {getStatusBadge(task.status)}
              <span style={{ 
                fontSize: '14px', 
                color: '#6b7280' 
              }}>
                Version {currentVersion?.version}
              </span>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  fontWeight: '500', 
                  color: '#1a202c' 
                }}>
                  Progress
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  color: '#6b7280' 
                }}>
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

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px',
              fontSize: '14px'
            }}>
              <div>
                <div style={{ 
                  color: '#6b7280',
                  marginBottom: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Created
                </div>
                <div style={{ 
                  color: '#1a202c',
                  fontWeight: '500'
                }}>
                  {formatTimestamp(task.createdAt)}
                </div>
              </div>
              <div>
                <div style={{ 
                  color: '#6b7280',
                  marginBottom: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Last Run
                </div>
                <div style={{ 
                  color: '#1a202c',
                  fontWeight: '500'
                }}>
                  {formatTimestamp(task.schedule.lastRun)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Version Selection */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a202c',
            marginBottom: '16px'
          }}>
            Version History
          </h3>
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
              cursor: 'pointer'
            }}
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            {task.versions.map(version => (
              <option key={version.id} value={version.id}>
                Version {version.version} - {formatTimestamp(version.createdAt)} by {version.createdBy}
              </option>
            ))}
          </select>
        </div>

        {/* Version Details */}
        {currentVersion && (
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
              <User size={16} />
              Version Details
            </h3>
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6b7280',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '600'
                }}>
                  Goal
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#1a202c',
                  lineHeight: '1.5'
                }}>
                  {currentVersion.goal}
                </div>
              </div>
              
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6b7280',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '600'
                }}>
                  Background
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#1a202c',
                  lineHeight: '1.5'
                }}>
                  {currentVersion.background}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Execution Logs */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a202c',
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
