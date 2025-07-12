
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Database, Eye, ChevronDown } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { mockReports } from '../components/mockData';

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
        color: '#374151'
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
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    color: '#334155'
  };

  const headerStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const breadcrumbStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6B7280',
    marginBottom: '1rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const backButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'none',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    color: '#6B7280',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease'
  };

  const exportButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    display: 'grid',
    gap: '2rem'
  };

  const sectionStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const selectStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    color: '#374151',
    fontSize: '0.875rem'
  };

  const infoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    padding: '1.5rem'
  };

  const infoItemStyle: React.CSSProperties = {
    textAlign: 'center' as const
  };

  const infoLabelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: '#6B7280',
    marginBottom: '0.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  const infoValueStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151'
  };

  const pdfViewerStyle: React.CSSProperties = {
    width: '100%',
    height: '600px',
    border: 'none',
    borderRadius: '0 0 16px 16px'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const
  };

  const thStyle: React.CSSProperties = {
    padding: '0.75rem',
    textAlign: 'left' as const,
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6B7280',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.75rem',
    fontSize: '0.875rem',
    color: '#374151',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
          <button style={backButtonStyle} onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Back to Task List
          </button>
          <button style={exportButtonStyle}>
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div style={contentStyle}>
        {/* Task Information Panel */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Task Information</h2>
          </div>
          <div style={infoGridStyle}>
            <div style={infoItemStyle}>
              <div style={infoLabelStyle}>Owner</div>
              <div style={infoValueStyle}>{task.pointOfContact.name}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={infoLabelStyle}>Status</div>
              <div style={infoValueStyle}>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={infoLabelStyle}>Version</div>
              <div style={infoValueStyle}>{currentVersion?.version}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={infoLabelStyle}>Progress</div>
              <div style={infoValueStyle}>{task.progress}%</div>
            </div>
            <div style={infoItemStyle}>
              <div style={infoLabelStyle}>Created</div>
              <div style={infoValueStyle}>{formatTimestamp(task.createdAt)}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={infoLabelStyle}>Last Updated</div>
              <div style={infoValueStyle}>{formatTimestamp(task.schedule.lastRun)}</div>
            </div>
          </div>
        </div>

        {/* Submitted Content Section */}
        {currentVersion && (
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <h2 style={sectionTitleStyle}>
                <FileText size={20} />
                Submitted Content (Version {currentVersion.version})
              </h2>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>Goal</h3>
                <p style={{ color: '#4B5563', lineHeight: '1.6' }}>{currentVersion.goal}</p>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>Background</h3>
                <p style={{ color: '#4B5563', lineHeight: '1.6' }}>{currentVersion.background}</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '0.75rem', color: '#374151' }}>Metadata</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {currentVersion.metadata && Object.entries(currentVersion.metadata).map(([key, values]) => (
                    <div key={key} style={{ 
                      background: 'rgba(59, 130, 246, 0.1)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: '#1D4ED8'
                    }}>
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
            <h2 style={sectionTitleStyle}>
              <FileText size={20} />
              Generated Report (Version {currentVersion?.version})
            </h2>
            <button style={{ ...backButtonStyle, border: 'none' }}>
              <Eye size={16} />
              Full Screen
            </button>
          </div>
          <div style={{ padding: '0' }}>
            {currentVersion?.reportUrl ? (
              <iframe
                src="/placeholder-report.pdf"
                style={pdfViewerStyle}
                title="Task Report PDF"
              />
            ) : (
              <div style={{ 
                padding: '4rem 2rem',
                textAlign: 'center',
                color: '#6B7280'
              }}>
                <FileText size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>Report is being generated for this version...</p>
              </div>
            )}
          </div>
        </div>

        {/* Support Evidences Section */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>
              <Database size={20} />
              Support Evidences (Version {currentVersion?.version})
            </h2>
          </div>
          <div style={{ padding: '0' }}>
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
                          padding: '0.25rem 0.5rem',
                          background: 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
                          border: 'none',
                          borderRadius: '4px',
                          color: 'white',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}>
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ 
                padding: '4rem 2rem',
                textAlign: 'center',
                color: '#6B7280'
              }}>
                <Database size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>No support evidences generated for this version yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
