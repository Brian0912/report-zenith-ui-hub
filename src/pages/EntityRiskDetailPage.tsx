
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';

interface ProblematicField {
  fieldName: string;
  fieldType: string;
  tagNumber: string;
  hasSchema: boolean;
  aplusTags: string[];
}

export const EntityRiskDetailPage: React.FC = () => {
  const { entityId, riskId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock data for problematic fields
  const mockFields: ProblematicField[] = [
    {
      fieldName: 'customerSocialSecurityNumber',
      fieldType: 'string',
      tagNumber: 'TAG_001',
      hasSchema: true,
      aplusTags: ['PII', 'SENSITIVE', 'REQUIRED']
    },
    {
      fieldName: 'userEmailAddress',
      fieldType: 'email',
      tagNumber: 'TAG_002',
      hasSchema: false,
      aplusTags: ['PII', 'CONTACT']
    },
    {
      fieldName: 'paymentCardNumber',
      fieldType: 'string',
      tagNumber: 'TAG_003',
      hasSchema: true,
      aplusTags: ['PCI', 'SENSITIVE', 'ENCRYPTED']
    },
    {
      fieldName: 'userPhoneNumber',
      fieldType: 'string',
      tagNumber: 'TAG_004',
      hasSchema: true,
      aplusTags: ['PII', 'CONTACT', 'OPTIONAL']
    },
    {
      fieldName: 'accountBalance',
      fieldType: 'decimal',
      tagNumber: 'TAG_005',
      hasSchema: false,
      aplusTags: ['FINANCIAL', 'SENSITIVE']
    },
    {
      fieldName: 'userBirthDate',
      fieldType: 'date',
      tagNumber: 'TAG_006',
      hasSchema: true,
      aplusTags: ['PII', 'DEMOGRAPHIC']
    },
    {
      fieldName: 'medicalRecordId',
      fieldType: 'string',
      tagNumber: 'TAG_007',
      hasSchema: false,
      aplusTags: ['PHI', 'SENSITIVE', 'HIPAA']
    },
    {
      fieldName: 'biometricData',
      fieldType: 'binary',
      tagNumber: 'TAG_008',
      hasSchema: true,
      aplusTags: ['BIOMETRIC', 'SENSITIVE', 'ENCRYPTED']
    },
    {
      fieldName: 'deviceFingerprint',
      fieldType: 'json',
      tagNumber: 'TAG_009',
      hasSchema: false,
      aplusTags: ['TRACKING', 'DEVICE']
    },
    {
      fieldName: 'transactionHistory',
      fieldType: 'array',
      tagNumber: 'TAG_010',
      hasSchema: true,
      aplusTags: ['FINANCIAL', 'HISTORICAL', 'AUDIT']
    },
    {
      fieldName: 'emergencyContactInfo',
      fieldType: 'object',
      tagNumber: 'TAG_011',
      hasSchema: false,
      aplusTags: ['PII', 'CONTACT', 'EMERGENCY']
    },
    {
      fieldName: 'employmentStatus',
      fieldType: 'enum',
      tagNumber: 'TAG_012',
      hasSchema: true,
      aplusTags: ['DEMOGRAPHIC', 'EMPLOYMENT']
    }
  ];

  // Mock API metadata
  const mockApiData = {
    name: 'User Management API',
    path: '/api/v2/users',
    method: 'POST',
    description: 'Handles user registration and profile management operations',
    riskName: 'Data Privacy Violation',
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    psm: 'USER-SERVICE',
    version: 'v2.1.0',
    owner: 'Platform Team'
  };

  const totalPages = Math.ceil(mockFields.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFields = mockFields.slice(startIndex, endIndex);

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    padding: '32px'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const backButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '20px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginBottom: '24px'
  };

  const sectionStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(30, 41, 59, 0.6)'
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    border: `1px solid ${theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.5)'}`,
    backdropFilter: 'blur(10px)',
    boxShadow: theme === 'dark' 
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.1)'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    marginBottom: '16px'
  };

  const metadataGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  };

  const metadataItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const metadataLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase'
  };

  const metadataValueStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155',
    fontFamily: 'monospace'
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    overflow: 'hidden',
    borderRadius: '8px'
  };

  const tableHeaderStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderBottom: `2px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`
  };

  const tableHeaderCellStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '13px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const tableRowStyle = (index: number): React.CSSProperties => ({
    background: index % 2 === 0 
      ? (theme === 'dark' ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)')
      : 'transparent',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    transition: 'all 0.2s ease'
  });

  const tableCellStyle: React.CSSProperties = {
    padding: '12px',
    fontSize: '13px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '2px 6px',
    borderRadius: '10px',
    fontSize: '10px',
    fontWeight: '600',
    marginRight: '4px',
    marginBottom: '2px'
  };

  const paginationStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '16px',
    padding: '16px 0'
  };

  const pageButtonStyle: React.CSSProperties = {
    background: theme === 'dark' ? '#334155' : '#f1f5f9',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginRight: '8px'
  };

  const currentPageButtonStyle: React.CSSProperties = {
    ...pageButtonStyle,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none'
  };

  const selectStyle: React.CSSProperties = {
    background: theme === 'dark' ? '#334155' : '#f1f5f9',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#cbd5e1'}`,
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const changeItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <button
          style={backButtonStyle}
          onClick={() => navigate('/aplus')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(99, 102, 241, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ← Back to Risk Matrix
        </button>
        
        <h1 style={titleStyle}>API Risk Detail</h1>
        <p style={subtitleStyle}>
          Detailed analysis of risk factors and problematic fields
        </p>
      </div>

      {/* API Metadata Section */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>API Information</h2>
        <div style={metadataGridStyle}>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>API Name</span>
            <span style={metadataValueStyle}>{mockApiData.name}</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>Path</span>
            <span style={metadataValueStyle}>{mockApiData.path}</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>Method</span>
            <span style={metadataValueStyle}>{mockApiData.method}</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>PSM</span>
            <span style={metadataValueStyle}>{mockApiData.psm}</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>Version</span>
            <span style={metadataValueStyle}>{mockApiData.version}</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>Owner</span>
            <span style={metadataValueStyle}>{mockApiData.owner}</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>Risk Name</span>
            <span style={metadataValueStyle}>{mockApiData.riskName}</span>
          </div>
          <div style={metadataItemStyle}>
            <span style={metadataLabelStyle}>Last Updated</span>
            <span style={metadataValueStyle}>{mockApiData.lastUpdated.toLocaleDateString()}</span>
          </div>
        </div>
        <div style={{marginTop: '16px'}}>
          <span style={metadataLabelStyle}>Description</span>
          <p style={{...metadataValueStyle, fontFamily: 'inherit', marginTop: '4px'}}>
            {mockApiData.description}
          </p>
        </div>
      </div>

      {/* Problematic Fields Table */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Problematic Fields</h2>
        <table style={tableStyle}>
          <thead style={tableHeaderStyle}>
            <tr>
              <th style={tableHeaderCellStyle}>Field Name</th>
              <th style={tableHeaderCellStyle}>Field Type</th>
              <th style={tableHeaderCellStyle}>Tag Number</th>
              <th style={tableHeaderCellStyle}>Has Schema</th>
              <th style={tableHeaderCellStyle}>APlus Tags</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFields.map((field, index) => (
              <tr 
                key={field.fieldName} 
                style={tableRowStyle(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme === 'dark' ? 'rgba(55, 65, 81, 0.3)' : 'rgba(226, 232, 240, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = index % 2 === 0 
                    ? (theme === 'dark' ? 'rgba(30, 41, 59, 0.3)' : 'rgba(248, 250, 252, 0.8)')
                    : 'transparent';
                }}
              >
                <td style={{...tableCellStyle, fontFamily: 'monospace'}}>{field.fieldName}</td>
                <td style={tableCellStyle}>{field.fieldType}</td>
                <td style={{...tableCellStyle, fontFamily: 'monospace'}}>{field.tagNumber}</td>
                <td style={tableCellStyle}>
                  <span style={{
                    color: field.hasSchema ? '#10b981' : '#ef4444',
                    fontWeight: '600'
                  }}>
                    {field.hasSchema ? 'Yes' : 'No'}
                  </span>
                </td>
                <td style={tableCellStyle}>
                  {field.aplusTags.map((tag, tagIndex) => (
                    <span key={tagIndex} style={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={paginationStyle}>
          <div style={{ fontSize: '13px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
            Showing {startIndex + 1}-{Math.min(endIndex, mockFields.length)} of {mockFields.length} fields
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              style={pageButtonStyle}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, currentPage - 2) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  style={pageNum === currentPage ? currentPageButtonStyle : pageButtonStyle}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              style={pageButtonStyle}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            
            <select
              style={selectStyle}
              value={itemsPerPage}
              onChange={(e) => changeItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
