
import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';

interface FindingSubmissionModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const FindingSubmissionModal: React.FC<FindingSubmissionModalProps> = ({ onClose, onSubmit }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    reporter: '',
    domain: '',
    psm: '',
    path: '',
    httpMethod: 'GET',
    employeeAccessLevel: 'Standard',
    description: '',
    curlCommand: '',
    findingId: '',
    evidence: [] as File[]
  });

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '20px',
    padding: '32px',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
    margin: 0
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    padding: '4px',
    borderRadius: '6px',
    transition: 'all 0.3s ease'
  };

  const formStyle: React.CSSProperties = {
    display: 'grid',
    gap: '20px'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: theme === 'dark' ? '#e2e8f0' : '#374151'
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#475569' : '#d1d5db'}`,
    background: theme === 'dark' ? '#0f172a' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#374151',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none'
  };

  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: theme === 'dark' ? '#374151' : '#f3f4f6',
    color: theme === 'dark' ? '#f1f5f9' : '#374151'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Submit New Finding</h2>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? '#374151' : '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={gridStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Reporter Name *</label>
              <input
                type="text"
                value={formData.reporter}
                onChange={(e) => handleInputChange('reporter', e.target.value)}
                style={inputStyle}
                required
                placeholder="Enter your name"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Domain *</label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => handleInputChange('domain', e.target.value)}
                style={inputStyle}
                required
                placeholder="e.g., api.company.com"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>PSM (Service Name) *</label>
              <input
                type="text"
                value={formData.psm}
                onChange={(e) => handleInputChange('psm', e.target.value)}
                style={inputStyle}
                required
                placeholder="e.g., UserService"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Path *</label>
              <input
                type="text"
                value={formData.path}
                onChange={(e) => handleInputChange('path', e.target.value)}
                style={inputStyle}
                required
                placeholder="e.g., /api/v1/users"
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>HTTP Method *</label>
              <select
                value={formData.httpMethod}
                onChange={(e) => handleInputChange('httpMethod', e.target.value)}
                style={inputStyle}
                required
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Employee Access Level *</label>
              <select
                value={formData.employeeAccessLevel}
                onChange={(e) => handleInputChange('employeeAccessLevel', e.target.value)}
                style={inputStyle}
                required
              >
                <option value="Standard">Standard</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Guest">Guest</option>
              </select>
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Finding ID</label>
            <input
              type="text"
              value={formData.findingId}
              onChange={(e) => handleInputChange('findingId', e.target.value)}
              style={inputStyle}
              placeholder="Auto-generated if left empty"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Issue Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              style={textareaStyle}
              required
              placeholder="Describe the security finding in detail..."
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>cURL Command</label>
            <textarea
              value={formData.curlCommand}
              onChange={(e) => handleInputChange('curlCommand', e.target.value)}
              style={textareaStyle}
              placeholder="Paste the cURL command that demonstrates the issue..."
            />
          </div>

          <div style={buttonContainerStyle}>
            <button 
              type="button" 
              style={cancelButtonStyle}
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={submitButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              Submit Finding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
