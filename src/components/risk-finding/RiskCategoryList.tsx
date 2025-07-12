
import React from 'react';
import { useTheme } from '../ThemeProvider';
import { RiskCategory, Finding } from './mockFindingData';
import { FindingCard } from './FindingCard';

interface RiskCategoryListProps {
  riskCategories: RiskCategory[];
  findings: Finding[];
  onFindingClick: (finding: Finding) => void;
}

export const RiskCategoryList: React.FC<RiskCategoryListProps> = ({
  riskCategories,
  findings,
  onFindingClick
}) => {
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const getFindingsForCategory = (categoryId: string) => {
    if (categoryId === 'unassigned') {
      return findings.filter(f => !f.riskCategory || f.status === 'waiting_assignment');
    }
    return findings.filter(f => f.riskCategory === categoryId);
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: '#dc2626',
      high: '#ea580c',
      medium: '#d97706',
      low: '#059669'
    };
    return colors[severity as keyof typeof colors] || '#6b7280';
  };

  return (
    <div style={containerStyle}>
      {riskCategories.map(category => {
        const categoryFindings = getFindingsForCategory(category.id);
        
        if (categoryFindings.length === 0) return null;

        const categoryHeaderStyle: React.CSSProperties = {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px 12px 0 0',
          padding: '16px 24px',
          border: '1px solid #e2e8f0',
          borderBottom: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        };

        const categoryTitleStyle: React.CSSProperties = {
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: 0
        };

        const severityDotStyle: React.CSSProperties = {
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: getSeverityColor(category.severity),
          boxShadow: `0 0 8px ${getSeverityColor(category.severity)}40`
        };

        const categoryNameStyle: React.CSSProperties = {
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b'
        };

        const categoryDescStyle: React.CSSProperties = {
          fontSize: '14px',
          color: '#64748b',
          marginLeft: '24px'
        };

        const findingCountStyle: React.CSSProperties = {
          background: getSeverityColor(category.severity),
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        };

        const findingsContainerStyle: React.CSSProperties = {
          background: 'rgba(248, 250, 252, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #e2e8f0',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          padding: '0'
        };

        return (
          <div key={category.id}>
            <div style={categoryHeaderStyle}>
              <div>
                <div style={categoryTitleStyle}>
                  <div style={severityDotStyle}></div>
                  <h3 style={categoryNameStyle}>{category.name}</h3>
                </div>
                <p style={categoryDescStyle}>{category.description}</p>
              </div>
              <div style={findingCountStyle}>
                {categoryFindings.length} finding{categoryFindings.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div style={findingsContainerStyle}>
              {categoryFindings.map((finding, index) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                  onClick={() => onFindingClick(finding)}
                  isLast={index === categoryFindings.length - 1}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
