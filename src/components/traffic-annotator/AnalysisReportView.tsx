import React from 'react';
import { ResponseDisplayPanel } from './ResponseDisplayPanel';
import { FieldAnalysisSection } from './FieldAnalysisSection';

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

interface AnalysisReportViewProps {
  analysisItem: AnalysisItem;
}

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({
  analysisItem
}) => {
  // Parse the curl command to extract request details
  const parseCurl = (curlCommand: string): ParsedRequest | null => {
    try {
      const trimmed = curlCommand.trim();
      if (!trimmed.startsWith('curl')) {
        throw new Error('Command must start with curl');
      }

      const urlMatch = trimmed.match(/curl\s+['"]?([^'"\s]+)['"]?/);
      if (!urlMatch) {
        throw new Error('No URL found in cURL command');
      }
      const url = urlMatch[1];

      const methodMatch = trimmed.match(/-X\s+([A-Z]+)/);
      const method = methodMatch ? methodMatch[1] : 'GET';

      const headerMatches = trimmed.match(/-H\s+['"]([^'"]+)['"]/g) || [];
      const headers: Record<string, string> = {};
      headerMatches.forEach((match) => {
        const headerMatch = match.match(/-H\s+['"]([^'"]+)['"]/);
        if (headerMatch) {
          const parts = headerMatch[1].split(':');
          const key = parts[0].trim();
          const value = parts.slice(1).join(':').trim();
          headers[key] = value;
        }
      });

      const bodyMatch = trimmed.match(/-d\s+['"]([^'"]*)['"]/);
      const body = bodyMatch ? bodyMatch[1] : null;

      return { url, method, headers, body };
    } catch (err) {
      return null;
    }
  };

  // Generate mock response for the analysis
  const generateMockResponse = (): MockResponse => {
    return {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '156',
        'Server': 'nginx/1.18.0',
        'Set-Cookie': 'session_id=abc123; Path=/; HttpOnly'
      },
      body: JSON.stringify({
        success: true,
        data: { 
          message: 'Request processed successfully',
          userId: 12345,
          profile: {
            name: 'John Doe',
            email: 'john@example.com',
            preferences: {
              notifications: true,
              privacy: 'public'
            }
          }
        },
        timestamp: new Date().toISOString()
      }, null, 2)
    };
  };

  const parsedRequest = analysisItem.parsedRequest || parseCurl(analysisItem.curlCommand);
  const response = analysisItem.response || generateMockResponse();

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    width: '100%'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '8px'
  };

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#6b7280'
  };

  const contentLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px'
  };

  return (
    <div style={containerStyle}>
      {/* Report Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          {analysisItem.name}
          {analysisItem.isShared && analysisItem.sharedBy && (
            <span style={{ color: '#10b981', fontSize: '16px', fontWeight: '400', marginLeft: '12px' }}>
              shared by {analysisItem.sharedBy}
            </span>
          )}
          {analysisItem.isStarred && (
            <span style={{ color: '#fbbf24', fontSize: '20px', marginLeft: '8px' }}>⭐</span>
          )}
        </h1>
        
        <div style={metaStyle}>
          <span>Analyzed on {new Date(analysisItem.timestamp).toLocaleString()}</span>
          <span>•</span>
          <span style={{ 
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, "Cascadia Code", Fira Code, "Fira Mono", Consolas, "Liberation Mono", Menlo, monospace',
            backgroundColor: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            {parsedRequest?.method || 'GET'} {parsedRequest?.url || 'Unknown URL'}
          </span>
        </div>
      </div>

      {/* Analysis Content */}
      <div style={contentLayoutStyle}>
        {response && (
          <>
            <ResponseDisplayPanel response={response} />
            <FieldAnalysisSection 
              parsedRequest={parsedRequest}
              response={response}
              curlInput={analysisItem.curlCommand}
            />
          </>
        )}
      </div>
    </div>
  );
};