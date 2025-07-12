
import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface AnalysisTypeSelectorProps {
  selectedType: 'situational' | 'impact' | '';
  onTypeChange: (type: 'situational' | 'impact') => void;
}

export const AnalysisTypeSelector: React.FC<AnalysisTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '16px'
  };

  const optionStyle = (isSelected: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 16px',
    borderRadius: '12px',
    border: isSelected ? '2px solid #10b981' : '2px solid #e5e7eb',
    backgroundColor: isSelected ? '#f0fdf4' : '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  });

  const iconContainerStyle = (isSelected: boolean): React.CSSProperties => ({
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: isSelected ? '#10b981' : '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px'
  });

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '4px'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.4'
  };

  return (
    <div style={containerStyle}>
      <div
        style={optionStyle(selectedType === 'situational')}
        onClick={() => onTypeChange('situational')}
        onMouseEnter={(e) => {
          if (selectedType !== 'situational') {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          if (selectedType !== 'situational') {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }
        }}
      >
        <div style={iconContainerStyle(selectedType === 'situational')}>
          <BarChart3 
            size={24} 
            style={{ color: selectedType === 'situational' ? '#ffffff' : '#6b7280' }} 
          />
        </div>
        <div style={titleStyle}>Situational Analysis</div>
        <div style={descriptionStyle}>
          Analyze current state and context
        </div>
      </div>

      <div
        style={optionStyle(selectedType === 'impact')}
        onClick={() => onTypeChange('impact')}
        onMouseEnter={(e) => {
          if (selectedType !== 'impact') {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          if (selectedType !== 'impact') {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }
        }}
      >
        <div style={iconContainerStyle(selectedType === 'impact')}>
          <TrendingUp 
            size={24} 
            style={{ color: selectedType === 'impact' ? '#ffffff' : '#6b7280' }} 
          />
        </div>
        <div style={titleStyle}>Impact Analysis</div>
        <div style={descriptionStyle}>
          Assess effects and consequences
        </div>
      </div>
    </div>
  );
};
