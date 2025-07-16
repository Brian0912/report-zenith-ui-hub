import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Save } from 'lucide-react';
import { FindingDisplay } from './FindingDropdown';
import { CommentDisplay } from './CommentDisplay';
import { FieldEditModal } from './FieldEditModal';
import { SaveAnnotationsModal } from './SaveAnnotationsModal';
import { SuccessBanner } from './SuccessBanner';
import { EnhancementBadge } from './EnhancementBadge';
import { ColumnVisibilityDropdown } from './ColumnVisibilityDropdown';

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

interface FieldData {
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
  enhancements: Enhancement[];
  selectedFinding?: string;
  selectedComment?: CommentData;
}

interface FieldAnalysisData {
  requestHeaders: FieldData[];
  requestQuery: FieldData[];
  requestBody: FieldData[];
  responseHeaders: FieldData[];
  responseCookies: FieldData[];
  responseBody: FieldData[];
}

interface ColumnVisibilityState {
  prodTag: boolean;
  gcpTag: boolean;
  deccTag: boolean;
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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    requestHeaders: true,
    requestQuery: true,
    requestBody: true,
    responseHeaders: true,
    responseCookies: true,
    responseBody: true
  });
  const [selectedFields, setSelectedFields] = useState<FieldData[]>([]);
  const [editingField, setEditingField] = useState<FieldData | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>({
    prodTag: true,
    gcpTag: false,
    deccTag: false
  });

  useEffect(() => {
    if (parsedRequest && response) {
      const analysisData = generateFieldAnalysis(parsedRequest, response);
      setFieldAnalysisData(analysisData);
    }
  }, [parsedRequest, response]);

  const createFieldData = (fieldPath: string, source: string, category: string): FieldData => {
    // Generate mock enhancements
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

    return {
      id: `${fieldPath}_${source}_${category}`,
      fieldPath,
      source,
      category,
      hasSchema: Math.random() > 0.5 ? 'Yes' : 'No',
      prodTag: Math.random() > 0.7 ? 'PII' : Math.random() > 0.5 ? 'Public' : 'Internal',
      gcpTag: Math.random() > 0.6 ? 'Sensitive' : 'Standard',
      deccTag: Math.random() > 0.8 ? 'Restricted' : 'Approved',
      attributedTo: ['Engineering', 'Product', 'Data Science', 'Security'][Math.floor(Math.random() * 4)],
      dataSovereignty: ['US', 'EU', 'Global', 'Restricted'][Math.floor(Math.random() * 4)],
      policyAction: ['Review Required', 'Approved', 'Pending', 'Flagged'][Math.floor(Math.random() * 4)],
      linkToFinding: `https://compliance-portal.com/finding/${Math.floor(Math.random() * 1000)}`,
      comment: ['Needs review', 'Compliant', 'Under investigation', 'Action required'][Math.floor(Math.random() * 4)],
      enhancements: mockEnhancements,
      selectedComment: { text: '', images: [] }
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

  const getSectionInfo = (sectionKey: string) => {
    const sections: Record<string, { title: string; icon: string; color: string }> = {
      requestHeaders: { title: 'Request Headers', icon: '📤', color: '#dbeafe' },
      requestQuery: { title: 'Request Query Parameters', icon: '🔍', color: '#fed7aa' },
      requestBody: { title: 'Request Body', icon: '📝', color: '#dcfce7' },
      responseHeaders: { title: 'Response Headers', icon: '📥', color: '#e9d5ff' },
      responseCookies: { title: 'Response Cookies', icon: '🍪', color: '#fce7f3' },
      responseBody: { title: 'Response Body', icon: '📋', color: '#e0e7ff' }
    };
    return sections[sectionKey] || { title: sectionKey, icon: '📄', color: '#f3f4f6' };
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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

  const getVisibleColumns = () => {
    const columns = ['Field', 'Group', 'Has Schema'];
    if (columnVisibility.prodTag) columns.push('Prod Tag');
    if (columnVisibility.gcpTag) columns.push('GCP Tag');
    if (columnVisibility.deccTag) columns.push('DECC Tag');
    columns.push('Attributed To', 'Data Sovereignty', 'Policy Action', 'Enhancements', 'Finding', 'Comment', 'Actions');
    return columns;
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const sectionHeaderStyle = (sectionInfo: any, isExpanded: boolean): React.CSSProperties => ({
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer',
    backgroundColor: sectionInfo.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.2s'
  });

  return (
    <div style={cardStyle}>
      <div style={{ padding: '24px' }}>
        {parsedRequest && <SuccessBanner parsedRequest={parsedRequest} />}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
            Field Analysis
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ColumnVisibilityDropdown
              visibility={columnVisibility}
              onVisibilityChange={setColumnVisibility}
            />
            {selectedFields.length > 0 && (
              <>
                <span style={{ 
                  backgroundColor: '#dbeafe', 
                  color: '#1e40af', 
                  padding: '4px 12px', 
                  borderRadius: '16px', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {selectedFields.length} fields selected
                </span>
                <button
                  onClick={() => setShowSaveModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
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
            <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '12px' }}>
              Selected Fields
            </h4>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ overflow: 'auto' }}>
                <table style={{ width: '100%', fontSize: '14px' }}>
                  <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      {getVisibleColumns().map((header) => (
                        <th key={header} style={{ 
                          padding: '12px',
                          textAlign: 'left',
                          fontWeight: '500',
                          color: '#374151',
                          whiteSpace: 'nowrap'
                        }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFields.map((field) => (
                      <tr
                        key={field.id}
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          backgroundColor: '#eff6ff'
                        }}
                      >
                        <td style={{ 
                          padding: '12px',
                          fontFamily: 'monospace',
                          fontSize: '13px',
                          color: '#1e40af',
                          fontWeight: '500'
                        }}>
                          {field.fieldPath}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {field.source} {field.category}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>{field.hasSchema}</td>
                        {columnVisibility.prodTag && (
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              backgroundColor: field.prodTag === 'PII' ? '#fef2f2' : field.prodTag === 'Internal' ? '#fefce8' : '#f0fdf4',
                              color: field.prodTag === 'PII' ? '#991b1b' : field.prodTag === 'Internal' ? '#a16207' : '#166534',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px'
                            }}>
                              {field.prodTag}
                            </span>
                          </td>
                        )}
                        {columnVisibility.gcpTag && (
                          <td style={{ padding: '12px' }}>{field.gcpTag}</td>
                        )}
                        {columnVisibility.deccTag && (
                          <td style={{ padding: '12px' }}>{field.deccTag}</td>
                        )}
                        <td style={{ padding: '12px' }}>{field.attributedTo}</td>
                        <td style={{ padding: '12px' }}>{field.dataSovereignty}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            backgroundColor: field.policyAction === 'Flagged' ? '#fef2f2' : field.policyAction === 'Review Required' ? '#fefce8' : '#f0fdf4',
                            color: field.policyAction === 'Flagged' ? '#991b1b' : field.policyAction === 'Review Required' ? '#a16207' : '#166534',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {field.policyAction}
                          </span>
                        </td>
                        <td style={{ padding: '12px', minWidth: '150px' }}>
                          <EnhancementBadge enhancements={field.enhancements} />
                        </td>
                        <td style={{ padding: '12px', minWidth: '200px' }}>
                          <FindingDisplay
                            findingId={field.selectedFinding}
                            onEdit={() => handleEditField(field)}
                          />
                        </td>
                        <td style={{ padding: '12px', minWidth: '250px' }}>
                          <CommentDisplay
                            comment={field.selectedComment}
                            onEdit={() => handleEditField(field)}
                          />
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button
                            onClick={() => toggleFieldSelection(field)}
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {Object.entries(fieldAnalysisData).map(([sectionKey, sectionData]) => {
            const sectionInfo = getSectionInfo(sectionKey);
            const isExpanded = expandedSections[sectionKey];
            const hasFields = sectionData.length > 0;
            
            if (!hasFields) return null;

            return (
              <div key={sectionKey} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <div 
                  style={sectionHeaderStyle(sectionInfo, isExpanded)}
                  onClick={() => toggleSection(sectionKey)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{sectionInfo.icon}</span>
                    <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#111827', margin: 0 }}>
                      {sectionInfo.title}
                    </h4>
                    <span style={{ 
                      backgroundColor: '#6b7280', 
                      color: '#ffffff', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {sectionData.length} fields
                    </span>
                  </div>
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
                
                {isExpanded && (
                  <div style={{ overflow: 'auto' }}>
                    <table style={{ width: '100%', fontSize: '14px' }}>
                      <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                          <th style={{ 
                            padding: '12px',
                            textAlign: 'left',
                            fontWeight: '500',
                            color: '#374151',
                            whiteSpace: 'nowrap'
                          }}>
                            Field
                          </th>
                          <th style={{ 
                            padding: '12px',
                            textAlign: 'left',
                            fontWeight: '500',
                            color: '#374151',
                            whiteSpace: 'nowrap'
                          }}>
                            Has Schema
                          </th>
                          {columnVisibility.prodTag && (
                            <th style={{ 
                              padding: '12px',
                              textAlign: 'left',
                              fontWeight: '500',
                              color: '#374151',
                              whiteSpace: 'nowrap'
                            }}>
                              Prod Tag
                            </th>
                          )}
                          {columnVisibility.gcpTag && (
                            <th style={{ 
                              padding: '12px',
                              textAlign: 'left',
                              fontWeight: '500',
                              color: '#374151',
                              whiteSpace: 'nowrap'
                            }}>
                              GCP Tag
                            </th>
                          )}
                          {columnVisibility.deccTag && (
                            <th style={{ 
                              padding: '12px',
                              textAlign: 'left',
                              fontWeight: '500',
                              color: '#374151',
                              whiteSpace: 'nowrap'
                            }}>
                              DECC Tag
                            </th>
                          )}
                          <th style={{ 
                            padding: '12px',
                            textAlign: 'left',
                            fontWeight: '500',
                            color: '#374151',
                            whiteSpace: 'nowrap'
                          }}>
                            Attributed To
                          </th>
                          <th style={{ 
                            padding: '12px',
                            textAlign: 'left',
                            fontWeight: '500',
                            color: '#374151',
                            whiteSpace: 'nowrap'
                          }}>
                            Data Sovereignty
                          </th>
                          <th style={{ 
                            padding: '12px',
                            textAlign: 'left',
                            fontWeight: '500',
                            color: '#374151',
                            whiteSpace: 'nowrap'
                          }}>
                            Policy Action
                          </th>
                          <th style={{ 
                            padding: '12px',
                            textAlign: 'left',
                            fontWeight: '500',
                            color: '#374151',
                            whiteSpace: 'nowrap'
                          }}>
                            Enhancements
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sectionData.map((field) => {
                          const isSelected = selectedFields.some(f => f.id === field.id);
                          return (
                            <tr
                              key={field.id}
                              onClick={() => toggleFieldSelection(field)}
                              style={{
                                borderBottom: '1px solid #e5e7eb',
                                backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                                cursor: 'pointer'
                              }}
                            >
                              <td style={{ 
                                padding: '12px',
                                fontFamily: 'monospace',
                                fontSize: '13px',
                                color: isSelected ? '#1e40af' : '#111827',
                                fontWeight: isSelected ? '500' : 'normal'
                              }}>
                                {field.fieldPath}
                              </td>
                              <td style={{ padding: '12px' }}>{field.hasSchema}</td>
                              {columnVisibility.prodTag && (
                                <td style={{ padding: '12px' }}>
                                  <span style={{
                                    backgroundColor: field.prodTag === 'PII' ? '#fef2f2' : field.prodTag === 'Internal' ? '#fefce8' : '#f0fdf4',
                                    color: field.prodTag === 'PII' ? '#991b1b' : field.prodTag === 'Internal' ? '#a16207' : '#166534',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                  }}>
                                    {field.prodTag}
                                  </span>
                                </td>
                              )}
                              {columnVisibility.gcpTag && (
                                <td style={{ padding: '12px' }}>{field.gcpTag}</td>
                              )}
                              {columnVisibility.deccTag && (
                                <td style={{ padding: '12px' }}>{field.deccTag}</td>
                              )}
                              <td style={{ padding: '12px' }}>{field.attributedTo}</td>
                              <td style={{ padding: '12px' }}>{field.dataSovereignty}</td>
                              <td style={{ padding: '12px' }}>
                                <span style={{
                                  backgroundColor: field.policyAction === 'Flagged' ? '#fef2f2' : field.policyAction === 'Review Required' ? '#fefce8' : '#f0fdf4',
                                  color: field.policyAction === 'Flagged' ? '#991b1b' : field.policyAction === 'Review Required' ? '#a16207' : '#166534',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '12px'
                                }}>
                                  {field.policyAction}
                                </span>
                              </td>
                              <td style={{ padding: '12px' }}>
                                <EnhancementBadge enhancements={field.enhancements} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
    </div>
  );
};
