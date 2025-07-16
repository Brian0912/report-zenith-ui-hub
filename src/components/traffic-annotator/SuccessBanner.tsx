
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
    const urlObj = new URL(request.url);
    const host = urlObj.hostname;
    const psmService = host.replace(/\./g, '.').substring(0, 15) + '.service.api';
    const apiPath = urlObj.pathname;
    const httpMethod = request.method.toUpperCase();
    const bytetree = 'Security';
    
    return { host, psmService, apiPath, httpMethod, bytetree };
  };

  const { host, psmService, apiPath, httpMethod, bytetree } = extractTrafficInfo(parsedRequest);

  const handleEnhancementLinkClick = () => {
    console.log('Navigate to enhancement page');
  };

  const bannerStyle: React.CSSProperties = {
    backgroundColor: '#f0f9ff',
    border: '1px solid #0ea5e9',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '24px'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  };

  const titleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#0c4a6e',
    margin: 0
  };

  const trafficInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    fontSize: '14px'
  };

  const infoItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#64748b',
    textTransform: 'uppercase' as const,
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
    padding: '8px 16px',
    backgroundColor: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  return (
    <div style={bannerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>
          <CheckCircle size={20} color="#0ea5e9" />
          Traffic Analysis Complete
        </h3>
        
        <button
          onClick={handleEnhancementLinkClick}
          style={linkButtonStyle}
        >
          <ExternalLink size={16} />
          View Enhancement Page
        </button>
      </div>
      
      <div style={trafficInfoStyle}>
        <div style={infoItemStyle}>
          <span style={labelStyle}>Host</span>
          <span style={valueStyle}>{host}</span>
        </div>
        
        <div style={infoItemStyle}>
          <span style={labelStyle}>PSM</span>
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
    </div>
  );
};
