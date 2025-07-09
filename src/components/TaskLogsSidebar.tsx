
import React, { useState } from 'react';
import { Clock, User, AlertCircle, Info, AlertTriangle, Bug, Copy } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Report } from './mockData';

interface TaskLogsSidebarProps {
  task: Report;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskLogsSidebar: React.FC<TaskLogsSidebarProps> = ({ task, isOpen, onClose }) => {
  const { theme } = useTheme();
  const [selectedVersion, setSelectedVersion] = useState(task.versions[task.versions.length - 1]?.id || '');
  const [logFilter, setLogFilter] = useState<string>('all');

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme === 'dark' ? '#1a1a2e' : '#fafafa'
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '32px 24px'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
    border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px'
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '12px'
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    background: 'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)',
    width: `${task.progress}%`,
    transition: 'width 0.3s ease',
    borderRadius: '4px'
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: theme === 'dark' ? '#2d3748' : '#ffffff',
    border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #d1d5db',
    borderRadius: '8px',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    fontSize: '14px',
    outline: 'none'
  };

  const logItemStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '12px',
    background: theme === 'dark' ? '#2d3748' : '#ffffff',
    border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #e2e8f0'
  };

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
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Task Overview */}
        <div style={sectionStyle}>
          <h3 style={sectionHeaderStyle}>
            <Clock size={16} />
            Task Overview
          </h3>
          <div style={cardStyle}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              marginBottom: '16px' 
            }}>
              {getStatusBadge(task.status)}
              <span style={{ 
                fontSize: '14px', 
                color: theme === 'dark' ? '#a0aec0' : '#6b7280' 
              }}>
                Version {currentVersion?.version}
              </span>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ 
                  fontWeight: '500', 
                  color: theme === 'dark' ? '#ffffff' : '#1a202c' 
                }}>
                  Progress
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  color: theme === 'dark' ? '#a0aec0' : '#6b7280' 
                }}>
                  {task.progress}%
                </span>
              </div>
              <div style={progressBarStyle}>
                <div style={progressFillStyle} />
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
                  color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                  marginBottom: '4px'
                }}>
                  Created
                </div>
                <div style={{ 
                  color: theme === 'dark' ? '#ffffff' : '#1a202c',
                  fontWeight: '500'
                }}>
                  {formatTimestamp(task.createdAt)}
                </div>
              </div>
              <div>
                <div style={{ 
                  color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                  marginBottom: '4px'
                }}>
                  Last Run
                </div>
                <div style={{ 
                  color: theme === 'dark' ? '#ffffff' : '#1a202c',
                  fontWeight: '500'
                }}>
                  {formatTimestamp(task.schedule.lastRun)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Version Selection */}
        <div style={sectionStyle}>
          <h3 style={sectionHeaderStyle}>Version History</h3>
          <select 
            style={selectStyle}
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
          <div style={sectionStyle}>
            <h3 style={sectionHeaderStyle}>
              <User size={16} />
              Version Details
            </h3>
            <div style={cardStyle}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '600'
                }}>
                  Goal
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: theme === 'dark' ? '#ffffff' : '#1a202c',
                  lineHeight: '1.5'
                }}>
                  {currentVersion.goal}
                </div>
              </div>
              
              <div>
                <div style={{ 
                  fontSize: '12px', 
                  color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '600'
                }}>
                  Background
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: theme === 'dark' ? '#ffffff' : '#1a202c',
                  lineHeight: '1.5'
                }}>
                  {currentVersion.background}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Execution Logs */}
        <div style={sectionStyle}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h3 style={{ ...sectionHeaderStyle, marginBottom: 0 }}>Execution Logs</h3>
            <button
              onClick={handleCopyLogs}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: 'none',
                border: theme === 'dark' ? '1px solid #4a5568' : '1px solid #d1d5db',
                borderRadius: '6px',
                color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Copy size={12} />
              Copy Logs
            </button>
          </div>
          
          <select 
            style={{ ...selectStyle, marginBottom: '16px' }}
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
                padding: '32px',
                color: theme === 'dark' ? '#a0aec0' : '#6b7280',
                fontSize: '14px'
              }}>
                No logs available for this task
              </div>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} style={logItemStyle}>
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
                        color: theme === 'dark' ? '#ffffff' : '#1a202c',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {log.stage}
                      </span>
                      <span style={{ 
                        fontSize: '12px',
                        color: theme === 'dark' ? '#a0aec0' : '#6b7280'
                      }}>
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '14px',
                      color: theme === 'dark' ? '#e2e8f0' : '#374151',
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
