export interface AnalysisReport {
  id: string;
  curlCommand: string;
  timestamp: string;
  folderId: string;
  isStarred: boolean;
  
  // Basic API Info
  method: string;
  url: string;
  status: number;
  statusText: string;
  responseTime: number;
  
  // Headers Analysis
  requestHeaders: Record<string, string>;
  responseHeaders: Record<string, string>;
  headerIssues: string[];
  
  // Request/Response Data
  requestBody: string | null;
  responseBody: string;
  
  // Security Assessment
  securityIssues: SecurityIssue[];
  securityScore: number;
  
  // Performance Metrics
  performanceMetrics: PerformanceMetrics;
  performanceIssues: string[];
  
  // Field Analysis
  fields: FieldAnalysis[];
}

export interface SecurityIssue {
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  recommendation: string;
}

export interface PerformanceMetrics {
  responseTime: number;
  contentLength: number;
  compressionRatio?: number;
  cacheability: 'cacheable' | 'not-cacheable' | 'private';
}

export interface FieldAnalysis {
  name: string;
  type: 'header' | 'query' | 'body' | 'response';
  value: string;
  issues: string[];
  recommendations: string[];
  securityLevel: 'safe' | 'warning' | 'danger';
}

export interface FolderNode {
  id: string;
  name: string;
  type: 'folder' | 'report';
  parentId?: string;
  children?: FolderNode[];
  reportId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface XRayState {
  reports: AnalysisReport[];
  folders: FolderNode[];
  starredReportIds: Set<string>;
  selectedFolderId: string;
  currentReport: AnalysisReport | null;
  searchTerm: string;
}