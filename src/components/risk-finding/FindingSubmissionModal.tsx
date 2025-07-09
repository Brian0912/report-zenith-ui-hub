
import React, { useState } from 'react';

interface FindingSubmissionModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const FindingSubmissionModal: React.FC<FindingSubmissionModalProps> = ({ onClose, onSubmit }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'technical'>('basic');
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
    evidence: [] as File[],
    relatedFields: [] as string[]
  });

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  };

  const modalStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '16px',
    padding: '0',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #e5e7eb'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '4px',
    borderRadius: '4px'
  };

  const tabsStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: '1px solid #e5e7eb'
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '16px 24px',
    border: 'none',
    background: 'none',
    color: active ? '#3b82f6' : '#6b7280',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: active ? '2px solid #3b82f6' : '2px solid transparent',
    transition: 'all 0.2s ease'
  });

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '24px',
    overflowY: 'auto'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px'
  };

  const fieldGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: 'white',
    color: '#374151',
    fontSize: '14px',
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
    padding: '24px',
    borderTop: '1px solid #e5e7eb'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none'
  };

  const submitButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white'
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151'
  };

  const addFieldButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '1px dashed #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRelatedField = () => {
    setFormData(prev => ({
      ...prev,
      relatedFields: [...prev.relatedFields, '']
    }));
  };

  const renderBasicInfo = () => (
    <>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Basic Information</h3>
        <div style={fieldGridStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Reporter Name *</label>
            <input
              type="text"
              value={formData.reporter}
              onChange={(e) => handleInputChange('reporter', e.target.value)}
              style={inputStyle}
              required
              placeholder="Enter reporter name"
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Finding ID</label>
            <input
              type="text"
              value={formData.findingId}
              onChange={(e) => handleInputChange('findingId', e.target.value)}
              style={inputStyle}
              placeholder="Auto-generated if empty"
            />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Finding Description</h3>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          style={textareaStyle}
          required
          placeholder="Describe the security finding in detail..."
        />
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Related Fields</h3>
        {formData.relatedFields.map((field, index) => (
          <input
            key={index}
            type="text"
            value={field}
            onChange={(e) => {
              const newFields = [...formData.relatedFields];
              newFields[index] = e.target.value;
              setFormData(prev => ({ ...prev, relatedFields: newFields }));
            }}
            style={{ ...inputStyle, marginBottom: '8px' }}
            placeholder="Enter related field"
          />
        ))}
        <button
          type="button"
          style={addFieldButtonStyle}
          onClick={addRelatedField}
        >
          <span>➕</span>
          Add Field
        </button>
      </div>
    </>
  );

  const renderTechnicalDetails = () => (
    <>
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Technical Details</h3>
        <div style={fieldGridStyle}>
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
            <label style={labelStyle}>Service Name *</label>
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
            <label style={labelStyle}>Access Level *</label>
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
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>cURL Command</h3>
        <textarea
          value={formData.curlCommand}
          onChange={(e) => handleInputChange('curlCommand', e.target.value)}
          style={textareaStyle}
          placeholder="Paste the cURL command that demonstrates the issue..."
        />
      </div>
    </>
  );

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Submit New Finding</h2>
          <button style={closeButtonStyle} onClick={onClose}>✕</button>
        </div>

        <div style={tabsStyle}>
          <button 
            style={tabStyle(activeTab === 'basic')}
            onClick={() => setActiveTab('basic')}
          >
            Basic Information
          </button>
          <button 
            style={tabStyle(activeTab === 'technical')}
            onClick={() => setActiveTab('technical')}
          >
            Technical Details
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={contentStyle}>
            {activeTab === 'basic' && renderBasicInfo()}
            {activeTab === 'technical' && renderTechnicalDetails()}
          </div>

          <div style={buttonContainerStyle}>
            <button type="button" style={cancelButtonStyle} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={submitButtonStyle}>
              Submit Finding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
