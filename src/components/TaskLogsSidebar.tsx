
import React, { useState } from 'react';
import { X, Clock, User, AlertCircle, Info, AlertTriangle, Bug, ChevronDown, ChevronRight, Copy } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Report, TaskLogs } from './mockData';

interface TaskLogsSidebarProps {
  task: Report;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskLogsSidebar: React.FC<TaskLogsSidebarProps> = ({ task, isOpen, onClose }) => {
  const { theme } = useTheme();
  const [selectedVersion, setSelectedVersion] = useState(task.versions[task.versions.length - 1]?.id || '');
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set(['current']));
  const [logFilter, setLogFilter] = useState<string>('all');

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '600px',
    height: '100vh',
    background: theme === 'dark'
      ? 'rgba(20, 20, 20, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    borderRight: 'none',
    boxShadow: theme === 'dark'
      ? '-8px 0 32px rgba(0, 0, 0, 0.3)'
      : '-8px 0 32px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderBottom: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    marginBottom: '0.5rem',
    lineHeight: '1.4'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    flexShrink: 0
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '1.5rem'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: '600',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const infoCardStyle: React.CSSProperties = {
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.8)',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem'
  };

  const progressBarStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.5rem'
  };

  const progressFillStyle: React.CSSProperties = {
    height: '100%',
    background: 'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)',
    width: `${task.progress}%`,
    transition: 'width 0.3s ease'
  };

  const logItemStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '0.5rem',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.02)'
      : 'rgba(0, 0, 0, 0.02)',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.05)'
      : '1px solid rgba(0, 0, 0, 0.05)'
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem',
    background: theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.8)',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.2)'
      : '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    color: theme === 'dark' ? '#F3F4F6' : '#374151',
    fontSize: '0.875rem'
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
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '500',
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
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        <div style={{ flex: 1 }}>
          <h2 style={titleStyle}>Task Logs - {task.title}</h2>
          <div style={subtitleStyle}>
            {getStatusBadge(task.status)}
            <span>•</span>
            <span>Version {currentVersion?.version}</span>
          </div>
        </div>
        <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = 'none';
          }}
        >
          <X size={20} />
        </button>
      </div>

      <div style={contentStyle}>
        {/* Task Details Section */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>
            <Clock size={16} />
            Task Details
          </h3>
          <div style={infoCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '500', color: theme === 'dark' ? '#F3F4F6' : '#374151' }}>Progress</span>
              <span style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}>{task.progress}%</span>
            </div>
            <div style={progressBarStyle}>
              <div style={progressFillStyle} />
            </div>
            
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#9CA3AF' : '#6B7280', marginBottom: '0.25rem' }}>Created</div>
                <div style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#F3F4F6' : '#374151' }}>{formatTimestamp(task.createdAt)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#9CA3AF' : '#6B7280', marginBottom: '0.25rem' }}>Last Run</div>
                <div style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#F3F4F6' : '#374151' }}>{formatTimestamp(task.schedule.lastRun)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Version Selection */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Version History</h3>
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

        {/* Current Version Details */}
        {currentVersion && (
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>
              <User size={16} />
              Version Details
            </h3>
            <div style={infoCardStyle}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#9CA3AF' : '#6B7280', marginBottom: '0.25rem' }}>Goal</div>
                <div style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#F3F4F6' : '#374151', lineHeight: '1.4' }}>{currentVersion.goal}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#9CA3AF' : '#6B7280', marginBottom: '0.25rem' }}>Background</div>
                <div style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#F3F4F6' : '#374151', lineHeight: '1.4' }}>{currentVersion.background}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: theme === 'dark' ? '#9CA3AF' : '#6B7280', marginBottom: '0.5rem' }}>Metadata</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {Object.entries(currentVersion.metadata).map(([key, values]) => (
                    <div key={key} style={{ 
                      background: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      color: theme === 'dark' ? '#93C5FD' : '#1D4ED8'
                    }}>
                      {key}: {values.join(', ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Execution Logs */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={sectionTitleStyle}>Execution Logs</h3>
            <button
              onClick={handleCopyLogs}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                background: 'none',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '6px',
                color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              <Copy size={14} />
              Copy Logs
            </button>
          </div>
          
          <select 
            style={{ ...selectStyle, marginBottom: '1rem' }}
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
                padding: '2rem',
                color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                fontSize: '0.875rem'
              }}>
                No logs available for this task
              </div>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} style={logItemStyle}>
                  {getLogIcon(log.level)}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '0.25rem'
                    }}>
                      <span style={{ 
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: theme === 'dark' ? '#F3F4F6' : '#374151'
                      }}>
                        {log.stage}
                      </span>
                      <span style={{ 
                        fontSize: '0.75rem',
                        color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                      }}>
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: theme === 'dark' ? '#D1D5DB' : '#4B5563',
                      lineHeight: '1.4'
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
