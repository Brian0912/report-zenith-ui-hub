import React, { useState, useEffect, useMemo } from 'react';
import { Save, X, Search, Edit, Eye, Settings } from 'lucide-react';
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
import { CommentEditor } from './CommentEditor';


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
  const [savedAnnotations, setSavedAnnotations] = useState<{fields: FieldData[], groupComment: CommentData, timestamp: string}[]>([]);
  const [expandedAnnotations, setExpandedAnnotations] = useState<Record<number, boolean>>({});
  const [editingField, setEditingField] = useState<FieldData | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
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
  
  // Define getAllFields function first
  const getAllFields = (): FieldData[] => {
    return Object.values(fieldAnalysisData).flat();
  };
  
  // Pagination and filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [filters, setFilters] = useState({
    field: '',
    hasSchema: 'all', // 'all', 'yes', 'no'
    policyAction: 'all'
  });

  // Selected rows modal states
  const [showSelectedModal, setShowSelectedModal] = useState(false);
  const [selectedRowsComment, setSelectedRowsComment] = useState<CommentData>({ text: '', images: [] });

  // Get unique policy actions for filter dropdown
  const policyActions = useMemo(() => {
    const actions = new Set(getAllFields().map(field => field.policyAction));
    return Array.from(actions);
  }, [fieldAnalysisData]);

  // Filter and paginate data
  const filteredAndPaginatedData = useMemo(() => {
    const allFields = getAllFields();
    
    // Apply filters
    const filtered = allFields.filter(field => {
      const matchesField = filters.field === '' || 
        field.fieldPath.toLowerCase().includes(filters.field.toLowerCase()) ||
        field.source.toLowerCase().includes(filters.field.toLowerCase()) ||
        field.category.toLowerCase().includes(filters.field.toLowerCase());
      
      const matchesSchema = filters.hasSchema === 'all' || 
        (filters.hasSchema === 'yes' && field.hasSchema === 'Yes') ||
        (filters.hasSchema === 'no' && field.hasSchema === 'No');
      
      const matchesPolicy = filters.policyAction === 'all' || 
        field.policyAction === filters.policyAction;
      
      return matchesField && matchesSchema && matchesPolicy;
    });

    // Calculate pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      totalItems,
      totalPages,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    };
  }, [fieldAnalysisData, filters, currentPage, pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

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


  const handleSaveAnnotations = (annotations: FieldData[], groupComment?: CommentData) => {
    // Add the annotations as a new group with group comment
    const annotationGroup = {
      fields: annotations,
      groupComment: groupComment || { text: '', images: [] },
      timestamp: new Date().toISOString()
    };
    setSavedAnnotations(prev => [...prev, annotationGroup]);
    // Clear selected fields after saving
    setSelectedFields([]);
    // Expand the newly added annotation group
    setExpandedAnnotations(prev => ({ ...prev, [savedAnnotations.length]: true }));
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
        
        {/* Annotation Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '16px' }}>
            Annotation
          </h3>
          <div style={{ 
            border: '1px solid #e5e7eb', 
            borderRadius: '8px', 
            backgroundColor: '#f9fafb',
            minHeight: '120px'
          }}>
            {savedAnnotations.length === 0 ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '120px',
                color: '#9ca3af',
                fontSize: '14px'
              }}>
                No annotations available
              </div>
            ) : (
              <div style={{ padding: '16px' }}>
                {savedAnnotations.map((annotationGroup, groupIndex) => {
                  const isExpanded = expandedAnnotations[groupIndex] ?? false;
                  const timestamp = new Date(annotationGroup.timestamp).toLocaleString();
                  
                  return (
                    <div key={groupIndex} style={{ 
                      marginBottom: groupIndex === savedAnnotations.length - 1 ? '0' : '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff'
                    }}>
                      <div 
                        style={{ 
                          padding: '12px 16px',
                          borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                        onClick={() => setExpandedAnnotations(prev => ({ 
                          ...prev, 
                          [groupIndex]: !isExpanded 
                        }))}
                      >
                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            fontWeight: '500', 
                            color: '#374151',
                            marginBottom: '4px'
                          }}>
                            {(typeof annotationGroup.groupComment === 'string' ? annotationGroup.groupComment : annotationGroup.groupComment?.text) || `Annotation Group ${groupIndex + 1}`} ({annotationGroup.fields.length} fields)
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#6b7280'
                          }}>
                            Saved: {timestamp}
                          </div>
                        </div>
                        <div style={{ 
                          fontSize: '18px', 
                          color: '#6b7280',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s'
                        }}>
                          ▼
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div style={{ padding: '16px' }}>
                          {annotationGroup.fields.map((field, fieldIndex) => (
                            <div key={field.id} style={{ 
                              marginBottom: fieldIndex === annotationGroup.fields.length - 1 ? '0' : '12px',
                              padding: '8px 12px',
                              backgroundColor: '#f9fafb',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px'
                            }}>
                              <div style={{ 
                                fontSize: '13px', 
                                fontWeight: '500', 
                                color: '#374151',
                                marginBottom: '6px'
                              }}>
                                {field.fieldPath} ({field.source} {field.category})
                              </div>
                              {field.selectedComment?.text && (
                                <div style={{ 
                                  fontSize: '14px', 
                                  color: '#1f2937',
                                  lineHeight: '1.4',
                                  marginBottom: '4px'
                                }}>
                                  {field.selectedComment.text}
                                </div>
                              )}
                              {field.selectedFinding && (
                                <div style={{ 
                                  fontSize: '12px', 
                                  color: '#6b7280'
                                }}>
                                  Finding: {field.selectedFinding}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
            Field Analysis ({filteredAndPaginatedData.totalItems} fields)
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              <Settings size={16} />
              Vision Fields
            </button>
            
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
                  Add Annotations
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '24px', 
          flexWrap: 'wrap',
          padding: '16px',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          {/* Field Filter */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Field
            </label>
            <div style={{ position: 'relative' }}>
              <Search 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}
              />
              <input
                type="text"
                value={filters.field}
                onChange={(e) => setFilters(prev => ({ ...prev, field: e.target.value }))}
                placeholder="Search field path, source, or category..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Has Schema Filter */}
          <div style={{ minWidth: '150px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Has Schema
            </label>
            <select
              value={filters.hasSchema}
              onChange={(e) => setFilters(prev => ({ ...prev, hasSchema: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Policy Action Filter */}
          <div style={{ minWidth: '150px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Policy Action
            </label>
            <select
              value={filters.policyAction}
              onChange={(e) => setFilters(prev => ({ ...prev, policyAction: e.target.value }))}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="all">All</option>
              {policyActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
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

        {/* Field Analysis Table */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 1fr 1fr 120px 120px 120px 80px',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
            padding: '12px 16px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase'
          }}>
            <div></div>
            <div>Field Path</div>
            <div>Source</div>
            <div>Category</div>
            <div>Has Schema</div>
            <div>Policy Action</div>
            <div>Data Sovereignty</div>
            <div>Actions</div>
          </div>

          {/* Table Body */}
          {filteredAndPaginatedData.data.length === 0 ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px',
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              No fields match the current filters
            </div>
          ) : (
            filteredAndPaginatedData.data.map((field, index) => {
              const isSelected = selectedFields.some(f => f.id === field.id);
              return (
                <div
                  key={field.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 1fr 1fr 120px 120px 120px 80px',
                    padding: '12px 16px',
                    borderBottom: index === filteredAndPaginatedData.data.length - 1 ? 'none' : '1px solid #f3f4f6',
                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                    fontSize: '14px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }
                  }}
                  onClick={() => toggleFieldSelection(field)}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#3b82f6'
                      }}
                    />
                  </div>
                  <div style={{ fontWeight: '500', color: '#1f2937' }}>
                    {field.fieldPath}
                  </div>
                  <div style={{ color: '#6b7280' }}>
                    {field.source}
                  </div>
                  <div style={{ color: '#6b7280' }}>
                    {field.category}
                  </div>
                  <div>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: field.hasSchema === 'Yes' ? '#dcfce7' : '#fef3c7',
                      color: field.hasSchema === 'Yes' ? '#166534' : '#92400e'
                    }}>
                      {field.hasSchema}
                    </span>
                  </div>
                  <div style={{ color: '#6b7280' }}>
                    {field.policyAction}
                  </div>
                  <div style={{ color: '#6b7280' }}>
                    {field.dataSovereignty}
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditField(field);
                      }}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: '#6b7280'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                    >
                      <Edit size={12} />
                      Edit
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {filteredAndPaginatedData.totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredAndPaginatedData.totalItems)} of {filteredAndPaginatedData.totalItems} results
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={!filteredAndPaginatedData.hasPreviousPage}
                style={{
                  padding: '8px 12px',
                  backgroundColor: filteredAndPaginatedData.hasPreviousPage ? '#ffffff' : '#f3f4f6',
                  color: filteredAndPaginatedData.hasPreviousPage ? '#374151' : '#9ca3af',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: filteredAndPaginatedData.hasPreviousPage ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Previous
              </button>
              
              {Array.from({ length: filteredAndPaginatedData.totalPages }, (_, i) => i + 1)
                .filter(page => 
                  page === 1 || 
                  page === filteredAndPaginatedData.totalPages || 
                  Math.abs(page - currentPage) <= 1
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: page === currentPage ? '#3b82f6' : '#ffffff',
                        color: page === currentPage ? '#ffffff' : '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '40px'
                      }}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
              
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!filteredAndPaginatedData.hasNextPage}
                style={{
                  padding: '8px 12px',
                  backgroundColor: filteredAndPaginatedData.hasNextPage ? '#ffffff' : '#f3f4f6',
                  color: filteredAndPaginatedData.hasNextPage ? '#374151' : '#9ca3af',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: filteredAndPaginatedData.hasNextPage ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Selected rows floating modal */}
        {selectedFields.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: 1000,
            animation: 'slideUp 0.3s ease-out'
          }}>
            <div style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
              {selectedFields.length} row{selectedFields.length !== 1 ? 's' : ''} selected
            </div>
            <button
              onClick={() => setShowSelectedModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              <Eye size={16} />
              View & Annotate
            </button>
          </div>
        )}
      </div>

      {editingField && (
        <FieldEditModal
          isOpen={!!editingField}
          onClose={() => setEditingField(null)}
          field={editingField}
          onSave={handleSaveFieldEdit}
        />
      )}

      {showSaveModal && (
        <SaveAnnotationsModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          selectedFields={selectedFields}
          onSave={handleSaveAnnotations}
          curlInput={curlInput}
          parsedRequest={parsedRequest}
          response={response}
        />
      )}

      {/* Selected Rows Modal */}
      {showSelectedModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '80%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', margin: 0 }}>
                  Selected Rows Annotation
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0' }}>
                  Add comments and annotations to {selectedFields.length} selected row{selectedFields.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setShowSelectedModal(false)}
                style={{
                  padding: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ 
              padding: '24px', 
              overflowY: 'auto',
              flex: 1
            }}>
              {/* Comment Editor */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Add Comment
                </label>
                <CommentEditor
                  value={selectedRowsComment}
                  onChange={setSelectedRowsComment}
                  placeholder="Add your comment about these selected fields..."
                />
              </div>

              {/* Selected Fields Preview */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '12px' }}>
                  Selected Fields ({selectedFields.length})
                </h4>
                <div style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {selectedFields.map((field, index) => (
                    <div
                      key={field.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: index === selectedFields.length - 1 ? 'none' : '1px solid #f3f4f6',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>
                        {field.fieldPath}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {field.source} • {field.category} • {field.policyAction}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '24px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={() => setShowSelectedModal(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSaveAnnotations(selectedFields, selectedRowsComment);
                  setSelectedRowsComment({ text: '', images: [] });
                  setShowSelectedModal(false);
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#10B981',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Confirm Annotation
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};