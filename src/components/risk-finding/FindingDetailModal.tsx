
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { Finding } from './mockFindingData';

interface FindingDetailModalProps {
  finding: Finding;
  onClose: () => void;
}

export const FindingDetailModal: React.FC<FindingDetailModalProps> = ({ finding, onClose }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'details' | 'analysis' | 'timeline'>('details');

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '20px',
    padding: '0',
    maxWidth: '1000px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 32px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.5)'
      : 'rgba(248, 250, 252, 0.8)'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    margin: 0
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    padding: '4px',
    borderRadius: '6px',
    transition: 'all 0.3s ease'
  };

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    background: theme === 'dark' ? 'rgba(15, 23, 42, 0.5)' : 'rgba(241, 245, 249, 0.8)'
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '16px 24px',
    border: 'none',
    background: active 
      ? (theme === 'dark' ? '#1e293b' : '#ffffff')
      : 'transparent',
    color: active
      ? (theme === 'dark' ? '#f1f5f9' : '#1e293b')
      : (theme === 'dark' ? '#94a3b8' : '#64748b'),
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: active ? '600' : '500',
    borderBottom: active ? `2px solid #3b82f6` : '2px solid transparent',
    transition: 'all 0.3s ease'
  });

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '32px',
    overflowY: 'auto'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    marginBottom: '12px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    paddingBottom: '8px'
  };

  const fieldGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const fieldValueStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    wordBreak: 'break-word'
  };

  const codeStyle: React.CSSProperties = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    borderRadius: '8px',
    padding: '16px',
    fontFamily: 'monospace',
    fontSize: '13px',
    color: theme === 'dark' ? '#94a3b8' : '#475569',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all'
  };

  const timelineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const timelineItemStyle = (completed: boolean): React.CSSProperties => ({
    display: 'flex',
    gap: '16px',
    padding: '20px',
    borderRadius: '12px',
    background: completed
      ? (theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)')
      : (theme === 'dark' ? 'rgba(107, 114, 128, 0.1)' : 'rgba(107, 114, 128, 0.05)'),
    border: `1px solid ${completed ? '#10b981' : (theme === 'dark' ? '#374151' : '#d1d5db')}`
  });

  const timelineIconStyle = (completed: boolean): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: completed ? '#10b981' : '#6b7280',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    flexShrink: 0
  });

  const renderDetailsTab = () => (
    <div>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Basic Information</h3>
        <div style={fieldGridStyle}>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Reporter</span>
            <span style={fieldValueStyle}>{finding.reporter}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Submission Date</span>
            <span style={fieldValueStyle}>{finding.submissionDate}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Finding ID</span>
            <span style={fieldValueStyle}>{finding.findingId}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Status</span>
            <span style={fieldValueStyle}>{finding.status.replace('_', ' ').toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Technical Details</h3>
        <div style={fieldGridStyle}>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Domain</span>
            <span style={fieldValueStyle}>{finding.domain}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>PSM</span>
            <span style={fieldValueStyle}>{finding.psm}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Path</span>
            <span style={fieldValueStyle}>{finding.path}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>HTTP Method</span>
            <span style={fieldValueStyle}>{finding.httpMethod}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Access Level</span>
            <span style={fieldValueStyle}>{finding.employeeAccessLevel}</span>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Description</h3>
        <p style={fieldValueStyle}>{finding.description}</p>
      </div>

      {finding.curlCommand && (
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>cURL Command</h3>
          <div style={codeStyle}>
            {finding.curlCommand}
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalysisTab = () => (
    <div>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Automatic Analysis Report</h3>
        <p style={fieldValueStyle}>
          This finding has been automatically analyzed and categorized based on the submitted information.
          The system identified potential security implications and assigned it to the appropriate risk category.
        </p>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Risk Assessment</h3>
        <div style={fieldGridStyle}>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Risk Category</span>
            <span style={fieldValueStyle}>{finding.riskCategory || 'Not Assigned'}</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Severity</span>
            <span style={fieldValueStyle}>Medium</span>
          </div>
          <div style={fieldStyle}>
            <span style={fieldLabelStyle}>Confidence</span>
            <span style={fieldValueStyle}>85%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimelineTab = () => (
    <div style={timelineStyle}>
      {finding.timeline.map((stage, index) => (
        <div key={index} style={timelineItemStyle(stage.completed)}>
          <div style={timelineIconStyle(stage.completed)}>
            {stage.completed ? '✓' : index + 1}
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
              margin: '0 0 8px 0'
            }}>
              {stage.stage}
            </h4>
            <p style={{ 
              fontSize: '14px', 
              color: theme === 'dark' ? '#94a3b8' : '#64748b',
              margin: '0 0 12px 0'
            }}>
              {new Date(stage.timestamp).toLocaleString()}
            </p>
            {stage.details && (
              <div style={{
                background: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '13px'
              }}>
                <pre style={{ 
                  fontFamily: 'inherit',
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                  color: theme === 'dark' ? '#e2e8f0' : '#374151'
                }}>
                  {JSON.stringify(stage.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Finding Details: {finding.findingId}</h2>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            ✕
          </button>
        </div>

        <div style={tabsStyle}>
          <button 
            style={tabStyle(activeTab === 'details')}
            onClick={() => setActiveTab('details')}
          >
            Finding Details
          </button>
          <button 
            style={tabStyle(activeTab === 'analysis')}
            onClick={() => setActiveTab('analysis')}
          >
            Analysis Report
          </button>
          <button 
            style={tabStyle(activeTab === 'timeline')}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline & Stages
          </button>
        </div>

        <div style={contentStyle}>
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'analysis' && renderAnalysisTab()}
          {activeTab === 'timeline' && renderTimelineTab()}
        </div>
      </div>
    </div>
  );
};
