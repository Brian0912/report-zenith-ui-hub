
import React, { useState } from 'react';
import { TrafficAnnotatorHeader } from '../components/traffic-annotator/TrafficAnnotatorHeader';
import { ResponseDisplayPanel } from '../components/traffic-annotator/ResponseDisplayPanel';
import { FieldAnalysisSection } from '../components/traffic-annotator/FieldAnalysisSection';
import { XRaySidebar } from '../components/traffic-annotator/XRaySidebar';
import { NewScanView } from '../components/traffic-annotator/views/NewScanView';
import { SearchHistoryView } from '../components/traffic-annotator/views/SearchHistoryView';
import { FoldersView } from '../components/traffic-annotator/views/FoldersView';
import { AnalysisReportView } from '../components/traffic-annotator/AnalysisReportView';
import { useXRayState } from '../hooks/useXRayState';
import { AnalysisReport } from '../types/xray';

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
  const [highlightedReportId, setHighlightedReportId] = useState<string | undefined>();

  const {
    state,
    toggleStar,
    setCurrentReport,
    setSelectedFolder,
    setSearchTerm,
    addReport,
    addFolder,
    starredReports,
    recentReports,
    filteredReports
  } = useXRayState();

  const handleLoadCurl = (curl: string) => {
    setCurlInput(curl);
    setParsedRequest(null);
    setResponse(null);
    setError(null);
    setCurrentReport(null);
    if (activeView !== 'new-scan') {
      setActiveView('new-scan');
    }
  };

  const handleSelectReport = (report: AnalysisReport) => {
    setCurrentReport(report);
  };

  const handleShowInFolder = (reportId: string) => {
    setHighlightedReportId(reportId);
    setActiveView('folders');
    setTimeout(() => setHighlightedReportId(undefined), 3000);
  };

  const handleAnalysisComplete = (analysisData: any) => {
    // Create a new analysis report from the data
    const newReport: AnalysisReport = {
      id: `report-${Date.now()}`,
      curlCommand: analysisData.curlCommand,
      timestamp: analysisData.timestamp,
      folderId: analysisData.folderId,
      isStarred: false,
      method: analysisData.parsedRequest.method,
      url: analysisData.parsedRequest.url,
      status: analysisData.response.status,
      statusText: analysisData.response.statusText,
      responseTime: Math.floor(Math.random() * 500) + 50,
      requestHeaders: analysisData.parsedRequest.headers,
      responseHeaders: analysisData.response.headers,
      headerIssues: [],
      requestBody: analysisData.parsedRequest.body,
      responseBody: analysisData.response.body,
      securityIssues: [
        {
          type: 'info',
          title: 'New Analysis',
          description: 'This is a newly generated analysis report',
          recommendation: 'Review the security and performance metrics'
        }
      ],
      securityScore: Math.floor(Math.random() * 30) + 70,
      performanceMetrics: {
        responseTime: Math.floor(Math.random() * 500) + 50,
        contentLength: analysisData.response.body.length,
        cacheability: 'not-cacheable'
      },
      performanceIssues: [],
      fields: []
    };

    addReport(newReport);
    setCurrentReport(newReport);
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
    // If there's a current report selected, show it regardless of view
    if (state.currentReport) {
      return <AnalysisReportView report={state.currentReport} />;
    }

    switch (activeView) {
      case 'search-history':
        return (
          <SearchHistoryView 
            onLoadCurl={handleLoadCurl}
            onSelectReport={handleSelectReport}
            reports={filteredReports}
            searchTerm={state.searchTerm}
            onSearchChange={setSearchTerm}
          />
        );
      case 'folders':
        return (
          <FoldersView 
            onLoadCurl={handleLoadCurl}
            onSelectReport={handleSelectReport}
            folders={state.folders}
            reports={state.reports}
            onCreateFolder={addFolder}
            highlightedReportId={highlightedReportId}
          />
        );
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
              selectedFolderId={state.selectedFolderId}
              folders={state.folders}
              onFolderSelect={setSelectedFolder}
              onAnalysisComplete={handleAnalysisComplete}
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
        onSelectReport={handleSelectReport}
        starredReports={starredReports}
        recentReports={recentReports}
        onToggleStar={toggleStar}
        onShowInFolder={handleShowInFolder}
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
