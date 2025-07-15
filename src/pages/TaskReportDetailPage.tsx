import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Upload, FileText, Database, Clock, Eye, Maximize, Settings } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';
import { mockReports } from '../components/mockData';
import { sharedStyles } from '../components/shared/styles';
import { useDownload } from '../hooks/useDownload';
import { RunHistoryDropdown } from '../components/RunHistoryDropdown';
import { MetadataEditMode } from '../components/TaskLogsSidebar/MetadataEditMode';
export const TaskReportDetailPage: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    theme
  } = useTheme();
  const {
    downloadProgress,
    startDownload
  } = useDownload();
  const task = mockReports.find(report => report.id === id);
  if (!task) {
    return <div style={{
      padding: '2rem',
      textAlign: 'center',
      color: '#6b7280'
    }}>
        Task not found
      </div>;
  }

  // Generate runs from versions for dropdown - fix type compatibility
  const runs = task.versions.map((version, index) => ({
    timestamp: index === 0 ? '2h ago' : index === 1 ? '1w ago' : index === 2 ? '2w ago' : index === 3 ? '3w ago' : '1mo ago',
    status: (version.status === 'completed' ? 'completed' : version.status === 'error' ? 'error' : 'completed') as 'completed' | 'running' | 'error' | 'queued',
    duration: ['45s', '52s', '12s', '48s', '41s'][index] || '45s',
    error: version.status === 'error' ? 'Data connection timeout' : undefined
  })) || [{
    timestamp: '2h ago',
    status: 'completed' as const,
    duration: '45s'
  }, {
    timestamp: '1w ago',
    status: 'completed' as const,
    duration: '52s'
  }, {
    timestamp: '2w ago',
    status: 'error' as const,
    duration: '12s',
    error: 'Data connection timeout'
  }, {
    timestamp: '3w ago',
    status: 'completed' as const,
    duration: '48s'
  }, {
    timestamp: '1mo ago',
    status: 'completed' as const,
    duration: '41s'
  }];
  const getAnalysisTypeDisplay = (analysisType: string) => {
    const typeConfig = {
      'Security Assessment': {
        icon: Settings,
        color: '#4F46E5'
      },
      'Performance Analysis': {
        icon: Database,
        color: '#059669'
      },
      'Compliance Review': {
        icon: Eye,
        color: '#D97706'
      }
    };
    const config = typeConfig[analysisType] || typeConfig['Security Assessment'];
    const Icon = config.icon;
    return <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
        <Icon size={16} style={{
        color: config.color
      }} />
        <span>{analysisType}</span>
      </div>;
  };
  const formatTimeRange = (timeRange: string | {
    start: Date;
    end: Date;
  } | undefined) => {
    if (!timeRange) return 'Not specified';
    if (typeof timeRange === 'string') return timeRange;
    if (typeof timeRange === 'object' && timeRange.start && timeRange.end) {
      return `${formatTimestamp(timeRange.start)} - ${formatTimestamp(timeRange.end)}`;
    }
    return 'Not specified';
  };

  // Transform metadata to match MetadataEditMode format
  const transformedMetadata = task.taskCreation?.metadata || [{
    id: '1',
    category: 'priority',
    key: 'high',
    value: 'Critical security assessment required'
  }, {
    id: '2',
    category: 'type',
    key: 'security',
    value: 'Network infrastructure analysis'
  }, {
    id: '3',
    category: 'team',
    key: 'security',
    value: 'Security Operations Team'
  }];
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

  // Secondary button style (matching ReportCard)
  const secondaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    color: '#6B7280',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  // Primary button style (matching ReportCard)
  const primaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#4F46E5',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
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

  // Updated info style for single line display
  const infoLineStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginTop: '16px',
    flexWrap: 'wrap'
  };
  const infoItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
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
  const calculateDuration = () => {
    // Mock duration calculation
    return '2h 34m';
  };
  const handleExport = () => {
    startDownload(task.title, task.id);
  };
  const handleFullScreen = () => {
    // Mock full screen functionality
    console.log('Full screen PDF viewer');
  };
  return <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <div style={breadcrumbStyle}>
            <span onClick={() => navigate('/')} style={{
            cursor: 'pointer'
          }}>Home</span>
            <span>•</span>
            <span>Report Details</span>
          </div>
          <h1 style={titleStyle}>{task.title}</h1>
        </div>
        <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
          <button style={secondaryButtonStyle} onClick={() => navigate('/')} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            <ArrowLeft size={16} />
            Back to Tasks
          </button>
          
          <RunHistoryDropdown runs={runs} latestRun="2h ago" />

          <button style={primaryButtonStyle} onClick={handleExport} disabled={downloadProgress.isDownloading} onMouseEnter={e => !downloadProgress.isDownloading && (e.currentTarget.style.backgroundColor = '#4338CA')} onMouseLeave={e => !downloadProgress.isDownloading && (e.currentTarget.style.backgroundColor = '#4F46E5')}>
            <Download size={16} />
            {downloadProgress.isDownloading ? 'Exporting...' : 'Export Report'}
          </button>
        </div>
      </div>

      <div style={contentStyle}>
        {/* Task Information Section - Updated to single line */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Clock size={20} />
            <h2 style={sectionTitleStyle}>Task Information</h2>
          </div>
          <div style={infoLineStyle}>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Owner</div>
              <div style={sharedStyles.value}>{task.pointOfContact.name}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Operator</div>
              <div style={sharedStyles.value}>{task.pointOfContact.name}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Status</div>
              <div style={sharedStyles.value}>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Created</div>
              <div style={sharedStyles.value}>{formatTimestamp(task.createdAt)}</div>
            </div>
            <div style={infoItemStyle}>
              <div style={sharedStyles.label}>Duration</div>
              <div style={sharedStyles.value}>{calculateDuration()}</div>
            </div>
          </div>
        </div>

        {/* Submitted Content Section */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <Upload size={20} />
            <h2 style={sectionTitleStyle}>Submitted Content</h2>
          </div>
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginTop: '16px'
        }}>
            <div>
              <div style={sharedStyles.label}>Goal</div>
              <div style={{
              ...sharedStyles.value,
              color: '#4b5563',
              lineHeight: '1.6',
              marginTop: '4px'
            }}>
                {task.taskCreation?.goal || 'Analyze security vulnerabilities and provide comprehensive risk assessment for the network infrastructure.'}
              </div>
            </div>
            <div>
              <div style={sharedStyles.label}>Analysis Type</div>
              <div style={{
              ...sharedStyles.value,
              marginTop: '4px'
            }}>
                {getAnalysisTypeDisplay(task.taskCreation?.analysisType || 'Security Assessment')}
              </div>
            </div>
            <div>
              <div style={sharedStyles.label}>Background</div>
              <div style={{
              ...sharedStyles.value,
              color: '#4b5563',
              lineHeight: '1.6',
              marginTop: '4px'
            }}>
                {task.taskCreation?.background || 'Regular security assessment to identify potential vulnerabilities and ensure compliance with security standards. This analysis covers network infrastructure, access controls, and data protection mechanisms.'}
              </div>
            </div>
            <div>
              <div style={sharedStyles.label}>Time Range</div>
              <div style={{
              ...sharedStyles.value,
              marginTop: '4px'
            }}>
                {formatTimeRange(task.taskCreation?.timeRange)}
              </div>
            </div>
            <div>
              
              <div style={{
              marginTop: '8px'
            }}>
                <MetadataEditMode metadata={transformedMetadata} onChange={() => {}} // Read-only mode
              disabled={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Report Section */}
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <FileText size={20} />
            <h2 style={sectionTitleStyle}>Report</h2>
          </div>
          <div style={pdfContainerStyle}>
            <div style={pdfHeaderStyle}>
              <div style={sharedStyles.value}>Report Preview</div>
              <button style={secondaryButtonStyle} onClick={handleFullScreen} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <Maximize size={16} />
                Full Screen
              </button>
            </div>
            <iframe src="/placeholder-report.pdf" style={pdfViewerStyle} title="Task Report PDF" />
          </div>
        </div>

        {/* Support Evidences Section */}
        <div style={{
        marginBottom: '32px'
      }}>
          <div style={sectionHeaderStyle}>
            <Database size={20} />
            <h2 style={sectionTitleStyle}>Supporting Evidences</h2>
          </div>
          {task.supportEvidences.length > 0 ? <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>File Name</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Generated</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {task.supportEvidences.map(evidence => <tr key={evidence.id}>
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
                  </tr>)}
              </tbody>
            </table> : <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: '#6b7280',
          backgroundColor: '#f9fafb',
          border: '1px solid #e2e8f0',
          borderRadius: '8px'
        }}>
              <Database size={48} style={{
            margin: '0 auto 16px',
            opacity: 0.5
          }} />
              <p>No supporting evidences generated yet.</p>
            </div>}
        </div>
      </div>
    </div>;
};