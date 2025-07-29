import React from 'react';
import { AlertTriangle, CheckCircle, Info, Clock, Shield, Zap } from 'lucide-react';
import { AnalysisReport } from '../../types/xray';

interface AnalysisReportViewProps {
  report: AnalysisReport;
}

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({ report }) => {
  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) return '#10B981';
    if (status >= 400 && status < 500) return '#F59E0B';
    if (status >= 500) return '#EF4444';
    return 'hsl(var(--muted-foreground))';
  };

  const getMethodColor = (method: string): string => {
    switch (method) {
      case 'GET': return '#10B981';
      case 'POST': return '#3B82F6';
      case 'PUT': return '#F59E0B';
      case 'DELETE': return '#EF4444';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getSecurityIconColor = (level: string): string => {
    switch (level) {
      case 'safe': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'danger': return '#EF4444';
      default: return 'hsl(var(--muted-foreground))';
    }
  };

  const getSecurityScoreColor = (score: number): string => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    height: '100%',
    overflow: 'auto'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
    borderBottom: '1px solid hsl(var(--border))',
    paddingBottom: '24px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    marginBottom: '16px'
  };

  const summaryGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  };

  const summaryCardStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    padding: '16px'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '16px'
  };

  const badgeStyle = (color: string): React.CSSProperties => ({
    backgroundColor: color,
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase'
  });

  const codeStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '13px',
    backgroundColor: 'hsl(var(--muted))',
    padding: '12px',
    borderRadius: '6px',
    overflow: 'auto',
    whiteSpace: 'pre-wrap'
  };

  const issueCardStyle = (type: string): React.CSSProperties => ({
    backgroundColor: 'hsl(var(--card))',
    border: `1px solid ${type === 'critical' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6'}`,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px'
  });

  const fieldCardStyle = (securityLevel: string): React.CSSProperties => ({
    backgroundColor: 'hsl(var(--card))',
    border: `1px solid ${getSecurityIconColor(securityLevel)}`,
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '8px'
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Analysis Report</h1>
        <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '14px' }}>
          Generated on {report.timestamp}
        </p>
      </div>

      {/* Summary Cards */}
      <div style={summaryGridStyle}>
        <div style={summaryCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={badgeStyle(getMethodColor(report.method))}>{report.method}</span>
            <span style={badgeStyle(getStatusColor(report.status))}>{report.status}</span>
          </div>
          <div style={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>{report.url}</div>
        </div>
        
        <div style={summaryCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Clock size={16} />
            <span style={{ fontWeight: '600' }}>Response Time</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: 'hsl(var(--foreground))' }}>
            {report.responseTime}ms
          </div>
        </div>
        
        <div style={summaryCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Shield size={16} />
            <span style={{ fontWeight: '600' }}>Security Score</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: getSecurityScoreColor(report.securityScore) }}>
            {report.securityScore}/100
          </div>
        </div>
        
        <div style={summaryCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Zap size={16} />
            <span style={{ fontWeight: '600' }}>Performance</span>
          </div>
          <div style={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>
            {report.performanceIssues.length === 0 ? 'Good' : `${report.performanceIssues.length} Issues`}
          </div>
        </div>
      </div>

      {/* cURL Command */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>cURL Command</h2>
        <div style={cardStyle}>
          <pre style={codeStyle}>{report.curlCommand}</pre>
        </div>
      </div>

      {/* Security Issues */}
      {report.securityIssues.length > 0 && (
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            <Shield size={20} />
            Security Assessment
          </h2>
          {report.securityIssues.map((issue, index) => (
            <div key={index} style={issueCardStyle(issue.type)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {issue.type === 'critical' ? (
                  <AlertTriangle size={16} color="#EF4444" />
                ) : issue.type === 'warning' ? (
                  <AlertTriangle size={16} color="#F59E0B" />
                ) : (
                  <Info size={16} color="#3B82F6" />
                )}
                <span style={{ fontWeight: '600', fontSize: '14px' }}>{issue.title}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))', marginBottom: '8px' }}>
                {issue.description}
              </p>
              <p style={{ fontSize: '13px', color: 'hsl(var(--foreground))', fontWeight: '500' }}>
                <strong>Recommendation:</strong> {issue.recommendation}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Performance Analysis */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          <Zap size={20} />
          Performance Analysis
        </h2>
        <div style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}>
                Response Time
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>{report.performanceMetrics.responseTime}ms</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}>
                Content Length
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>{report.performanceMetrics.contentLength} bytes</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}>
                Cacheability
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>
                {report.performanceMetrics.cacheability}
              </div>
            </div>
          </div>
          {report.performanceIssues.length > 0 && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Issues:</div>
              <ul style={{ fontSize: '13px', color: 'hsl(var(--muted-foreground))', margin: 0, paddingLeft: '20px' }}>
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
          {report.fields.map((field, index) => (
            <div key={index} style={fieldCardStyle(field.securityLevel)}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '600', fontSize: '14px' }}>{field.name}</span>
                  <span style={{ 
                    fontSize: '11px', 
                    backgroundColor: 'hsl(var(--muted))', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    {field.type}
                  </span>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getSecurityIconColor(field.securityLevel) }} />
              </div>
              <div style={{ fontSize: '13px', fontFamily: 'monospace', color: 'hsl(var(--muted-foreground))', marginBottom: '8px' }}>
                {field.value}
              </div>
              {field.issues.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#EF4444', marginBottom: '4px' }}>Issues:</div>
                  <ul style={{ fontSize: '12px', color: '#EF4444', margin: 0, paddingLeft: '16px' }}>
                    {field.issues.map((issue, issueIndex) => (
                      <li key={issueIndex}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {field.recommendations.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}>Recommendations:</div>
                  <ul style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', margin: 0, paddingLeft: '16px' }}>
                    {field.recommendations.map((rec, recIndex) => (
                      <li key={recIndex}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Request/Response Details */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Request Details</h2>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Headers</h3>
          <pre style={codeStyle}>{JSON.stringify(report.requestHeaders, null, 2)}</pre>
          {report.requestBody && (
            <>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}>Body</h3>
              <pre style={codeStyle}>{report.requestBody}</pre>
            </>
          )}
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Response Details</h2>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Headers</h3>
          <pre style={codeStyle}>{JSON.stringify(report.responseHeaders, null, 2)}</pre>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginTop: '16px', marginBottom: '8px' }}>Body</h3>
          <pre style={codeStyle}>{report.responseBody}</pre>
        </div>
      </div>
    </div>
  );
};