
import React from 'react';
import { sharedStyles } from '../components/shared/styles';
import { TrafficHighlighterHeader } from '../components/traffic-highlighter/TrafficHighlighterHeader';
import { CurlAnalysisPanel } from '../components/traffic-highlighter/CurlAnalysisPanel';

export const TrafficHighlighterPage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const contentContainerStyle: React.CSSProperties = {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '24px',
    height: 'calc(100vh - 80px - 48px)',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={containerStyle}>
      <TrafficHighlighterHeader />
      
      <div style={contentContainerStyle}>
        <CurlAnalysisPanel />
      </div>

      <style>{`
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          borderRadius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          borderRadius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};
