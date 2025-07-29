import React from 'react';

interface AnalysisReportData {
  id: string;
  title: string;
  method: string;
  url: string;
  status: number;
  responseTime: number;
  timestamp: Date;
  headers: Record<string, string>;
  requestBody?: string;
  responseBody: string;
  securityFindings: string[];
  performanceSuggestions: string[];
}

interface AnalysisReportViewProps {
  reportData: AnalysisReportData;
}

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({ reportData }) => {
  const containerStyle: React.CSSProperties = {
    padding: '24px',
    maxWidth: '1000px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '24px',
    marginBottom: '24px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px'
  };

  const metadataStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  };

  const metadataItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
    paddingBottom: '8px',
    borderBottom: '2px solid #e2e8f0'
  };

  const codeBlockStyle: React.CSSProperties = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '16px',
    fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '14px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap' as const
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle: React.CSSProperties = {
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: '#f8fafc',
    borderLeft: '4px solid #3b82f6',
    borderRadius: '4px'
  };

  const warningItemStyle: React.CSSProperties = {
    ...listItemStyle,
    borderLeftColor: '#ef4444',
    backgroundColor: '#fef2f2'
  };

  const suggestionItemStyle: React.CSSProperties = {
    ...listItemStyle,
    borderLeftColor: '#10b981',
    backgroundColor: '#f0fdf4'
  };

  const statusBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return { backgroundColor: '#dcfce7', color: '#166534' };
    if (status >= 300 && status < 400) return { backgroundColor: '#fef3c7', color: '#92400e' };
    if (status >= 400) return { backgroundColor: '#fee2e2', color: '#dc2626' };
    return { backgroundColor: '#f3f4f6', color: '#374151' };
  };

  const methodBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff'
  };

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET': return { backgroundColor: '#3b82f6' };
      case 'POST': return { backgroundColor: '#10b981' };
      case 'PUT': return { backgroundColor: '#f59e0b' };
      case 'DELETE': return { backgroundColor: '#ef4444' };
      default: return { backgroundColor: '#6b7280' };
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>{reportData.title}</h1>
        <div style={metadataStyle}>
          <div style={metadataItemStyle}>
            <span style={labelStyle}>Method</span>
            <span style={{ ...methodBadgeStyle, ...getMethodColor(reportData.method) }}>
              {reportData.method}
            </span>
          </div>
          <div style={metadataItemStyle}>
            <span style={labelStyle}>Status</span>
            <span style={{ ...statusBadgeStyle, ...getStatusColor(reportData.status) }}>
              {reportData.status}
            </span>
          </div>
          <div style={metadataItemStyle}>
            <span style={labelStyle}>Response Time</span>
            <span style={valueStyle}>{reportData.responseTime}ms</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={labelStyle}>Timestamp</span>
            <span style={valueStyle}>
              {reportData.timestamp.toLocaleDateString()} {reportData.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div style={metadataItemStyle}>
          <span style={labelStyle}>Endpoint</span>
          <span style={valueStyle}>{reportData.url}</span>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Request Headers</h2>
        <div style={codeBlockStyle}>
          {Object.entries(reportData.headers).map(([key, value]) => (
            <div key={key}>{key}: {value}</div>
          ))}
        </div>
      </div>

      {reportData.requestBody && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Request Body</h2>
          <div style={codeBlockStyle}>
            {reportData.requestBody}
          </div>
        </div>
      )}

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Response Body</h2>
        <div style={codeBlockStyle}>
          {reportData.responseBody}
        </div>
      </div>

      {reportData.securityFindings.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Security Findings</h2>
          <ul style={listStyle}>
            {reportData.securityFindings.map((finding, index) => (
              <li key={index} style={warningItemStyle}>
                <strong>⚠️ Security Warning:</strong> {finding}
              </li>
            ))}
          </ul>
        </div>
      )}

      {reportData.performanceSuggestions.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Performance Suggestions</h2>
          <ul style={listStyle}>
            {reportData.performanceSuggestions.map((suggestion, index) => (
              <li key={index} style={suggestionItemStyle}>
                <strong>💡 Suggestion:</strong> {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};