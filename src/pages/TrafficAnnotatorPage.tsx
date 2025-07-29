
import React, { useState } from 'react';
import { TrafficAnnotatorHeader } from '../components/traffic-annotator/TrafficAnnotatorHeader';
import { CurlInputPanel } from '../components/traffic-annotator/CurlInputPanel';
import { ResponseDisplayPanel } from '../components/traffic-annotator/ResponseDisplayPanel';
import { FieldAnalysisSection } from '../components/traffic-annotator/FieldAnalysisSection';
import { RequestHistory } from '../components/traffic-annotator/RequestHistory';
import { XRaySidebar } from '../components/traffic-annotator/XRaySidebar';
import { SearchHistoryView } from '../components/traffic-annotator/SearchHistoryView';
import { AnalysisReportView } from '../components/traffic-annotator/AnalysisReportView';

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

interface XRayItem {
  id: string;
  title: string;
  method: string;
  url: string;
  timestamp: Date;
  isStarred: boolean;
}

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

type ViewMode = 'new-scan' | 'search-history' | 'analysis-report';

export const TrafficAnnotatorPage: React.FC = () => {
  const [curlInput, setCurlInput] = useState('');
  const [parsedRequest, setParsedRequest] = useState<ParsedRequest | null>(null);
  const [response, setResponse] = useState<MockResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('new-scan');
  const [currentReport, setCurrentReport] = useState<AnalysisReportData | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [starredItems, setStarredItems] = useState<Set<string>>(new Set());

  // Mock data generation for reports
  const generateMockReport = (item: XRayItem | any): AnalysisReportData => {
    return {
      id: item.id || 'mock-report',
      title: item.title || 'API Analysis Report',
      method: item.method || 'GET',
      url: item.url || '/api/test',
      status: item.status || 200,
      responseTime: Math.floor(Math.random() * 500) + 100,
      timestamp: item.timestamp || new Date(),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx',
        'User-Agent': 'XRay-Analyzer/1.0',
        'Accept': 'application/json'
      },
      requestBody: item.method === 'POST' ? '{"username": "test", "password": "***"}' : undefined,
      responseBody: '{"success": true, "data": {"id": 123, "name": "Test User"}}',
      securityFindings: [
        'Missing HTTPS enforcement',
        'Potential sensitive data in logs',
        'Rate limiting not detected'
      ],
      performanceSuggestions: [
        'Consider implementing response caching',
        'Optimize payload size',
        'Enable gzip compression'
      ]
    };
  };

  const handleNewScan = () => {
    setViewMode('new-scan');
    setCurrentReport(null);
  };

  const handleSearchHistory = () => {
    setViewMode('search-history');
    setCurrentReport(null);
  };

  const handleItemClick = (item: XRayItem) => {
    const report = generateMockReport(item);
    setCurrentReport(report);
    setViewMode('analysis-report');
  };

  const handleSearchResultClick = (result: any) => {
    const report = generateMockReport(result);
    setCurrentReport(report);
    setViewMode('analysis-report');
  };

  const handleToggleStar = (itemId: string) => {
    setStarredItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex'
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    marginLeft: sidebarCollapsed ? '60px' : '300px',
    transition: 'margin-left 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  };

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    padding: '32px 24px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%'
  };

  const contentLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px'
  };

  const renderMainContent = () => {
    switch (viewMode) {
      case 'search-history':
        return <SearchHistoryView onResultClick={handleSearchResultClick} />;
      case 'analysis-report':
        return currentReport ? <AnalysisReportView reportData={currentReport} /> : null;
      case 'new-scan':
      default:
        return (
          <div style={contentLayoutStyle}>
            <CurlInputPanel
              curlInput={curlInput}
              setCurlInput={setCurlInput}
              parsedRequest={parsedRequest}
              setParsedRequest={setParsedRequest}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              setResponse={setResponse}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            
            {response && (
              <>
                <ResponseDisplayPanel response={response} />
                <FieldAnalysisSection 
                  parsedRequest={parsedRequest}
                  response={response}
                  curlInput={curlInput}
                />
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div style={containerStyle}>
      <XRaySidebar
        onNewScan={handleNewScan}
        onSearchHistory={handleSearchHistory}
        onItemClick={handleItemClick}
        onToggleStar={handleToggleStar}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div style={mainContentStyle}>
        <TrafficAnnotatorHeader />
        
        <div style={contentAreaStyle}>
          {renderMainContent()}
        </div>
      </div>

      <RequestHistory 
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onLoadCurl={(curl) => {
          setCurlInput(curl);
          setShowHistory(false);
        }}
      />
    </div>
  );
};
