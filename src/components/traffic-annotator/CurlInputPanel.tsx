
import React from 'react';
import { History } from 'lucide-react';

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

interface CurlInputPanelProps {
  curlInput: string;
  setCurlInput: (value: string) => void;
  parsedRequest: ParsedRequest | null;
  setParsedRequest: (value: ParsedRequest | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  setResponse: (value: MockResponse | null) => void;
  showHistory: boolean;
  setShowHistory: (value: boolean) => void;
}

export const CurlInputPanel: React.FC<CurlInputPanelProps> = ({
  curlInput,
  setCurlInput,
  parsedRequest,
  setParsedRequest,
  loading,
  setLoading,
  error,
  setError,
  setResponse,
  showHistory,
  setShowHistory
}) => {
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
      throw new Error(`Failed to parse cURL: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleInputChange = (value: string) => {
    setCurlInput(value);
    setError(null);
    
    if (value.trim()) {
      try {
        const parsed = parseCurl(value);
        setParsedRequest(parsed);
      } catch (err) {
        setParsedRequest(null);
      }
    } else {
      setParsedRequest(null);
    }
  };

  const sendRequest = () => {
    if (!parsedRequest) {
      setError('Please enter a valid cURL command');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    // Mock API response simulation
    setTimeout(() => {
      const mockResponse: MockResponse = {
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

      setResponse(mockResponse);
      setLoading(false);
    }, 1000);
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #2563eb, #7c3aed)',
    color: '#ffffff',
    padding: '24px'
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
    display: 'block'
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: '128px',
    padding: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
    backgroundColor: '#ffffff'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 32px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const historyButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    color: '#6b7280',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent'
  };

  const errorStyle: React.CSSProperties = {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '16px'
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          cURL Traffic Analysis
        </h2>
        <p style={{ color: '#bfdbfe', marginTop: '8px', marginBottom: 0 }}>
          Paste your cURL command to analyze field compliance and data governance
        </p>
      </div>
      
      <div style={contentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <label style={labelStyle}>cURL Command</label>
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={historyButtonStyle}
          >
            <History size={16} />
            History
          </button>
        </div>
        
        <div style={{ position: 'relative' }}>
          <textarea
            value={curlInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="curl -X POST 'https://api.example.com/data?userId=123&format=json' -H 'Content-Type: application/json' -H 'Authorization: Bearer token123' -d '{\"name\": \"John\", \"email\": \"john@example.com\"}'"
            style={textareaStyle}
          />
          {curlInput && (
            <button
              onClick={() => {
                setCurlInput('');
                setParsedRequest(null);
                setResponse(null);
                setError(null);
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                color: '#9ca3af',
                fontSize: '20px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'transparent'
              }}
            >
              ×
            </button>
          )}
        </div>

        {error && (
          <div style={errorStyle}>
            <span style={{ color: '#dc2626', fontSize: '20px' }}>⚠️</span>
            <span style={{ color: '#b91c1c', fontSize: '14px' }}>{error}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <button
            onClick={sendRequest}
            disabled={!parsedRequest || loading}
            style={{
              ...buttonStyle,
              opacity: !parsedRequest || loading ? 0.5 : 1,
              cursor: !parsedRequest || loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Analyzing...' : '🚀 Send & Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
};
