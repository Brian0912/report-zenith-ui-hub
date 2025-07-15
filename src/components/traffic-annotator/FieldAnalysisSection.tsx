
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
}

interface FieldAnalysisData {
  requestHeaders: FieldData[];
  requestQuery: FieldData[];
  requestBody: FieldData[];
  responseHeaders: FieldData[];
  responseCookies: FieldData[];
  responseBody: FieldData[];
}

interface FieldAnalysisSectionProps {
  parsedRequest: ParsedRequest | null;
  response: MockResponse;
}

export const FieldAnalysisSection: React.FC<FieldAnalysisSectionProps> = ({
  parsedRequest,
  response
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

  useEffect(() => {
    if (parsedRequest && response) {
      const analysisData = generateFieldAnalysis(parsedRequest, response);
      setFieldAnalysisData(analysisData);
    }
  }, [parsedRequest, response]);

  const createFieldData = (fieldPath: string, source: string, category: string): FieldData => ({
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
    comment: ['Needs review', 'Compliant', 'Under investigation', 'Action required'][Math.floor(Math.random() * 4)]
  });

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
        return [...prev, field];
      }
    });
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
            Field Analysis
          </h3>
          {selectedFields.length > 0 && (
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
          )}
        </div>

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
                          {['Field', 'Has Schema', 'Prod Tag', 'GCP Tag', 'DECC Tag', 'Attributed To', 'Data Sovereignty', 'Policy Action', 'Link', 'Comment'].map((header) => (
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
                              <td style={{ padding: '12px' }}>{field.gcpTag}</td>
                              <td style={{ padding: '12px' }}>{field.deccTag}</td>
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
                                <a 
                                  href={field.linkToFinding}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: '#2563eb', textDecoration: 'underline' }}
                                >
                                  View
                                </a>
                              </td>
                              <td style={{ padding: '12px' }}>{field.comment}</td>
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
    </div>
  );
};
