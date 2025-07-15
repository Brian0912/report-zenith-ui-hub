
import { ParsedRequest, MockResponse, FieldAnalysisData, FieldData, Enhancement } from './CurlAnalysisPanel';

export function parseCurl(curlCommand: string): ParsedRequest {
  try {
    const trimmed = curlCommand.trim();
    if (!trimmed.startsWith('curl')) {
      throw new Error('Command must start with curl');
    }

    const urlMatch = trimmed.match(/curl\s+['"]?([^'"\s]+)['"]?/);
    if (!urlMatch) {
      throw new Error('No URL found in cURL command');
    }
    const url = urlMatch[1];

    const methodMatch = trimmed.match(/-X\s+([A-Z]+)/);
    const method = methodMatch ? methodMatch[1] : 'GET';

    const headerMatches = trimmed.match(/-H\s+['"]([^'"]+)['"]/g) || [];
    const headers: Record<string, string> = {};
    headerMatches.forEach((match) => {
      const headerMatch = match.match(/-H\s+['"]([^'"]+)['"]/);
      if (headerMatch) {
        const parts = headerMatch[1].split(':');
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        headers[key] = value;
      }
    });

    const bodyMatch = trimmed.match(/-d\s+['"]([^'"]*)['"]/);
    const body = bodyMatch ? bodyMatch[1] : null;

    return { url, method, headers, body };
  } catch (err) {
    throw new Error(`Failed to parse cURL: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

function extractFieldPaths(obj: any, prefix: string = ''): string[] {
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
}

function extractQueryParams(url: string): string[] {
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
}

function createFieldData(fieldPath: string, source: string, category: string): FieldData {
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
    comment: ['Needs review', 'Compliant', 'Under investigation', 'Action required'][Math.floor(Math.random() * 4)]
  };
}

export function generateFieldAnalysis(request: ParsedRequest, response: MockResponse): FieldAnalysisData {
  const analysis: FieldAnalysisData = {
    requestHeaders: [],
    requestQuery: [],
    requestBody: [],
    responseHeaders: [],
    responseCookies: [],
    responseBody: []
  };
  
  if (request.headers && Object.keys(request.headers).length > 0) {
    Object.keys(request.headers).forEach((header) => {
      analysis.requestHeaders.push(createFieldData(header, 'Request', 'Header'));
    });
  }

  const queryFields = extractQueryParams(request.url);
  queryFields.forEach((field) => {
    const paramName = field.replace('query.', '');
    analysis.requestQuery.push(createFieldData(paramName, 'Request', 'Query'));
  });

  if (request.body) {
    try {
      const requestData = JSON.parse(request.body);
      const bodyFields = extractFieldPaths(requestData, '');
      bodyFields.forEach((field) => {
        analysis.requestBody.push(createFieldData(field, 'Request', 'Body'));
      });
    } catch (e) {
      analysis.requestBody.push(createFieldData('body', 'Request', 'Body'));
    }
  }

  if (response && response.headers) {
    Object.keys(response.headers).forEach((header) => {
      if (header !== 'Set-Cookie') {
        analysis.responseHeaders.push(createFieldData(header, 'Response', 'Header'));
      }
    });
  }

  if (response && response.headers && response.headers['Set-Cookie']) {
    const cookies = ['session_id', 'user_pref', 'csrf_token'];
    cookies.forEach((cookie) => {
      analysis.responseCookies.push(createFieldData(cookie, 'Response', 'Cookie'));
    });
  }

  if (response && response.body) {
    try {
      const responseData = JSON.parse(response.body);
      const bodyFields = extractFieldPaths(responseData, '');
      bodyFields.forEach((field) => {
        analysis.responseBody.push(createFieldData(field, 'Response', 'Body'));
      });
    } catch (e) {
      analysis.responseBody.push(createFieldData('body', 'Response', 'Body'));
    }
  }

  return analysis;
}

export function generateApiEnhancements(request: ParsedRequest): Enhancement[] {
  return [
    {
      id: 'enc_001',
      title: 'PII Encryption at Rest',
      description: 'Encrypt all PII fields in request/response bodies',
      priority: 'High',
      status: 'Pending Implementation',
      governanceSchedule: '2025-03-15T09:00:00Z',
      affectedFieldTypes: ['Request Body', 'Response Body'],
      compliance: 'GDPR Article 32',
      owner: 'Security Team',
      estimatedEffort: '3 weeks'
    },
    {
      id: 'enc_002', 
      title: 'Header Sanitization',
      description: 'Remove sensitive information from request headers in logs',
      priority: 'Medium',
      status: 'In Review',
      governanceSchedule: '2025-02-28T17:00:00Z',
      affectedFieldTypes: ['Request Headers'],
      compliance: 'SOC 2 Type II',
      owner: 'Infrastructure Team',
      estimatedEffort: '1 week'
    },
    {
      id: 'enc_003',
      title: 'Cookie Security Hardening',
      description: 'Implement SameSite=Strict and Secure flags for all cookies',
      priority: 'Medium',
      status: 'Approved',
      governanceSchedule: '2025-02-15T12:00:00Z',
      affectedFieldTypes: ['Response Cookies'],
      compliance: 'OWASP Security Guidelines',
      owner: 'Backend Team',
      estimatedEffort: '2 days'
    }
  ];
}
