
import React from 'react';
import { Send, X, History } from 'lucide-react';
import { sharedStyles } from '../shared/styles';
import { ParsedRequest, MockResponse, FieldAnalysisData, FieldData, Enhancement } from './CurlAnalysisPanel';
import { parseCurl, generateFieldAnalysis, generateApiEnhancements } from './utils';

interface CurlInputSectionProps {
  curlInput: string;
  setCurlInput: (value: string) => void;
  parsedRequest: ParsedRequest | null;
  setParsedRequest: (value: ParsedRequest | null) => void;
  setResponse: (value: MockResponse | null) => void;
  setError: (value: string | null) => void;
  setFieldAnalysisData: (value: FieldAnalysisData) => void;
  setSelectedFields: (value: FieldData[]) => void;
  setApiEnhancements: (value: Enhancement[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: string | null;
}

export const CurlInputSection: React.FC<CurlInputSectionProps> = ({
  curlInput,
  setCurlInput,
  parsedRequest,
  setParsedRequest,
  setResponse,
  setError,
  setFieldAnalysisData,
  setSelectedFields,
  setApiEnhancements,
  loading,
  setLoading,
  error
}) => {
  const inputContainerStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const labelStyle: React.CSSProperties = {
    ...sharedStyles.label,
    display: 'block',
    marginBottom: '8px'
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    height: '120px',
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#1a202c',
    backgroundColor: '#ffffff',
    resize: 'none',
    outline: 'none',
    transition: 'all 0.2s ease'
  };

  const textareaFocusStyle: React.CSSProperties = {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  };

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const buttonDisabledStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  };

  const errorStyle: React.CSSProperties = {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px'
  };

  const clearButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'color 0.2s ease'
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
      
      const analysisData = generateFieldAnalysis(parsedRequest, mockResponse);
      setFieldAnalysisData(analysisData);
      
      const enhancements = generateApiEnhancements(parsedRequest);
      setApiEnhancements(enhancements);
      
      setLoading(false);
    }, 1000);
  };

  const clearInput = () => {
    setCurlInput('');
    setParsedRequest(null);
    setResponse(null);
    setError(null);
    setFieldAnalysisData({
      requestHeaders: [],
      requestQuery: [],
      requestBody: [],
      responseHeaders: [],
      responseCookies: [],
      responseBody: []
    });
    setSelectedFields([]);
    setApiEnhancements([]);
  };

  return (
    <div style={inputContainerStyle}>
      <label style={labelStyle}>cURL Command</label>
      
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <textarea
          value={curlInput}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="curl -X POST 'https://api.example.com/data?userId=123&format=json' -H 'Content-Type: application/json' -H 'Authorization: Bearer token123' -d '{\"name\": \"John\", \"email\": \"john@example.com\"}'"
          style={textareaStyle}
          onFocus={(e) => Object.assign(e.target.style, textareaFocusStyle)}
          onBlur={(e) => Object.assign(e.target.style, textareaStyle)}
        />
        
        {curlInput && (
          <button
            onClick={clearInput}
            style={clearButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#6b7280'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {error && (
        <div style={errorStyle}>
          <span style={{ color: '#dc2626', fontSize: '18px' }}>⚠️</span>
          <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>{error}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={sendRequest}
          disabled={!parsedRequest || loading}
          style={!parsedRequest || loading ? buttonDisabledStyle : buttonStyle}
          onMouseEnter={(e) => {
            if (!loading && parsedRequest) {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading && parsedRequest) {
              e.currentTarget.style.backgroundColor = '#3b82f6';
            }
          }}
        >
          {loading ? (
            <>
              <span>⏳</span>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Send & Analyze</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
