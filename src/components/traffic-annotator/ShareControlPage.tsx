import React, { useState } from 'react';
import { Share, MoreVertical, Clock, Globe, Lock } from 'lucide-react';

interface SharedScan {
  id: string;
  name: string;
  curlCommand: string;
  sharedAt: string;
  accessType: 'public' | 'private';
  expiresAt?: string;
  sharedWith?: string[];
}

interface ShareConfigPopupProps {
  isOpen: boolean;
  onClose: () => void;
  scan: SharedScan | null;
  onSave: (config: { accessType: 'public' | 'private'; expiresAt?: string; sharedWith?: string[] }) => void;
}

const ShareConfigPopup: React.FC<ShareConfigPopupProps> = ({ isOpen, onClose, scan, onSave }) => {
  const [accessType, setAccessType] = useState<'public' | 'private'>(scan?.accessType || 'public');
  const [expirationTime, setExpirationTime] = useState(scan?.expiresAt || '');
  const [username, setUsername] = useState('');

  if (!isOpen || !scan) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  };

  const popupStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    width: '400px',
    maxWidth: '90vw',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1f2937'
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '16px'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '6px',
    color: '#374151'
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px'
  };

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px'
  };

  const toggleButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: '8px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
  };

  const activeToggleStyle: React.CSSProperties = {
    ...toggleButtonStyle,
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white'
  };

  const buttonRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '20px'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };

  const cancelButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151'
  };

  const saveButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={popupStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={headerStyle}>Share Configuration</h3>
        
        <div style={fieldStyle}>
          <label style={labelStyle}>Access Type</label>
          <div style={toggleStyle}>
            <button
              style={accessType === 'public' ? activeToggleStyle : toggleButtonStyle}
              onClick={() => setAccessType('public')}
            >
              <Globe size={14} style={{ marginRight: '6px', display: 'inline' }} />
              Public
            </button>
            <button
              style={accessType === 'private' ? activeToggleStyle : toggleButtonStyle}
              onClick={() => setAccessType('private')}
            >
              <Lock size={14} style={{ marginRight: '6px', display: 'inline' }} />
              Private
            </button>
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Expiration Time</label>
          <input
            type="datetime-local"
            style={inputStyle}
            value={expirationTime}
            onChange={(e) => setExpirationTime(e.target.value)}
          />
        </div>

        {accessType === 'private' && (
          <div style={fieldStyle}>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              placeholder="Enter username to share with"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div style={buttonRowStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>
            Cancel
          </button>
          <button
            style={saveButtonStyle}
            onClick={() => {
              onSave({
                accessType,
                expiresAt: expirationTime || undefined,
                sharedWith: accessType === 'private' && username ? [username] : undefined
              });
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export const ShareControlPage: React.FC = () => {
  const [sharedScans, setSharedScans] = useState<SharedScan[]>([
    {
      id: '1',
      name: 'User Profile API',
      curlCommand: 'curl -X POST "https://api.example.com/user/profile" -H "Authorization: Bearer token123"',
      sharedAt: '2024-01-15T10:30:00Z',
      accessType: 'public',
      expiresAt: '2024-02-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Authentication Flow',
      curlCommand: 'curl -X POST "https://auth.example.com/login" -d "{"username":"user","password":"pass"}"',
      sharedAt: '2024-01-14T15:45:00Z',
      accessType: 'private',
      sharedWith: ['alice.smith@example.com']
    },
    {
      id: '3',
      name: 'Payment Processing',
      curlCommand: 'curl -X POST "https://api.payment.com/process" -H "Content-Type: application/json"',
      sharedAt: '2024-01-13T09:15:00Z',
      accessType: 'public'
    }
  ]);

  const [selectedScan, setSelectedScan] = useState<SharedScan | null>(null);
  const [showShareConfig, setShowShareConfig] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const handleConfigClick = (scan: SharedScan) => {
    setSelectedScan(scan);
    setShowShareConfig(true);
  };

  const handleSaveConfig = (config: { accessType: 'public' | 'private'; expiresAt?: string; sharedWith?: string[] }) => {
    if (!selectedScan) return;
    
    setSharedScans(prev => 
      prev.map(scan => 
        scan.id === selectedScan.id 
          ? { ...scan, ...config }
          : scan
      )
    );
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    width: '100%'
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const scanListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const scanItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    transition: 'all 0.2s'
  };

  const scanContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const scanInfoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const scanNameStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1f2937'
  };

  const scanDetailsStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const accessTypeStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    fontWeight: '500',
    padding: '2px 8px',
    borderRadius: '12px'
  };

  const publicAccessStyle: React.CSSProperties = {
    ...accessTypeStyle,
    backgroundColor: '#dbeafe',
    color: '#1d4ed8'
  };

  const privateAccessStyle: React.CSSProperties = {
    ...accessTypeStyle,
    backgroundColor: '#fef3c7',
    color: '#92400e'
  };

  const configButtonStyle: React.CSSProperties = {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Share Control</h1>
      </div>

      <div style={scanListStyle}>
        {sharedScans.map((scan) => (
          <div
            key={scan.id}
            style={scanItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div style={scanContentStyle}>
              <Share size={18} color="#3b82f6" />
              <div style={scanInfoStyle}>
                <div style={scanNameStyle}>{scan.name}</div>
                <div style={scanDetailsStyle}>
                  <span>
                    {scan.curlCommand.length > 60 
                      ? `${scan.curlCommand.substring(0, 60)}...` 
                      : scan.curlCommand}
                  </span>
                  <span>•</span>
                  <Clock size={12} />
                  <span>Shared {formatTimestamp(scan.sharedAt)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={scan.accessType === 'public' ? publicAccessStyle : privateAccessStyle}>
                {scan.accessType === 'public' ? <Globe size={12} /> : <Lock size={12} />}
                {scan.accessType === 'public' ? 'Public' : 'Private'}
              </div>
              
              <button
                style={configButtonStyle}
                onClick={() => handleConfigClick(scan)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ShareConfigPopup
        isOpen={showShareConfig}
        onClose={() => setShowShareConfig(false)}
        scan={selectedScan}
        onSave={handleSaveConfig}
      />
    </div>
  );
};