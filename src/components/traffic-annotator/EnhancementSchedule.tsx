
import React from 'react';

interface ParsedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

interface Enhancement {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  governanceSchedule: string;
  affectedFieldTypes: string[];
  compliance: string;
  owner: string;
  estimatedEffort: string;
}

interface EnhancementScheduleProps {
  parsedRequest: ParsedRequest | null;
}

export const EnhancementSchedule: React.FC<EnhancementScheduleProps> = ({ parsedRequest }) => {
  const generateApiEnhancements = (): Enhancement[] => {
    return [
      {
        id: 'enc_001',
        title: 'PII Encryption at Rest',
        description: 'Encrypt all PII fields in request/response bodies',
        priority: 'High',
        status: 'Pending Implementation',
        governanceSchedule: '2025-03-15T09:00:00Z',
        affectedFieldTypes: ['Request Body', 'Response Body'],
        compliance: 'GDPR Article 32',
        owner: 'Security Team',
        estimatedEffort: '3 weeks'
      },
      {
        id: 'enc_002', 
        title: 'Header Sanitization',
        description: 'Remove sensitive information from request headers in logs',
        priority: 'Medium',
        status: 'In Review',
        governanceSchedule: '2025-02-28T17:00:00Z',
        affectedFieldTypes: ['Request Headers'],
        compliance: 'SOC 2 Type II',
        owner: 'Infrastructure Team',
        estimatedEffort: '1 week'
      },
      {
        id: 'enc_003',
        title: 'Cookie Security Hardening',
        description: 'Implement SameSite=Strict and Secure flags for all cookies',
        priority: 'Medium',
        status: 'Approved',
        governanceSchedule: '2025-02-15T12:00:00Z',
        affectedFieldTypes: ['Response Cookies'],
        compliance: 'OWASP Security Guidelines',
        owner: 'Backend Team',
        estimatedEffort: '2 days'
      }
    ];
  };

  const getEnhancementStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' };
      case 'In Review': return { bg: '#fefce8', text: '#a16207', border: '#fde68a' };
      case 'Pending Implementation': return { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' };
      case 'Overdue': return { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' };
      default: return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return { bg: '#fef2f2', text: '#991b1b' };
      case 'Medium': return { bg: '#fefce8', text: '#a16207' };
      case 'Low': return { bg: '#f0fdf4', text: '#166534' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const formatGovernanceDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isOverdue = date < now;
    const daysDiff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    if (isOverdue) {
      return { date: formatted, suffix: '(Overdue)', color: '#dc2626' };
    } else if (daysDiff <= 7) {
      return { date: formatted, suffix: `(${daysDiff} days)`, color: '#ea580c' };
    } else if (daysDiff <= 30) {
      return { date: formatted, suffix: `(${daysDiff} days)`, color: '#ca8a04' };
    } else {
      return { date: formatted, suffix: '', color: '#6b7280' };
    }
  };

  const enhancements = generateApiEnhancements();

  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #faf5ff, #eff6ff)',
    border: '1px solid #e9d5ff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  };

  const badgeStyle: React.CSSProperties = {
    backgroundColor: '#a855f7',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '14px',
    fontWeight: '500'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '16px'
  };

  const enhancementCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    padding: '16px',
    transition: 'box-shadow 0.2s'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <span style={{ fontSize: '24px' }}>🔧</span>
        <h3 style={titleStyle}>API Enhancement Schedule</h3>
        <span style={badgeStyle}>
          {enhancements.length} enhancement{enhancements.length > 1 ? 's' : ''}
        </span>
      </div>
      
      <div style={gridStyle}>
        {enhancements.map((enhancement) => {
          const dateInfo = formatGovernanceDate(enhancement.governanceSchedule);
          const statusColors = getEnhancementStatusColor(enhancement.status);
          const priorityColors = getPriorityColor(enhancement.priority);
          
          return (
            <div key={enhancement.id} style={enhancementCardStyle}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                    {enhancement.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    {enhancement.description}
                  </p>
                </div>
                <span style={{
                  backgroundColor: priorityColors.bg,
                  color: priorityColors.text,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {enhancement.priority}
                </span>
              </div>
              
              <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Status:</span>
                  <span style={{
                    backgroundColor: statusColors.bg,
                    color: statusColors.text,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    border: `1px solid ${statusColors.border}`
                  }}>
                    {enhancement.status}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Target Date:</span>
                  <span style={{ fontWeight: '500', color: dateInfo.color }}>
                    {dateInfo.date} {dateInfo.suffix}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Owner:</span>
                  <span style={{ fontWeight: '500', color: '#111827' }}>{enhancement.owner}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Effort:</span>
                  <span style={{ color: '#111827' }}>{enhancement.estimatedEffort}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Affects:</span>
                  <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500' }}>
                    {enhancement.compliance}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {enhancement.affectedFieldTypes.map((fieldType) => (
                    <span
                      key={fieldType}
                      style={{
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {fieldType}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
