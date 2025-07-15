
import React, { useState } from 'react';
import { History, Send, X, ChevronDown, ChevronRight } from 'lucide-react';
import { sharedStyles } from '../shared/styles';
import { CurlInputSection } from './CurlInputSection';
import { ResponseSection } from './ResponseSection';
import { FieldAnalysisSection } from './FieldAnalysisSection';
import { EnhancementScheduleSection } from './EnhancementScheduleSection';
import { SelectedFieldsSection } from './SelectedFieldsSection';

export interface ParsedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

export interface MockResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

export interface FieldData {
  id: string;
  fieldPath: string;
  source: string;
  category: string;
  hasSchema: string;
  prodTag: string;
  gcpTag: string;
  deccTag: string;
  attributedTo: string;
  dataSovereignty: string;
  policyAction: string;
  linkToFinding: string;
  comment: string;
}

export interface FieldAnalysisData {
  requestHeaders: FieldData[];
  requestQuery: FieldData[];
  requestBody: FieldData[];
  responseHeaders: FieldData[];
  responseCookies: FieldData[];
  responseBody: FieldData[];
}

export interface Enhancement {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  governanceSchedule: string;
  affectedFieldTypes: string[];
  compliance: string;
  owner: string;
  estimatedEffort: string;
}

export const CurlAnalysisPanel: React.FC = () => {
  const [curlInput, setCurlInput] = useState('');
  const [parsedRequest, setParsedRequest] = useState<ParsedRequest | null>(null);
  const [response, setResponse] = useState<MockResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<FieldData[]>([]);
  const [fieldAnalysisData, setFieldAnalysisData] = useState<FieldAnalysisData>({
    requestHeaders: [],
    requestQuery: [],
    requestBody: [],
    responseHeaders: [],
    responseCookies: [],
    responseBody: []
  });
  const [apiEnhancements, setApiEnhancements] = useState<Enhancement[]>([]);

  const mainPanelStyle: React.CSSProperties = {
    ...sharedStyles.card,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  return (
    <div style={mainPanelStyle}>
      <CurlInputSection
        curlInput={curlInput}
        setCurlInput={setCurlInput}
        parsedRequest={parsedRequest}
        setParsedRequest={setParsedRequest}
        setResponse={setResponse}
        setError={setError}
        setFieldAnalysisData={setFieldAnalysisData}
        setSelectedFields={setSelectedFields}
        setApiEnhancements={setApiEnhancements}
        loading={loading}
        setLoading={setLoading}
        error={error}
      />

      {response && (
        <div style={{ flex: 1, overflow: 'auto', paddingTop: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <ResponseSection response={response} />
          </div>

          {selectedFields.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <SelectedFieldsSection
                selectedFields={selectedFields}
                setSelectedFields={setSelectedFields}
              />
            </div>
          )}

          {apiEnhancements.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <EnhancementScheduleSection apiEnhancements={apiEnhancements} />
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <FieldAnalysisSection
              fieldAnalysisData={fieldAnalysisData}
              selectedFields={selectedFields}
              setSelectedFields={setSelectedFields}
            />
          </div>
        </div>
      )}
    </div>
  );
};
