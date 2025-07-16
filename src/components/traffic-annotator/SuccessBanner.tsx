
import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

interface ParsedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

interface SuccessBannerProps {
  parsedRequest: ParsedRequest;
}

export const SuccessBanner: React.FC<SuccessBannerProps> = ({ parsedRequest }) => {
  const extractTrafficInfo = (request: ParsedRequest) => {
    // Extract PSM service name (mock format)
    const hostname = new URL(request.url).hostname;
    const psmService = hostname.replace(/\./g, '.').substring(0, 15) + '.service.api';
    
    // Extract API path
    const apiPath = new URL(request.url).pathname;
    
    // Extract HTTP method
    const httpMethod = request.method.toUpperCase();
    
    // Mock bytetree info
    const bytetree = 'data.users.profile';
    
    return { psmService, apiPath, httpMethod, bytetree };
  };

  const { psmService, apiPath, httpMethod, bytetree } = extractTrafficInfo(parsedRequest);

  const handleEnhancementLinkClick = () => {
    console.log('Navigate to enhancement page');
    // Navigation logic would go here
  };

  const bannerStyle: React.CSSProperties = {
    backgroundColor: '#f0f9ff',
    border: '1px solid #0ea5e9',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0c4a6e',
    margin: 0
  };

  const infoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  };

  const infoItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1e293b',
    fontFamily: 'monospace'
  };

  const linkButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    marginTop: '8px'
  };

  return (
    <div style={bannerStyle}>
      <div style={headerStyle}>
        <CheckCircle size={20} color="#0ea5e9" />
        <h3 style={titleStyle}>Traffic Analysis Complete</h3>
      </div>
      
      <div style={infoGridStyle}>
        <div style={infoItemStyle}>
          <span style={labelStyle}>PSM Service</span>
          <span style={valueStyle}>{psmService}</span>
        </div>
        
        <div style={infoItemStyle}>
          <span style={labelStyle}>API Path</span>
          <span style={valueStyle}>{apiPath}</span>
        </div>
        
        <div style={infoItemStyle}>
          <span style={labelStyle}>HTTP Method</span>
          <span style={valueStyle}>{httpMethod}</span>
        </div>
        
        <div style={infoItemStyle}>
          <span style={labelStyle}>Bytetree</span>
          <span style={valueStyle}>{bytetree}</span>
        </div>
      </div>
      
      <button
        onClick={handleEnhancementLinkClick}
        style={linkButtonStyle}
      >
        <ExternalLink size={16} />
        View Enhancement Page
      </button>
    </div>
  );
};
