import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { FindingDisplay } from './FindingDropdown';
import { CommentDisplay } from './CommentDisplay';
import { FieldEditModal } from './FieldEditModal';
import { SaveAnnotationsModal } from './SaveAnnotationsModal';
import { SuccessBanner } from './SuccessBanner';
import { EnhancementBadge } from './EnhancementBadge';
import { ColumnVisibilityDropdown } from './ColumnVisibilityDropdown';
import { ViewModeSelector, ViewMode } from './ViewModeSelector';
import { GroupedFieldView } from './GroupedFieldView';
import { CompactFieldView } from './CompactFieldView';
import { TabsFieldView } from './TabsFieldView';
import { BulkCommentModal } from './BulkCommentModal';

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

interface CommentData {
  text: string;
  images: string[];
}

interface Enhancement {
  name: string;
  timestamp?: string;
  link?: string;
}

export interface FieldData {
  id: string;
  fieldPath: string;
  source: string;
  category: string;
  value: string;
  hasSchema: string;
  prodTag: string;
  gcpTag: string;
  deccTag: string;
  attributedTo: string;
  dataSovereignty: string;
  policyAction: string;
  linkToFinding: string;
  comment: string;
  enhancements: Enhancement[];
  selectedFinding?: string;
  selectedComment?: CommentData;
  images?: string[];
}

interface FieldAnalysisData {
  requestHeaders: FieldData[];
  requestQuery: FieldData[];
  requestBody: FieldData[];
  responseHeaders: FieldData[];
  responseCookies: FieldData[];
  responseBody: FieldData[];
  [key: string]: FieldData[];
}

export interface ColumnVisibilityState {
  group: boolean;
  value: boolean;
  hasSchema: boolean;
  prodTag: boolean;
  gcpTag: boolean;
  deccTag: boolean;
  attributedTo: boolean;
  dataSovereignty: boolean;
  policyAction: boolean;
  enhancements: boolean;
  finding: boolean;
  comment: boolean;
  images: boolean;
}

interface FieldAnalysisSectionProps {
  parsedRequest: ParsedRequest | null;
  response: MockResponse;
  curlInput?: string;
}

export const FieldAnalysisSection: React.FC<FieldAnalysisSectionProps> = ({
  parsedRequest,
  response,
  curlInput = ''
}) => {
  const [fieldAnalysisData, setFieldAnalysisData] = useState<FieldAnalysisData>({
    requestHeaders: [],
    requestQuery: [],
    requestBody: [],
    responseHeaders: [],
    responseCookies: [],
    responseBody: []
  });
  const [selectedFields, setSelectedFields] = useState<FieldData[]>([]);
  const [editingField, setEditingField] = useState<FieldData | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showBulkCommentModal, setShowBulkCommentModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({
    group: true,
    value: true,
    hasSchema: true,
    prodTag: true,
    gcpTag: false,
    deccTag: false,
    attributedTo: true,
    dataSovereignty: true,
    policyAction: true,
    enhancements: true,
    finding: false,
    comment: false,
    images: false
  });

  // Update group column visibility based on view mode
  useEffect(() => {
    setColumnVisibility(prev => ({
      ...prev,
      group: viewMode === 'compact'
    }));
  }, [viewMode]);

  useEffect(() => {
    if (parsedRequest && response) {
      const analysisData = generateFieldAnalysis(parsedRequest, response);
      setFieldAnalysisData(analysisData);
    }
  }, [parsedRequest, response]);

  const extractFieldValue = (fieldPath: string, source: string, category: string): string => {
    try {
      if (category === 'Header' && source === 'Request') {
        return parsedRequest?.headers[fieldPath] || '';
      }
      if (category === 'Header' && source === 'Response') {
        return response.headers[fieldPath] || '';
      }
      if (category === 'Query' && source === 'Request' && parsedRequest) {
        const url = new URL(parsedRequest.url);
        return url.searchParams.get(fieldPath.replace('query.', '')) || '';
      }
      if (category === 'Body' && source === 'Request' && parsedRequest?.body) {
        const data = JSON.parse(parsedRequest.body);
        return getNestedValue(data, fieldPath) || '';
      }
      if (category === 'Body' && source === 'Response') {
        const data = JSON.parse(response.body);
        return getNestedValue(data, fieldPath) || '';
      }
      return '';
    } catch {
      return '';
    }
  };

  const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object') {
        return current[key];
      }
      return undefined;
    }, obj)?.toString() || '';
  };

  const createFieldData = (fieldPath: string, source: string, category: string): FieldData => {
    const mockEnhancements: Enhancement[] = [];
    if (Math.random() > 0.6) {
      mockEnhancements.push({
        name: `e${Math.floor(Math.random() * 10) + 1}`,
        timestamp: Math.random() > 0.5 ? '2024-01-15' : undefined,
        link: 'https://example.com/enhancement'
      });
    }
    if (Math.random() > 0.8) {
      mockEnhancements.push({
        name: `e${Math.floor(Math.random() * 10) + 1}`,
        timestamp: '2024-02-20',
        link: 'https://example.com/enhancement'
      });
    }
    
    const fieldValue = extractFieldValue(fieldPath, source, category);
    const dataTags = ['phone number', 'email', 'engineering data', 'user id', 'session token', 'api key', 'personal data', 'device info'];
    const countryCodes = ['US', 'EU', 'UK', 'CA', 'AU', 'JP'];
    const policyActions = ['encrypted', 'plain-text', 'noise', 'masked', 'hashed'];

    return {
      id: `${fieldPath}_${source}_${category}`,
      fieldPath,
      source,
      category,
      value: fieldValue,
      hasSchema: Math.random() > 0.5 ? 'Yes' : 'No',
      prodTag: dataTags[Math.floor(Math.random() * dataTags.length)],
      gcpTag: Math.random() > 0.6 ? 'Sensitive' : 'Standard',
      deccTag: Math.random() > 0.8 ? 'Restricted' : 'Approved',
      attributedTo: `${source.toLowerCase()}.${fieldPath}`,
      dataSovereignty: countryCodes[Math.floor(Math.random() * countryCodes.length)],
      policyAction: policyActions[Math.floor(Math.random() * policyActions.length)],
      linkToFinding: `https://compliance-portal.com/finding/${Math.floor(Math.random() * 1000)}`,
      comment: ['Needs review', 'Compliant', 'Under investigation', 'Action required'][Math.floor(Math.random() * 4)],
      enhancements: mockEnhancements,
      selectedComment: { text: '', images: [] },
      images: []
    };
  };

  const extractFieldPaths = (obj: any, prefix = ''): string[] => {
    const fields: string[] = [];
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        const path = prefix ? `${prefix}.${key}` : key;
        fields.push(path);
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          fields.push(...extractFieldPaths(obj[key], path));
        }
      });
    }
    return fields;
  };

  const extractQueryParams = (url: string): string[] => {
    const fields: string[] = [];
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.forEach((value, key) => {
        fields.push(`query.${key}`);
      });
    } catch (e) {
      // Invalid URL, skip query extraction
    }
    return fields;
  };

  const generateFieldAnalysis = (request: ParsedRequest, response: MockResponse): FieldAnalysisData => {
    const analysis: FieldAnalysisData = {
      requestHeaders: [],
      requestQuery: [],
      requestBody: [],
      responseHeaders: [],
      responseCookies: [],
      responseBody: []
    };
    
    // Request headers
    if (request.headers && Object.keys(request.headers).length > 0) {
      Object.keys(request.headers).forEach((header) => {
        analysis.requestHeaders.push(createFieldData(header, 'Request', 'Header'));
      });
    }

    // Request query parameters
    const queryFields = extractQueryParams(request.url);
    queryFields.forEach((field) => {
      const paramName = field.replace('query.', '');
      analysis.requestQuery.push(createFieldData(paramName, 'Request', 'Query'));
    });

    // Request body
    if (request.body) {
      try {
        const requestData = JSON.parse(request.body);
        const bodyFields = extractFieldPaths(requestData);
        bodyFields.forEach((field) => {
          analysis.requestBody.push(createFieldData(field, 'Request', 'Body'));
        });
      } catch (e) {
        analysis.requestBody.push(createFieldData('body', 'Request', 'Body'));
      }
    }

    // Response headers
    if (response.headers) {
      Object.keys(response.headers).forEach((header) => {
        if (header !== 'Set-Cookie') {
          analysis.responseHeaders.push(createFieldData(header, 'Response', 'Header'));
        }
      });
    }

    // Response cookies
    if (response.headers['Set-Cookie']) {
      const cookies = ['session_id', 'user_pref', 'csrf_token'];
      cookies.forEach((cookie) => {
        analysis.responseCookies.push(createFieldData(cookie, 'Response', 'Cookie'));
      });
    }

    // Response body
    if (response.body) {
      try {
        const responseData = JSON.parse(response.body);
        const bodyFields = extractFieldPaths(responseData);
        bodyFields.forEach((field) => {
          analysis.responseBody.push(createFieldData(field, 'Response', 'Body'));
        });
      } catch (e) {
        analysis.responseBody.push(createFieldData('body', 'Response', 'Body'));
      }
    }

    return analysis;
  };

  const toggleFieldSelection = (field: FieldData) => {
    setSelectedFields(prev => {
      const isSelected = prev.some(f => f.id === field.id);
      if (isSelected) {
        return prev.filter(f => f.id !== field.id);
      } else {
        return [{ ...field, selectedComment: { text: '', images: [] } }, ...prev];
      }
    });
  };

  const clearAllSelectedFields = () => {
    setSelectedFields([]);
  };

  const handleEditField = (field: FieldData) => {
    setEditingField(field);
  };

  const handleSaveFieldEdit = (fieldId: string, finding?: string, comment?: CommentData) => {
    setSelectedFields(prev => 
      prev.map(field => 
        field.id === fieldId 
          ? { ...field, selectedFinding: finding, selectedComment: comment }
          : field
      )
    );
  };

  const handleBulkComment = (comment: CommentData) => {
    setSelectedFields(prev => 
      prev.map(field => ({ 
        ...field, 
        selectedComment: comment 
      }))
    );
  };

  const getAllFields = (): FieldData[] => {
    return Object.values(fieldAnalysisData).flat();
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const selectedFieldsHeaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '12px'
  };

  return (
    <div style={cardStyle}>
      <div style={{ padding: '24px' }}>
        {parsedRequest && <SuccessBanner parsedRequest={parsedRequest} />}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
            Field Analysis
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <ViewModeSelector
              currentMode={viewMode}
              onModeChange={setViewMode}
            />
            
            <ColumnVisibilityDropdown
              visibility={columnVisibility}
              onVisibilityChange={setColumnVisibility}
            />
            
            {selectedFields.length > 0 && (
              <>
                <button
                  onClick={clearAllSelectedFields}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E5E7EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }}
                >
                  <X size={14} />
                  Clear All
                </button>
                <button
                  onClick={() => setShowBulkCommentModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#F59E0B',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#D97706';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F59E0B';
                  }}
                >
                  Add Comment to All
                </button>
                <button
                  onClick={() => setShowSaveModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#10B981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#10B981';
                  }}
                >
                  <Save size={16} />
                  Save Annotations
                </button>
              </>
            )}
          </div>
        </div>

        {/* Selected Fields Section */}
        {selectedFields.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={selectedFieldsHeaderStyle}>
              <span>Selected Fields</span>
              <span style={{ 
                backgroundColor: '#EEF2FF', 
                color: '#4F46E5', 
                padding: '4px 12px', 
                borderRadius: '16px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {selectedFields.length} fields
              </span>
            </div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <CompactFieldView
                fields={selectedFields}
                columnVisibility={columnVisibility}
                selectedFields={selectedFields}
                onFieldToggle={toggleFieldSelection}
                onEditField={handleEditField}
                showSectionHeaders={false}
              />
            </div>
          </div>
        )}

        {/* Field Analysis Views */}
        {viewMode === 'grouped' && (
          <GroupedFieldView
            fieldAnalysisData={fieldAnalysisData}
            columnVisibility={columnVisibility}
            selectedFields={selectedFields}
            onFieldToggle={toggleFieldSelection}
            onEditField={handleEditField}
          />
        )}

        {viewMode === 'compact' && (
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <CompactFieldView
              fields={getAllFields()}
              columnVisibility={columnVisibility}
              selectedFields={selectedFields}
              onFieldToggle={toggleFieldSelection}
              onEditField={handleEditField}
            />
          </div>
        )}

        {viewMode === 'tabs' && (
          <TabsFieldView
            fieldAnalysisData={fieldAnalysisData}
            columnVisibility={columnVisibility}
            selectedFields={selectedFields}
            onFieldToggle={toggleFieldSelection}
            onEditField={handleEditField}
          />
        )}
      </div>

      <FieldEditModal
        field={editingField}
        isOpen={!!editingField}
        onClose={() => setEditingField(null)}
        onSave={handleSaveFieldEdit}
      />

      <SaveAnnotationsModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        curlInput={curlInput}
        parsedRequest={parsedRequest}
        response={response}
        selectedFields={selectedFields}
      />

      <BulkCommentModal
        isOpen={showBulkCommentModal}
        onClose={() => setShowBulkCommentModal(false)}
        selectedFields={selectedFields}
        onSave={handleBulkComment}
      />
    </div>
  );
};
