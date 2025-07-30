import React, { useState } from 'react';
import { Share, Download, ChevronDown, ChevronUp, Clock, Globe, Lock, Copy, X } from 'lucide-react';
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

interface Annotation {
  id: string;
  fieldPath: string;
  text: string;
  timestamp: string;
}

interface AnalysisReportViewProps {
  analysisItem: AnalysisItem;
}

const ShareModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  analysisItem: AnalysisItem;
}> = ({ isOpen, onClose, analysisItem }) => {
  const [expiration, setExpiration] = useState('7days');
  const [accessType, setAccessType] = useState<'public' | 'private'>('public');
  const [allowedUsers, setAllowedUsers] = useState('');
  const [shareLink, setShareLink] = useState('');

  if (!isOpen) return null;

  const handleGenerateLink = () => {
    const link = `https://app.example.com/share/${analysisItem.id}?exp=${expiration}&type=${accessType}`;
    setShareLink(link);
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    width: '480px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflow: 'auto'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Share Analysis Report</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Expiration</label>
          <select
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
          >
            <option value="1day">1 day</option>
            <option value="7days">7 days</option>
            <option value="30days">30 days</option>
            <option value="never">Never</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Access Type</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="radio"
                checked={accessType === 'public'}
                onChange={() => setAccessType('public')}
              />
              <Globe size={16} />
              Public - Anyone with the link can access
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="radio"
                checked={accessType === 'private'}
                onChange={() => setAccessType('private')}
              />
              <Lock size={16} />
              Private - Only specified users can access
            </label>
          </div>
        </div>

        {accessType === 'private' && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Allowed Users</label>
            <input
              type="text"
              placeholder="Enter usernames, comma-separated"
              value={allowedUsers}
              onChange={(e) => setAllowedUsers(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white' }}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateLink}
            style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}
          >
            Generate Link
          </button>
        </div>

        {shareLink && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', wordBreak: 'break-all' }}>{shareLink}</span>
              <button
                onClick={() => navigator.clipboard.writeText(shareLink)}
                style={{ padding: '4px 8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({
  analysisItem
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [annotationsExpanded, setAnnotationsExpanded] = useState(true);

  // Mock annotations data
  const [annotations] = useState<Annotation[]>([
    {
      id: '1',
      fieldPath: 'headers.Authorization',
      text: 'Bearer token detected - ensure proper validation',
      timestamp: new Date().toISOString()
    },
    {
      id: '2', 
      fieldPath: 'body.userId',
      text: 'User ID should be validated against current session',
      timestamp: new Date().toISOString()
    }
  ]);

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

  const handleDownload = () => {
    const reportData = {
      analysisItem,
      annotations,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-report-${analysisItem.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const sectionHeaderStyle: React.CSSProperties = {
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  };

  const actionButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginTop: '16px'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      {/* Report Header */}
      <div style={headerStyle}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
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
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        {response && (
          <>
            <ResponseDisplayPanel response={response} />
            
            {/* Enhanced Field Analysis with Action Buttons */}
            <div>
              <FieldAnalysisSection 
                parsedRequest={parsedRequest}
                response={response}
                curlInput={analysisItem.curlCommand}
              />
              
              <div style={actionButtonsStyle}>
                <button style={buttonStyle} onClick={() => setShowShareModal(true)}>
                  <Share size={16} />
                  Share
                </button>
                <button style={buttonStyle} onClick={handleDownload}>
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>

            {/* Annotation Section */}
            <div style={sectionStyle}>
              <div 
                style={sectionHeaderStyle}
                onClick={() => setAnnotationsExpanded(!annotationsExpanded)}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Annotations</h3>
                {annotationsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {annotationsExpanded && (
                <div style={{ padding: '16px' }}>
                  {annotations.length === 0 ? (
                    <p style={{ color: '#6b7280', textAlign: 'center', margin: 0 }}>
                      No annotations available
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {annotations.map((annotation) => (
                        <div key={annotation.id} style={{ 
                          padding: '12px', 
                          backgroundColor: '#f8fafc', 
                          borderRadius: '6px',
                          borderLeft: '3px solid #3b82f6'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                            <strong style={{ fontSize: '14px', color: '#1f2937' }}>{annotation.fieldPath}</strong>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                              <Clock size={12} />
                              {new Date(annotation.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <p style={{ margin: 0, fontSize: '14px', color: '#4b5563' }}>{annotation.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        analysisItem={analysisItem}
      />
    </div>
  );
};
