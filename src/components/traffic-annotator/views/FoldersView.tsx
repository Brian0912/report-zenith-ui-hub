import React, { useState } from 'react';
import { Folder, FolderOpen, File, Plus, MoreVertical, ChevronRight, ChevronDown } from 'lucide-react';

interface FolderNode {
  id: string;
  name: string;
  type: 'folder' | 'curl';
  children?: FolderNode[];
  curlCommand?: string;
  timestamp?: string;
  parentId?: string;
}

interface FoldersViewProps {
  onLoadCurl: (curl: string) => void;
}

export const FoldersView: React.FC<FoldersViewProps> = ({ onLoadCurl }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '2']));
  
  const [folderTree] = useState<FolderNode[]>([
    {
      id: '1',
      name: 'Authentication APIs',
      type: 'folder',
      children: [
        {
          id: '1-1',
          name: 'Login',
          type: 'curl',
          curlCommand: 'curl -X POST https://api.example.com/login -H "Content-Type: application/json" -d \'{"username":"admin","password":"secret"}\'',
          timestamp: '2024-01-15 16:45',
          parentId: '1'
        },
        {
          id: '1-2',
          name: 'Logout',
          type: 'curl',
          curlCommand: 'curl -X POST https://api.example.com/logout -H "Authorization: Bearer token123"',
          timestamp: '2024-01-15 16:30',
          parentId: '1'
        },
        {
          id: '1-3',
          name: 'Refresh Token',
          type: 'curl',
          curlCommand: 'curl -X POST https://api.example.com/refresh -H "Content-Type: application/json" -d \'{"refresh_token":"refresh123"}\'',
          timestamp: '2024-01-15 15:20',
          parentId: '1'
        }
      ]
    },
    {
      id: '2',
      name: 'User Management',
      type: 'folder',
      children: [
        {
          id: '2-1',
          name: 'Get Users',
          type: 'curl',
          curlCommand: 'curl -X GET https://api.example.com/users?page=1&limit=10 -H "Authorization: Bearer token123"',
          timestamp: '2024-01-15 14:15',
          parentId: '2'
        },
        {
          id: '2-2',
          name: 'Create User',
          type: 'curl',
          curlCommand: 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -H "Authorization: Bearer token123" -d \'{"name":"John Doe","email":"john@example.com"}\'',
          timestamp: '2024-01-15 13:45',
          parentId: '2'
        },
        {
          id: '2-3',
          name: 'Admin Operations',
          type: 'folder',
          parentId: '2',
          children: [
            {
              id: '2-3-1',
              name: 'Delete User',
              type: 'curl',
              curlCommand: 'curl -X DELETE https://api.example.com/users/123 -H "Authorization: Bearer admin_token"',
              timestamp: '2024-01-15 12:30',
              parentId: '2-3'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'API Status',
      type: 'folder',
      children: [
        {
          id: '3-1',
          name: 'Health Check',
          type: 'curl',
          curlCommand: 'curl -X GET https://api.example.com/health',
          timestamp: '2024-01-15 11:00',
          parentId: '3'
        }
      ]
    }
  ]);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCurlClick = (curlCommand: string) => {
    onLoadCurl(curlCommand);
  };

  const renderTreeNode = (node: FolderNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    const nodeStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      marginLeft: `${depth * 20}px`,
      cursor: 'pointer',
      borderRadius: '6px',
      transition: 'all 0.2s',
      gap: '8px',
      position: 'relative'
    };

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      color: node.type === 'folder' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
    };

    const nameStyle: React.CSSProperties = {
      flex: 1,
      fontSize: '14px',
      fontWeight: node.type === 'folder' ? '600' : '500',
      color: 'hsl(var(--foreground))',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };

    const timestampStyle: React.CSSProperties = {
      fontSize: '11px',
      color: 'hsl(var(--muted-foreground))',
      opacity: 0.7
    };

    const actionButtonStyle: React.CSSProperties = {
      padding: '4px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      color: 'hsl(var(--muted-foreground))',
      opacity: 0,
      transition: 'all 0.2s'
    };

    return (
      <div key={node.id}>
        <div
          style={nodeStyle}
          onClick={() => {
            if (node.type === 'folder' && hasChildren) {
              toggleFolder(node.id);
            } else if (node.type === 'curl' && node.curlCommand) {
              handleCurlClick(node.curlCommand);
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
            const actionBtn = e.currentTarget.querySelector('[data-action-btn]') as HTMLElement;
            if (actionBtn) actionBtn.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            const actionBtn = e.currentTarget.querySelector('[data-action-btn]') as HTMLElement;
            if (actionBtn) actionBtn.style.opacity = '0';
          }}
        >
          {node.type === 'folder' && hasChildren && (
            <div style={{ width: '16px', display: 'flex', justifyContent: 'center' }}>
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          )}
          {node.type === 'folder' && !hasChildren && (
            <div style={{ width: '16px' }} />
          )}
          {node.type === 'curl' && (
            <div style={{ width: '16px' }} />
          )}
          
          <div style={iconStyle}>
            {node.type === 'folder' ? (
              isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />
            ) : (
              <File size={16} />
            )}
          </div>
          
          <span style={nameStyle}>{node.name}</span>
          
          {node.timestamp && (
            <span style={timestampStyle}>{node.timestamp}</span>
          )}
          
          <button
            data-action-btn
            style={actionButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              // Handle action menu
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <MoreVertical size={14} />
          </button>
        </div>
        
        {node.type === 'folder' && hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const containerStyle: React.CSSProperties = {
    padding: '24px',
    height: '100%',
    overflow: 'auto'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: '700',
    color: 'hsl(var(--foreground))',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const createButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  };

  const treeContainerStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          <Folder size={24} />
          Folders
        </h1>
        
        <button
          style={createButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Plus size={16} />
          New Folder
        </button>
      </div>

      <div style={treeContainerStyle}>
        {folderTree.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'hsl(var(--muted-foreground))'
          }}>
            No folders created yet. Create your first folder to organize your cURL commands.
          </div>
        ) : (
          <div style={{ padding: '12px 0' }}>
            {folderTree.map(node => renderTreeNode(node))}
          </div>
        )}
      </div>
    </div>
  );
};