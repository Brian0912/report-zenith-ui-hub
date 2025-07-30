import React, { useState } from 'react';
import { Folder, FileText, MoreVertical, Plus } from 'lucide-react';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'scan';
  parentId?: string;
  curlCommand?: string;
  timestamp?: string;
}

export const FolderControlPage: React.FC = () => {
  const [folderItems] = useState<FolderItem[]>([
    { id: 'default', name: 'Default Folder', type: 'folder' },
    { 
      id: 'scan1', 
      name: 'User Profile API', 
      type: 'scan', 
      parentId: 'default',
      curlCommand: 'curl -X POST "https://api.example.com/user/profile"',
      timestamp: '2024-01-15T10:30:00Z'
    },
    { 
      id: 'scan2', 
      name: 'Authentication Flow', 
      type: 'scan', 
      parentId: 'default',
      curlCommand: 'curl -X POST "https://auth.example.com/login"',
      timestamp: '2024-01-14T15:45:00Z'
    },
    { 
      id: 'scan3', 
      name: 'Payment Processing', 
      type: 'scan', 
      parentId: 'default',
      curlCommand: 'curl -X POST "https://api.payment.com/process"',
      timestamp: '2024-01-13T09:15:00Z'
    }
  ]);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['default']));

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    width: '100%'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  const newFolderButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };

  const folderListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const folderItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const scanItemStyle: React.CSSProperties = {
    ...folderItemStyle,
    marginLeft: '24px',
    justifyContent: 'space-between'
  };

  const itemContentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  };

  const itemTextStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  };

  const itemNameStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  };

  const itemSubtitleStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#6b7280'
  };

  const configButtonStyle: React.CSSProperties = {
    padding: '4px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#9ca3af',
    opacity: 0,
    transition: 'all 0.2s'
  };

  const folders = folderItems.filter(item => item.type === 'folder');
  const scans = folderItems.filter(item => item.type === 'scan');

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Folder Control</h1>
        <button
          style={newFolderButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }}
        >
          <Plus size={16} />
          New Folder
        </button>
      </div>

      <div style={folderListStyle}>
        {folders.map((folder) => (
          <div key={folder.id}>
            <div
              style={folderItemStyle}
              onClick={() => toggleFolder(folder.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={itemContentStyle}>
                <Folder size={18} color="#3b82f6" />
                <span style={itemNameStyle}>{folder.name}</span>
                <span style={{ transform: expandedFolders.has(folder.id) ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: '#6b7280' }}>
                  ▶
                </span>
              </div>
            </div>

            {expandedFolders.has(folder.id) && (
              <div>
                {scans
                  .filter(scan => scan.parentId === folder.id)
                  .map((scan) => (
                    <div
                      key={scan.id}
                      style={scanItemStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        const configBtn = e.currentTarget.querySelector('.config-btn') as HTMLElement;
                        if (configBtn) configBtn.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        const configBtn = e.currentTarget.querySelector('.config-btn') as HTMLElement;
                        if (configBtn) configBtn.style.opacity = '0';
                      }}
                    >
                      <div style={itemContentStyle}>
                        <FileText size={16} color="#6b7280" />
                        <div style={itemTextStyle}>
                          <div style={itemNameStyle}>{scan.name}</div>
                          <div style={itemSubtitleStyle}>
                            {scan.curlCommand && scan.curlCommand.length > 50 
                              ? `${scan.curlCommand.substring(0, 50)}...` 
                              : scan.curlCommand} • {scan.timestamp && formatTimestamp(scan.timestamp)}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        className="config-btn"
                        style={configButtonStyle}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle scan configuration
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.color = '#374151';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#9ca3af';
                        }}
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};