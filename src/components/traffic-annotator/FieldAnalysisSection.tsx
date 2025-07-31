import React, { useState, useEffect, useMemo } from 'react';
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
import { TableFilters } from './TableFilters';
import { PaginatedTable } from './PaginatedTable';
import { FloatingSelectionModal } from './FloatingSelectionModal';
import { AnnotationModal } from './AnnotationModal';


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

export interface CommentData {
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
  const [viewMode, setViewMode] = useState<ViewMode>('table');
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

  // Table filters
  const [fieldFilter, setFieldFilter] = useState('');
  const [hasSchemaFilter, setHasSchemaFilter] = useState<boolean | null>(null);
  const [policyActionFilter, setPolicyActionFilter] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Annotation modal
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);

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

  const getAllFields = (): FieldData[] => {
    return Object.values(fieldAnalysisData).flat();
  };

  // Filtered fields based on filters
  const filteredFields = useMemo(() => {
    const allFields = getAllFields();
    
    return allFields.filter(field => {
      // Field name filter (fuzzy search)
      const fieldMatches = fieldFilter === '' || 
        field.fieldPath.toLowerCase().includes(fieldFilter.toLowerCase());
      
      // Has Schema filter
      const schemaMatches = hasSchemaFilter === null || 
        (hasSchemaFilter ? field.hasSchema === 'Yes' : field.hasSchema === 'No');
      
      // Policy Action filter
      const policyMatches = policyActionFilter === 'All' || 
        field.policyAction === policyActionFilter;
      
      return fieldMatches && schemaMatches && policyMatches;
    });
  }, [fieldAnalysisData, fieldFilter, hasSchemaFilter, policyActionFilter]);

  // Paginated fields
  const paginatedFields = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredFields.slice(startIndex, endIndex);
  }, [filteredFields, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredFields.length / rowsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [fieldFilter, hasSchemaFilter, policyActionFilter, rowsPerPage]);

  const handleAnnotationSave = (commentData: CommentData) => {
    const annotationGroup = {
      fields: selectedFields,
      groupComment: commentData,
      timestamp: new Date().toISOString()
    };
    setSavedAnnotations(prev => [...prev, annotationGroup]);
    setSelectedFields([]);
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
          </div>
        </div>

        {/* Table Filters */}
        {viewMode === 'table' && (
          <TableFilters
            fieldFilter={fieldFilter}
            onFieldFilterChange={setFieldFilter}
            hasSchemaFilter={hasSchemaFilter}
            onHasSchemaFilterChange={setHasSchemaFilter}
            policyActionFilter={policyActionFilter}
            onPolicyActionFilterChange={setPolicyActionFilter}
          />
        )}

        {/* Field Analysis Views */}
        {viewMode === 'table' && (
          <PaginatedTable
            fields={paginatedFields}
            columnVisibility={columnVisibility}
            selectedFields={selectedFields}
            onFieldToggle={toggleFieldSelection}
            onEditField={handleEditField}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
            totalRows={filteredFields.length}
          />
        )}

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
        onSave={handleSaveAnnotations}
      />

      <FloatingSelectionModal
        selectedCount={selectedFields.length}
        onViewAnnotate={() => setShowAnnotationModal(true)}
      />

      <AnnotationModal
        isOpen={showAnnotationModal}
        onClose={() => setShowAnnotationModal(false)}
        selectedFields={selectedFields}
        onConfirm={handleAnnotationSave}
      />

    </div>
  );
};
