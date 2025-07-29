
import React, { useState } from 'react';
import { TrafficAnnotatorHeader } from '../components/traffic-annotator/TrafficAnnotatorHeader';
import { ResponseDisplayPanel } from '../components/traffic-annotator/ResponseDisplayPanel';
import { FieldAnalysisSection } from '../components/traffic-annotator/FieldAnalysisSection';
import { XRaySidebar } from '../components/traffic-annotator/XRaySidebar';
import { NewScanView } from '../components/traffic-annotator/views/NewScanView';
import { SearchHistoryView } from '../components/traffic-annotator/views/SearchHistoryView';
import { FoldersView } from '../components/traffic-annotator/views/FoldersView';

interface ParsedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

interface MockResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

export const TrafficAnnotatorPage: React.FC = () => {
  const [curlInput, setCurlInput] = useState('');
  const [parsedRequest, setParsedRequest] = useState<ParsedRequest | null>(null);
  const [response, setResponse] = useState<MockResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<'new-scan' | 'search-history' | 'folders'>('new-scan');

  const handleLoadCurl = (curl: string) => {
    setCurlInput(curl);
    setParsedRequest(null);
    setResponse(null);
    setError(null);
    if (activeView !== 'new-scan') {
      setActiveView('new-scan');
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'hsl(var(--background))'
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: activeView === 'new-scan' ? '0' : '0'
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'search-history':
        return <SearchHistoryView onLoadCurl={handleLoadCurl} />;
      case 'folders':
        return <FoldersView onLoadCurl={handleLoadCurl} />;
      default:
        return (
          <div style={{ padding: '24px' }}>
            <NewScanView
              curlInput={curlInput}
              setCurlInput={setCurlInput}
              parsedRequest={parsedRequest}
              setParsedRequest={setParsedRequest}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              setResponse={setResponse}
            />
            {response && (
              <div style={{ marginTop: '32px' }}>
                <ResponseDisplayPanel response={response} />
                <div style={{ marginTop: '32px' }}>
                  <FieldAnalysisSection 
                    parsedRequest={parsedRequest}
                    response={response}
                    curlInput={curlInput}
                  />
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div style={containerStyle}>
      <XRaySidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeView={activeView}
        onViewChange={setActiveView}
        onLoadCurl={handleLoadCurl}
      />
      
      <div style={mainContentStyle}>
        <TrafficAnnotatorHeader />
        <div style={contentAreaStyle}>
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};
