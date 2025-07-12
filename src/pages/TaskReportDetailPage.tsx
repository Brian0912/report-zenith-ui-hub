
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Database, Eye, ChevronDown } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { mockReports } from '../components/mockData';
import { sharedStyles } from '../components/shared/styles';

export const TaskReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedVersion, setSelectedVersion] = useState('');
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const task = mockReports.find(report => report.id === id);

  if (!task) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: '#6b7280'
      }}>
        Task not found
      </div>
    );
  }

  const currentVersion = selectedVersion 
    ? task.versions.find(v => v.id === selectedVersion) 
    : task.versions[task.versions.length - 1];

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    color: '#1a202c'
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: '24px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const breadcrumbStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const titleStyle: React.CSSProperties = {
    ...sharedStyles.heading,
    marginBottom: '0'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f0f9ff',
    color: '#0369a1',
    border: '1px solid #0369a1'
  };

  const selectStyle: React.CSSProperties = {
    padding: '8px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    color: '#1a202c',
    fontSize: '14px',
    fontWeight: '500'
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e2e8f0'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    ...sharedStyles.heading,
    marginBottom: '0'
  };

  const infoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginTop: '16px'
  };

  const infoItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const contentSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '16px'
  };

  const contentItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const contentTitleStyle: React.CSSProperties = {
    ...sharedStyles.subheading,
    marginBottom: '0'
  };

  const contentTextStyle: React.CSSProperties = {
    ...sharedStyles.value,
    color: '#4b5563',
    lineHeight: '1.6'
  };

  const metadataContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px'
  };

  const metadataBadgeStyle: React.CSSProperties = {
    ...sharedStyles.badge,
    backgroundColor: '#f0f9ff',
    color: '#0369a1',
    border: '1px solid #bae6fd'
  };

  const pdfContainerStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const pdfHeaderStyle: React.CSSProperties = {
    padding: '16px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const pdfViewerStyle: React.CSSProperties = {
    width: '100%',
    height: '600px',
    border: 'none'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const thStyle: React.CSSProperties = {
    ...sharedStyles.label,
    padding: '12px 16px',
    textAlign: 'left' as const,
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f9fafb'
  };

  const tdStyle: React.CSSProperties = {
    ...sharedStyles.value,
    padding: '12px 16px',
    borderBottom: '1px solid #f3f4f6'
  };

  const emptyStateStyle: React.CSSProperties = {
    padding: '48px 24px',
    textAlign: 'center',
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    border: '1px solid #e2e8f0',
    borderRadius: '8px'
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

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <div style={breadcrumbStyle}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span>•</span>
            <span>Task Report Details</span>
          </div>
          <h1 style={titleStyle}>{task.title}</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            style={selectStyle}
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            {task.versions.map(version => (
              <option key={version.id} value={version.id}>
                Version {version.version}
              </option>
            ))}
          </select>
          <button 
            style={buttonStyle} 
            onClick={() => navigate('/')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <ArrowLeft size={16} />
            Back to Tasks
          </button>
          <button 
            style={primaryButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div style={contentStyle}>
        {/* Task Information Section */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Task Information</h2>
          </div>
          <div style={infoGridStyle}>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Owner</div>
              <div style={sharedStyles.value}>{task.pointOfContact.name}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Status</div>
              <div style={sharedStyles.value}>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Version</div>
              <div style={sharedStyles.value}>{currentVersion?.version}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Progress</div>
              <div style={sharedStyles.value}>{task.progress}%</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Created</div>
              <div style={sharedStyles.value}>{formatTimestamp(task.createdAt)}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Last Updated</div>
              <div style={sharedStyles.value}>{formatTimestamp(task.schedule.lastRun)}</div>
            </div>
          </div>
        </div>

        {/* Submitted Content Section */}
        {currentVersion && (
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <FileText size={20} />
              <h2 style={sectionTitleStyle}>Submitted Content (Version {currentVersion.version})</h2>
            </div>
            <div style={contentSectionStyle}>
              <div style={contentItemStyle}>
                <h3 style={contentTitleStyle}>Goal</h3>
                <p style={contentTextStyle}>{currentVersion.goal}</p>
              </div>
              <div style={contentItemStyle}>
                <h3 style={contentTitleStyle}>Background</h3>
                <p style={contentTextStyle}>{currentVersion.background}</p>
              </div>
              <div style={contentItemStyle}>
                <h3 style={contentTitleStyle}>Metadata</h3>
                <div style={metadataContainerStyle}>
                  {currentVersion.metadata && Object.entries(currentVersion.metadata).map(([key, values]) => (
                    <div key={key} style={metadataBadgeStyle}>
                      <strong>{key}:</strong> {Array.isArray(values) ? values.join(', ') : String(values)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PDF Report Section */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <FileText size={20} />
            <h2 style={sectionTitleStyle}>Generated Report (Version {currentVersion?.version})</h2>
          </div>
          <div style={pdfContainerStyle}>
            <div style={pdfHeaderStyle}>
              <div style={sharedStyles.value}>Report Preview</div>
              <button 
                style={buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Eye size={16} />
                Full Screen
              </button>
            </div>
            {currentVersion?.reportUrl ? (
              <iframe
                src="/placeholder-report.pdf"
                style={pdfViewerStyle}
                title="Task Report PDF"
              />
            ) : (
              <div style={emptyStateStyle}>
                <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>Report is being generated for this version...</p>
              </div>
            )}
          </div>
        </div>

        {/* Support Evidences Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={sectionHeaderStyle}>
            <Database size={20} />
            <h2 style={sectionTitleStyle}>Support Evidences (Version {currentVersion?.version})</h2>
          </div>
          {task.supportEvidences.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>File Name</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Generated</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {task.supportEvidences.map(evidence => (
                  <tr key={evidence.id}>
                    <td style={tdStyle}>{evidence.filename}</td>
                    <td style={tdStyle}>{formatFileSize(evidence.size)}</td>
                    <td style={tdStyle}>{formatTimestamp(evidence.generatedAt)}</td>
                    <td style={tdStyle}>
                      <button style={{
                        padding: '6px 12px',
                        backgroundColor: '#f0f9ff',
                        border: '1px solid #0369a1',
                        borderRadius: '4px',
                        color: '#0369a1',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={emptyStateStyle}>
              <Database size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p>No support evidences generated for this version yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
