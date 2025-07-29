import React from 'react';
import { AnalysisReport } from '../../types/xray';

interface AnalysisReportViewProps {
  report: AnalysisReport;
}

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({ report }) => {
  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) return '#10B981';
    if (status >= 400 && status < 500) return '#F59E0B';
    if (status >= 500) return '#EF4444';
    return '#6B7280';
  };

  const getMethodColor = (method: string): string => {
    switch (method) {
      case 'GET': return '#10B981';
      case 'POST': return '#3B82F6';
      case 'PUT': return '#F59E0B';
      case 'DELETE': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSecurityIconColor = (level: string): string => {
    switch (level) {
      case 'safe': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'danger': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSecurityScoreColor = (score: number): string => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: '24px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px'
  };

  const timestampStyle: React.CSSProperties = {
    color: '#6B7280',
    fontSize: '14px'
  };

  const summaryGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '16px'
  };

  const codeStyle: React.CSSProperties = {
    backgroundColor: '#F3F4F6',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '16px',
    fontFamily: 'Monaco, "Courier New", monospace',
    fontSize: '13px',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all'
  };

  const issueCardStyle = (type: string): React.CSSProperties => ({
    backgroundColor: '#FFFFFF',
    border: `1px solid ${type === 'critical' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6'}`,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px'
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Analysis Report</h1>
        <p style={timestampStyle}>Generated on {report.timestamp}</p>
      </div>

      {/* Summary Cards */}
      <div style={summaryGridStyle}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              backgroundColor: getMethodColor(report.method),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {report.method}
            </span>
            <span style={{
              backgroundColor: getStatusColor(report.status),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {report.status}
            </span>
          </div>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>{report.url}</p>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Response Time</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{report.responseTime}ms</p>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Security Score</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: getSecurityScoreColor(report.securityScore) }}>
            {report.securityScore}/100
          </p>
        </div>
        
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '8px' }}>Performance Issues</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
            {report.performanceIssues.length === 0 ? 'None' : report.performanceIssues.length}
          </p>
        </div>
      </div>

      {/* cURL Command */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>cURL Command</h2>
        <div style={codeStyle}>
          {report.curlCommand}
        </div>
      </div>

      {/* Security Issues */}
      {report.securityIssues.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Security Assessment</h2>
          {report.securityIssues.map((issue, index) => (
            <div key={index} style={issueCardStyle(issue.type)}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: issue.type === 'critical' ? '#DC2626' : issue.type === 'warning' ? '#D97706' : '#2563EB'
              }}>
                {issue.title}
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '12px' }}>{issue.description}</p>
              <p style={{ fontSize: '14px', color: '#374151' }}>
                <strong>Recommendation:</strong> {issue.recommendation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Performance Analysis */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Performance Analysis</h2>
        <div style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            <div>
              <h4 style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Response Time</h4>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>{report.performanceMetrics.responseTime}ms</p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Content Length</h4>
              <p style={{ fontSize: '18px', fontWeight: '600' }}>{report.performanceMetrics.contentLength} bytes</p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>Cacheability</h4>
              <p style={{ fontSize: '18px', fontWeight: '600', textTransform: 'capitalize' }}>
                {report.performanceMetrics.cacheability}
              </p>
            </div>
          </div>
          {report.performanceIssues.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Issues:</h4>
              <ul style={{ color: '#6B7280', paddingLeft: '20px' }}>
                {report.performanceIssues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Field Analysis */}
      {report.fields.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Field Analysis</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {report.fields.map((field, index) => (
              <div key={index} style={{
                ...cardStyle,
                borderLeft: `4px solid ${getSecurityIconColor(field.securityLevel)}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600' }}>{field.name}</h3>
                  <span style={{
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    textTransform: 'uppercase'
                  }}>
                    {field.type}
                  </span>
                </div>
                <p style={{ 
                  fontFamily: 'Monaco, "Courier New", monospace',
                  fontSize: '13px',
                  color: '#374151',
                  backgroundColor: '#F9FAFB',
                  padding: '8px',
                  borderRadius: '4px',
                  marginBottom: '12px'
                }}>
                  {field.value}
                </p>
                {field.issues.length > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626', marginBottom: '4px' }}>Issues:</h4>
                    <ul style={{ color: '#DC2626', fontSize: '13px', paddingLeft: '16px' }}>
                      {field.issues.map((issue, issueIndex) => (
                        <li key={issueIndex}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {field.recommendations.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#6B7280', marginBottom: '4px' }}>Recommendations:</h4>
                    <ul style={{ color: '#6B7280', fontSize: '13px', paddingLeft: '16px' }}>
                      {field.recommendations.map((rec, recIndex) => (
                        <li key={recIndex}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Headers */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Request Headers</h2>
        <div style={codeStyle}>
          {JSON.stringify(report.requestHeaders, null, 2)}
        </div>
      </div>

      {/* Request Body */}
      {report.requestBody && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Request Body</h2>
          <div style={codeStyle}>
            {report.requestBody}
          </div>
        </div>
      )}

      {/* Response Headers */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Response Headers</h2>
        <div style={codeStyle}>
          {JSON.stringify(report.responseHeaders, null, 2)}
        </div>
      </div>

      {/* Response Body */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Response Body</h2>
        <div style={codeStyle}>
          {report.responseBody}
        </div>
      </div>
    </div>
  );
};