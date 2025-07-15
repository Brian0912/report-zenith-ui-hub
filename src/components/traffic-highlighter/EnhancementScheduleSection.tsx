
import React from 'react';
import { Wrench } from 'lucide-react';
import { sharedStyles } from '../shared/styles';
import { Enhancement } from './CurlAnalysisPanel';

interface EnhancementScheduleSectionProps {
  apiEnhancements: Enhancement[];
}

export const EnhancementScheduleSection: React.FC<EnhancementScheduleSectionProps> = ({
  apiEnhancements
}) => {
  const containerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  };

  const titleStyle: React.CSSProperties = {
    ...sharedStyles.subheading,
    margin: 0
  };

  const countBadgeStyle: React.CSSProperties = {
    backgroundColor: '#8b5cf6',
    color: '#ffffff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '16px'
  };

  const enhancementCardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '16px',
    transition: 'box-shadow 0.2s ease'
  };

  const getPriorityColor = (priority: string): React.CSSProperties => {
    const colors: Record<string, { bg: string; text: string }> = {
      'High': { bg: '#fef2f2', text: '#dc2626' },
      'Medium': { bg: '#fefbf2', text: '#d97706' },
      'Low': { bg: '#f0fdf4', text: '#059669' }
    };
    const color = colors[priority] || { bg: '#f3f4f6', text: '#6b7280' };
    return {
      backgroundColor: color.bg,
      color: color.text,
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600'
    };
  };

  const getStatusColor = (status: string): React.CSSProperties => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      'Approved': { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
      'In Review': { bg: '#fefbf2', text: '#9a3412', border: '#fed7aa' },
      'Pending Implementation': { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' },
      'Overdue': { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' }
    };
    const color = colors[status] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
    return {
      backgroundColor: color.bg,
      color: color.text,
      border: `1px solid ${color.border}`,
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600'
    };
  };

  const formatGovernanceDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isOverdue = date < now;
    const daysDiff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    if (isOverdue) {
      return { date: formatted, suffix: '(Overdue)', color: '#dc2626' };
    } else if (daysDiff <= 7) {
      return { date: formatted, suffix: `(${daysDiff} days)`, color: '#d97706' };
    } else if (daysDiff <= 30) {
      return { date: formatted, suffix: `(${daysDiff} days)`, color: '#d97706' };
    } else {
      return { date: formatted, suffix: '', color: '#6b7280' };
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <Wrench size={20} style={{ color: '#8b5cf6' }} />
        <h3 style={titleStyle}>API Enhancement Schedule</h3>
        <span style={countBadgeStyle}>
          {apiEnhancements.length} enhancement{apiEnhancements.length > 1 ? 's' : ''}
        </span>
      </div>
      
      <div style={gridStyle}>
        {apiEnhancements.map((enhancement) => {
          const dateInfo = formatGovernanceDate(enhancement.governanceSchedule);
          return (
            <div 
              key={enhancement.id} 
              style={enhancementCardStyle}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', margin: '0 0 4px 0' }}>
                    {enhancement.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.5' }}>
                    {enhancement.description}
                  </p>
                </div>
                <span style={getPriorityColor(enhancement.priority)}>
                  {enhancement.priority}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Status:</span>
                  <span style={getStatusColor(enhancement.status)}>
                    {enhancement.status}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Target Date:</span>
                  <span style={{ fontWeight: '600', color: dateInfo.color }}>
                    {dateInfo.date} {dateInfo.suffix}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Owner:</span>
                  <span style={{ fontWeight: '600', color: '#1a202c' }}>{enhancement.owner}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280' }}>Effort:</span>
                  <span style={{ color: '#1a202c' }}>{enhancement.estimatedEffort}</span>
                </div>
              </div>
              
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>Affects:</span>
                  <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '600' }}>{enhancement.compliance}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {enhancement.affectedFieldTypes.map((fieldType) => (
                    <span 
                      key={fieldType}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#eff6ff',
                        color: '#1e40af',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
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
