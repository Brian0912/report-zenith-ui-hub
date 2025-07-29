import { AnalysisReport, FolderNode, SecurityIssue, PerformanceMetrics, FieldAnalysis } from '../../types/xray';

export const mockAnalysisReports: AnalysisReport[] = [
  {
    id: 'report-1',
    curlCommand: 'curl -X POST https://api.example.com/login -H "Content-Type: application/json" -d \'{"username":"admin","password":"secret"}\'',
    timestamp: '2024-01-15 16:45:23',
    folderId: 'folder-auth',
    isStarred: true,
    isShared: true,
    method: 'POST',
    url: 'https://api.example.com/login',
    status: 200,
    statusText: 'OK',
    responseTime: 245,
    requestHeaders: {
      'Content-Type': 'application/json',
      'User-Agent': 'curl/7.68.0',
      'Accept': '*/*'
    },
    responseHeaders: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'session_id=abc123; HttpOnly; Secure',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': 'default-src \'self\'',
      'Server': 'nginx/1.18.0'
    },
    headerIssues: [],
    requestBody: '{"username":"admin","password":"secret"}',
    responseBody: '{"success":true,"token":"jwt_token_here","user":{"id":1,"username":"admin","role":"admin"}}',
    securityIssues: [
      {
        type: 'warning',
        title: 'Plain Text Credentials',
        description: 'Username and password are sent in plain text in the request body',
        recommendation: 'Consider using OAuth 2.0 or implement proper password hashing'
      },
      {
        type: 'info',
        title: 'Good Security Headers',
        description: 'Response includes security headers like X-Frame-Options and CSP',
        recommendation: 'Continue using these security headers across all endpoints'
      }
    ],
    securityScore: 75,
    performanceMetrics: {
      responseTime: 245,
      contentLength: 156,
      cacheability: 'not-cacheable'
    },
    performanceIssues: [
      'Response time could be improved with caching',
      'Consider implementing compression for larger responses'
    ],
    fields: [
      {
        name: 'Content-Type',
        type: 'header',
        value: 'application/json',
        issues: [],
        recommendations: ['Ensure consistent content-type across API'],
        securityLevel: 'safe'
      },
      {
        name: 'password',
        type: 'body',
        value: 'secret',
        issues: ['Weak password detected'],
        recommendations: ['Use strong password policy', 'Implement password hashing'],
        securityLevel: 'danger'
      }
    ]
  },
  {
    id: 'report-2',
    curlCommand: 'curl -X GET https://api.example.com/users?page=1&limit=10 -H "Authorization: Bearer token123"',
    timestamp: '2024-01-15 16:30:15',
    folderId: 'folder-users',
    isStarred: false,
    isShared: true,
    method: 'GET',
    url: 'https://api.example.com/users?page=1&limit=10',
    status: 200,
    statusText: 'OK',
    responseTime: 180,
    requestHeaders: {
      'Authorization': 'Bearer token123',
      'User-Agent': 'curl/7.68.0',
      'Accept': '*/*'
    },
    responseHeaders: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=300',
      'ETag': '"abc123"',
      'X-Rate-Limit-Remaining': '99'
    },
    headerIssues: [],
    requestBody: null,
    responseBody: '{"users":[{"id":1,"name":"John","email":"john@example.com"},{"id":2,"name":"Jane","email":"jane@example.com"}],"pagination":{"page":1,"limit":10,"total":25}}',
    securityIssues: [
      {
        type: 'info',
        title: 'Bearer Token Authentication',
        description: 'Using Bearer token for authentication',
        recommendation: 'Ensure tokens have proper expiration and rotation'
      },
      {
        type: 'warning',
        title: 'Missing Security Headers',
        description: 'Response lacks security headers like X-Frame-Options',
        recommendation: 'Add comprehensive security headers to all responses'
      }
    ],
    securityScore: 80,
    performanceMetrics: {
      responseTime: 180,
      contentLength: 256,
      cacheability: 'cacheable'
    },
    performanceIssues: [],
    fields: [
      {
        name: 'Authorization',
        type: 'header',
        value: 'Bearer token123',
        issues: [],
        recommendations: ['Implement token rotation', 'Use short-lived tokens'],
        securityLevel: 'safe'
      },
      {
        name: 'page',
        type: 'query',
        value: '1',
        issues: [],
        recommendations: ['Implement reasonable pagination limits'],
        securityLevel: 'safe'
      }
    ]
  },
  {
    id: 'report-3',
    curlCommand: 'curl -X PUT https://api.example.com/profile/123 -H "Content-Type: application/json" -d \'{"name":"John Doe","email":"john@example.com"}\'',
    timestamp: '2024-01-15 15:20:45',
    folderId: 'folder-users',
    isStarred: false,
    method: 'PUT',
    url: 'https://api.example.com/profile/123',
    status: 404,
    statusText: 'Not Found',
    responseTime: 95,
    requestHeaders: {
      'Content-Type': 'application/json',
      'User-Agent': 'curl/7.68.0'
    },
    responseHeaders: {
      'Content-Type': 'application/json',
      'Content-Length': '45'
    },
    headerIssues: ['Missing Authorization header'],
    requestBody: '{"name":"John Doe","email":"john@example.com"}',
    responseBody: '{"error":"User not found","code":404}',
    securityIssues: [
      {
        type: 'critical',
        title: 'Missing Authentication',
        description: 'Request lacks authentication headers',
        recommendation: 'Add proper authentication to all protected endpoints'
      },
      {
        type: 'warning',
        title: 'Information Disclosure',
        description: 'Error message may reveal system information',
        recommendation: 'Use generic error messages for security'
      }
    ],
    securityScore: 30,
    performanceMetrics: {
      responseTime: 95,
      contentLength: 45,
      cacheability: 'not-cacheable'
    },
    performanceIssues: [],
    fields: [
      {
        name: 'Authorization',
        type: 'header',
        value: '',
        issues: ['Missing required authentication'],
        recommendations: ['Add Authorization header with valid token'],
        securityLevel: 'danger'
      },
      {
        name: 'email',
        type: 'body',
        value: 'john@example.com',
        issues: [],
        recommendations: ['Validate email format', 'Check for email uniqueness'],
        securityLevel: 'safe'
      }
    ]
  },
  {
    id: 'report-4',
    curlCommand: 'curl -X DELETE https://api.example.com/posts/456 -H "Authorization: Bearer token123"',
    timestamp: '2024-01-15 14:15:30',
    folderId: 'folder-posts',
    isStarred: true,
    method: 'DELETE',
    url: 'https://api.example.com/posts/456',
    status: 403,
    statusText: 'Forbidden',
    responseTime: 120,
    requestHeaders: {
      'Authorization': 'Bearer token123',
      'User-Agent': 'curl/7.68.0'
    },
    responseHeaders: {
      'Content-Type': 'application/json',
      'WWW-Authenticate': 'Bearer realm="api"'
    },
    headerIssues: [],
    requestBody: null,
    responseBody: '{"error":"Insufficient permissions","message":"You do not have permission to delete this resource"}',
    securityIssues: [
      {
        type: 'info',
        title: 'Proper Authorization Check',
        description: 'Server correctly validates permissions before allowing deletion',
        recommendation: 'Maintain strict authorization checks for all destructive operations'
      }
    ],
    securityScore: 85,
    performanceMetrics: {
      responseTime: 120,
      contentLength: 98,
      cacheability: 'not-cacheable'
    },
    performanceIssues: [],
    fields: [
      {
        name: 'Authorization',
        type: 'header',
        value: 'Bearer token123',
        issues: ['Token lacks sufficient permissions'],
        recommendations: ['Use role-based access control', 'Implement permission scoping'],
        securityLevel: 'warning'
      }
    ]
  },
  {
    id: 'report-5',
    curlCommand: 'curl -X GET https://api.example.com/status -H "Accept: application/json"',
    timestamp: '2024-01-15 13:45:12',
    folderId: 'folder-monitoring',
    isStarred: false,
    method: 'GET',
    url: 'https://api.example.com/status',
    status: 200,
    statusText: 'OK',
    responseTime: 45,
    requestHeaders: {
      'Accept': 'application/json',
      'User-Agent': 'curl/7.68.0'
    },
    responseHeaders: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Response-Time': '45ms'
    },
    headerIssues: [],
    requestBody: null,
    responseBody: '{"status":"healthy","version":"1.2.3","uptime":3600,"checks":{"database":"ok","redis":"ok","external_api":"ok"}}',
    securityIssues: [
      {
        type: 'info',
        title: 'Public Health Check',
        description: 'Health check endpoint is publicly accessible',
        recommendation: 'Consider limiting information exposure in public health checks'
      }
    ],
    securityScore: 90,
    performanceMetrics: {
      responseTime: 45,
      contentLength: 125,
      cacheability: 'not-cacheable'
    },
    performanceIssues: [],
    fields: [
      {
        name: 'Accept',
        type: 'header',
        value: 'application/json',
        issues: [],
        recommendations: ['Good practice for content negotiation'],
        securityLevel: 'safe'
      }
    ]
  }
];

export const mockFolders: FolderNode[] = [
  {
    id: 'folder-default',
    name: 'Default Folder',
    type: 'folder',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    children: []
  },
  {
    id: 'folder-auth',
    name: 'Authentication APIs',
    type: 'folder',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-15T16:45:23Z',
    children: [
      {
        id: 'report-node-1',
        name: 'POST /login',
        type: 'report',
        parentId: 'folder-auth',
        reportId: 'report-1',
        createdAt: '2024-01-15T16:45:23Z',
        updatedAt: '2024-01-15T16:45:23Z'
      }
    ]
  },
  {
    id: 'folder-users',
    name: 'User Management',
    type: 'folder',
    createdAt: '2024-01-10T11:00:00Z',
    updatedAt: '2024-01-15T16:30:15Z',
    children: [
      {
        id: 'report-node-2',
        name: 'GET /users',
        type: 'report',
        parentId: 'folder-users',
        reportId: 'report-2',
        createdAt: '2024-01-15T16:30:15Z',
        updatedAt: '2024-01-15T16:30:15Z'
      },
      {
        id: 'report-node-3',
        name: 'PUT /profile/123',
        type: 'report',
        parentId: 'folder-users',
        reportId: 'report-3',
        createdAt: '2024-01-15T15:20:45Z',
        updatedAt: '2024-01-15T15:20:45Z'
      }
    ]
  },
  {
    id: 'folder-posts',
    name: 'Content Management',
    type: 'folder',
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-01-15T14:15:30Z',
    children: [
      {
        id: 'report-node-4',
        name: 'DELETE /posts/456',
        type: 'report',
        parentId: 'folder-posts',
        reportId: 'report-4',
        createdAt: '2024-01-15T14:15:30Z',
        updatedAt: '2024-01-15T14:15:30Z'
      }
    ]
  },
  {
    id: 'folder-monitoring',
    name: 'Monitoring & Health',
    type: 'folder',
    createdAt: '2024-01-10T13:00:00Z',
    updatedAt: '2024-01-15T13:45:12Z',
    children: [
      {
        id: 'report-node-5',
        name: 'GET /status',
        type: 'report',
        parentId: 'folder-monitoring',
        reportId: 'report-5',
        createdAt: '2024-01-15T13:45:12Z',
        updatedAt: '2024-01-15T13:45:12Z'
      }
    ]
  }
];