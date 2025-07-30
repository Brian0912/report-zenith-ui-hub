import React, { useState } from 'react';
import { TrafficAnnotatorHeader } from '../components/traffic-annotator/TrafficAnnotatorHeader';
import { CurlInputPanel } from '../components/traffic-annotator/CurlInputPanel';
import { ResponseDisplayPanel } from '../components/traffic-annotator/ResponseDisplayPanel';
import { FieldAnalysisSection } from '../components/traffic-annotator/FieldAnalysisSection';
import { RequestHistory } from '../components/traffic-annotator/RequestHistory';
import { XRaySidebar } from '../components/traffic-annotator/XRaySidebar';
import { SearchHistoryView } from '../components/traffic-annotator/SearchHistoryView';
import { AnalysisReportView } from '../components/traffic-annotator/AnalysisReportView';
import { FolderControlPage } from '../components/traffic-annotator/FolderControlPage';
import { ShareControlPage } from '../components/traffic-annotator/ShareControlPage';

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

interface AnalysisItem {
  id: string;
  name: string;
  curlCommand: string;
  timestamp: string;
  isStarred: boolean;
  isShared?: boolean;
  sharedBy?: string;
  parsedRequest?: ParsedRequest;
  response?: MockResponse;
}

type ViewMode = 'new-scan' | 'search-history' | 'analysis-report' | 'folder-control' | 'share-control';

export const TrafficAnnotatorPage: React.FC = () => {
  const [curlInput, setCurlInput] = useState('');
  const [parsedRequest, setParsedRequest] = useState<ParsedRequest | null>(null);
  const [response, setResponse] = useState<MockResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<ViewMode>('new-scan');
  const [selectedAnalysisItem, setSelectedAnalysisItem] = useState<AnalysisItem | null>(null);
  
  // Mock data for sidebar sections
  const [analysisItems, setAnalysisItems] = useState<AnalysisItem[]>([
    {
      id: '1',
      name: 'User Profile API',
      curlCommand: 'curl -X POST "https://api.example.com/user/profile" -H "Authorization: Bearer token123"',
      timestamp: '2024-01-15T10:30:00Z',
      isStarred: true,
      isShared: false
    },
    {
      id: '2',
      name: 'Authentication Flow',
      curlCommand: 'curl -X POST "https://auth.example.com/login" -d "{"username":"user","password":"pass"}"',
      timestamp: '2024-01-14T15:45:00Z',
      isStarred: false,
      isShared: true,
      sharedBy: 'Alice Smith'
    },
    {
      id: '3',
      name: 'Payment Processing',
      curlCommand: 'curl -X POST "https://api.payment.com/process" -H "Content-Type: application/json"',
      timestamp: '2024-01-13T09:15:00Z',
      isStarred: true,
      isShared: false
    },
    {
      id: '4',
      name: 'Data Export',
      curlCommand: 'curl -X GET "https://api.example.com/export?format=json&userId=123"',
      timestamp: '2024-01-12T14:20:00Z',
      isStarred: false,
      isShared: true,
      sharedBy: 'Bob Johnson'
    }
  ]);

  const sharedItems = analysisItems.filter(item => item.isShared);
  const starredItems = analysisItems.filter(item => item.isStarred);
  const recentItems = analysisItems.slice().sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 10);

  const handleNewScan = () => {
    setCurrentView('new-scan');
    setSelectedAnalysisItem(null);
    // Reset the scan state to show the original interface
    setCurlInput('');
    setParsedRequest(null);
    setResponse(null);
    setError(null);
  };

  const handleSearchHistory = () => {
    setCurrentView('search-history');
    setSelectedAnalysisItem(null);
  };

  const handleFolderControl = () => {
    setCurrentView('folder-control');
    setSelectedAnalysisItem(null);
  };

  const handleShareControl = () => {
    setCurrentView('share-control');
    setSelectedAnalysisItem(null);
  };

  const handleAccessScan = (accessCode: string) => {
    // Handle access scan with code
    console.log('Accessing scan with code:', accessCode);
    // TODO: Implement actual access logic
  };

  const handleViewAnalysis = (item: AnalysisItem) => {
    setSelectedAnalysisItem(item);
    setCurrentView('analysis-report');
  };

  const handleToggleStar = (itemId: string) => {
    setAnalysisItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, isStarred: !item.isStarred }
          : item
      )
    );
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: '100vh',
    backgroundColor: '#f8fafc',
    overflow: 'hidden'
  };

  const mainContentStyle: React.CSSProperties = {
    marginLeft: sidebarOpen ? '320px' : '60px',
    transition: 'margin-left 0.3s ease-in-out',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '32px 24px'
  };

  const newScanLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%'
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'search-history':
        return (
          <SearchHistoryView
            onSelectItem={handleViewAnalysis}
            items={analysisItems}
          />
        );
      
      case 'analysis-report':
        return selectedAnalysisItem ? (
          <AnalysisReportView analysisItem={selectedAnalysisItem} />
        ) : null;

      case 'folder-control':
        return <FolderControlPage />;

      case 'share-control':
        return <ShareControlPage />;
      
      case 'new-scan':
      default:
        return (
          <div style={newScanLayoutStyle}>
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
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewScan={handleNewScan}
        onSearchHistory={handleSearchHistory}
        onFolderControl={handleFolderControl}
        onShareControl={handleShareControl}
        onViewAnalysis={handleViewAnalysis}
        onToggleStar={handleToggleStar}
        onAccessScan={handleAccessScan}
        sharedItems={sharedItems}
        starredItems={starredItems}
        recentItems={recentItems}
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
          setCurrentView('new-scan');
        }}
      />
    </div>
  );
};