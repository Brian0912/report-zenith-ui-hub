
import React, { useState } from 'react';
import { TrafficAnnotatorHeader } from '../components/traffic-annotator/TrafficAnnotatorHeader';
import { CurlInputPanel } from '../components/traffic-annotator/CurlInputPanel';
import { ResponseDisplayPanel } from '../components/traffic-annotator/ResponseDisplayPanel';
import { FieldAnalysisSection } from '../components/traffic-annotator/FieldAnalysisSection';
import { RequestHistory } from '../components/traffic-annotator/RequestHistory';

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
  const [showHistory, setShowHistory] = useState(false);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  };

  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 24px'
  };

  const contentLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px'
  };

  return (
    <div style={containerStyle}>
      <TrafficAnnotatorHeader />
      
      <div style={mainContentStyle}>
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
