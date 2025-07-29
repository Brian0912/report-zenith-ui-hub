import React from 'react';

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

interface NewScanViewProps {
  curlInput: string;
  setCurlInput: (value: string) => void;
  parsedRequest: ParsedRequest | null;
  setParsedRequest: (value: ParsedRequest | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
  setError: (value: string | null) => void;
  setResponse: (value: MockResponse | null) => void;
}

export const NewScanView: React.FC<NewScanViewProps> = ({
  curlInput,
  setCurlInput,
  parsedRequest,
  setParsedRequest,
  loading,
  setLoading,
  error,
  setError,
  setResponse
}) => {
  const PLACEHOLDER_TEXT = `curl -X POST 'https://api.example.com/data?userId=123&format=json' -H 'Content-Type: application/json' -H 'Authorization: Bearer token123' -d '{"name": "John", "email": "john@example.com"}'`;

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

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    marginBottom: '40px',
    textAlign: 'center'
  };

  const inputContainerStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '24px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    marginBottom: '12px',
    display: 'block',
    textAlign: 'center'
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: '160px',
    padding: '20px',
    border: '2px solid hsl(var(--border))',
    borderRadius: '12px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Cascadia, "Cascadia Code", Fira Code, "Fira Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
    backgroundColor: 'hsl(var(--card))',
    color: 'hsl(var(--foreground))',
    transition: 'border-color 0.2s'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 40px',
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  };

  const errorStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--destructive) / 0.1)',
    border: '1px solid hsl(var(--destructive) / 0.3)',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '16px',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>X-Ray</h1>
      
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Enter cURL Command</label>
        <div style={{ position: 'relative' }}>
          <textarea
            value={curlInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={PLACEHOLDER_TEXT}
            style={textareaStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--primary))';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--border))';
            }}
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
                top: '12px',
                right: '12px',
                color: 'hsl(var(--muted-foreground))',
                fontSize: '20px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: 'transparent',
                padding: '4px',
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                e.currentTarget.style.color = 'hsl(var(--foreground))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
              }}
            >
              ×
            </button>
          )}
        </div>

        {error && (
          <div style={errorStyle}>
            <span style={{ color: 'hsl(var(--destructive))', fontSize: '20px' }}>⚠️</span>
            <span style={{ color: 'hsl(var(--destructive))', fontSize: '14px' }}>{error}</span>
          </div>
        )}
      </div>

      <button
        onClick={sendRequest}
        disabled={!parsedRequest || loading}
        style={{
          ...buttonStyle,
          opacity: !parsedRequest || loading ? 0.6 : 1,
          cursor: !parsedRequest || loading ? 'not-allowed' : 'pointer'
        }}
        onMouseEnter={(e) => {
          if (!(!parsedRequest || loading)) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (!(!parsedRequest || loading)) {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}
      >
        {loading ? '⏳ Analyzing...' : '🚀 Send & Analyze'}
      </button>
    </div>
  );
};