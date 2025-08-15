import React, { useState } from 'react';
import { Copy, Download, Share2, Calendar, Users, Lock, Globe, Link } from 'lucide-react';
import { ResponseDisplayPanel } from './ResponseDisplayPanel';
import { FieldAnalysisSection } from './FieldAnalysisSection';
import { useDownload } from '../../hooks/useDownload';

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
  const { startDownload } = useDownload();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareConfig, setShareConfig] = useState({
    isPublic: true,
    expiredDate: '',
    authorizedUsers: ''
  });
  const [accessCode, setAccessCode] = useState('');

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

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(analysisItem.curlCommand);
  };

  const handleDownload = () => {
    startDownload(analysisItem.name, analysisItem.id);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleConfirmShare = () => {
    // Generate access code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setAccessCode(code);
    setShowShareModal(false);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setAccessCode('');
  };

  const handleCopyShareLink = () => {
    const shareableLink = `${window.location.origin}/aplus/annotator/shared/${analysisItem.id}?code=${accessCode}`;
    navigator.clipboard.writeText(shareableLink);
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    width: '100%'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  };

  const headerTopStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0'
  };

  const headerButtonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    transition: 'all 0.2s'
  };

  const metaStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '14px',
    color: '#6b7280'
  };

  const contentLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px'
  };

  const curlSectionStyle: React.CSSProperties = {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px'
  };

  const curlHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  };

  const curlTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    margin: '0'
  };

  const copyButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151',
    transition: 'all 0.2s'
  };

  const curlCodeStyle: React.CSSProperties = {
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, "Cascadia Code", Fira Code, "Fira Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '14px',
    backgroundColor: '#ffffff',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    color: '#1f2937',
    lineHeight: '1.5',
    maxHeight: '200px',
    overflowY: 'auto'
  };

  return (
    <div style={containerStyle}>
      {/* Report Header */}
      <div style={headerStyle}>
        <div style={headerTopStyle}>
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
          
          <div style={headerButtonsStyle}>
            <button 
              style={buttonStyle}
              onClick={handleDownload}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              <Download size={16} />
              Download
            </button>
            <button 
              style={buttonStyle}
              onClick={handleShare}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
        
        <div style={metaStyle}>
          <span>Analyzed on {new Date(analysisItem.timestamp).toLocaleString()}</span>
          <span style={{ 
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, "Cascadia Code", Fira Code, "Fira Mono", Consolas, "Liberation Mono", Menlo, monospace',
            backgroundColor: '#f3f4f6',
            padding: '2px 6px',
            borderRadius: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '600px'
          }}>
            {parsedRequest?.method || 'GET'} {parsedRequest?.url || 'Unknown URL'}
          </span>
        </div>
        
        {/* Access Code Display */}
        {accessCode && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#0c4a6e'
          }}>
            <strong>Share Access Code: </strong>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, "Cascadia Code", Fira Code, "Fira Mono", Consolas, "Liberation Mono", Menlo, monospace',
              backgroundColor: '#ffffff',
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #0ea5e9'
            }}>
              {accessCode}
            </span>
          </div>
        )}

        {/* Shareable Link Section */}
        {accessCode && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#15803d'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <Link size={16} />
                  <strong>Shareable Link:</strong>
                </div>
                <div style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, "Cascadia Code", Fira Code, "Fira Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  backgroundColor: '#ffffff',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #22c55e',
                  fontSize: '13px',
                  wordBreak: 'break-all',
                  color: '#374151'
                }}>
                  {`${window.location.origin}/aplus/annotator/shared/${analysisItem.id}?code=${accessCode}`}
                </div>
              </div>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #22c55e',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#15803d',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onClick={handleCopyShareLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                  e.currentTarget.style.borderColor = '#16a34a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#22c55e';
                }}
              >
                <Copy size={16} />
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>

      {/* cURL Request Section */}
      <div style={curlSectionStyle}>
        <div style={curlHeaderStyle}>
          <h3 style={curlTitleStyle}>cURL Request</h3>
          <button 
            style={copyButtonStyle}
            onClick={handleCopyCurl}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
        <div style={curlCodeStyle}>
          {analysisItem.curlCommand}
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

      {/* Share Modal */}
      {showShareModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            width: '480px',
            maxWidth: '90vw',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0'
              }}>Share Configuration</h3>
              <button
                onClick={handleCloseShareModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Access Type
              </label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="accessType"
                    checked={shareConfig.isPublic}
                    onChange={() => setShareConfig(prev => ({ ...prev, isPublic: true }))}
                    style={{ margin: '0' }}
                  />
                  <Globe size={16} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Public</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="accessType"
                    checked={!shareConfig.isPublic}
                    onChange={() => setShareConfig(prev => ({ ...prev, isPublic: false }))}
                    style={{ margin: '0' }}
                  />
                  <Lock size={16} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Private</span>
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                <Calendar size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Expiration Date
              </label>
              <input
                type="date"
                value={shareConfig.expiredDate}
                onChange={(e) => setShareConfig(prev => ({ ...prev, expiredDate: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#374151'
                }}
              />
            </div>

            {!shareConfig.isPublic && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  <Users size={16} style={{ display: 'inline', marginRight: '8px' }} />
                  Authorized Users (comma-separated emails)
                </label>
                <input
                  type="text"
                  value={shareConfig.authorizedUsers}
                  onChange={(e) => setShareConfig(prev => ({ ...prev, authorizedUsers: e.target.value }))}
                  placeholder="user1@example.com, user2@example.com"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#374151'
                  }}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={handleCloseShareModal}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmShare}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#ffffff'
                }}
              >
                Confirm Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
