import React, { useState } from 'react';
import { Folder, FolderOpen, File, Plus, MoreVertical, ChevronRight, ChevronDown } from 'lucide-react';
import { FolderNode, AnalysisReport } from '../../../types/xray';

interface FoldersViewProps {
  onLoadCurl: (curl: string) => void;
  onSelectReport: (report: AnalysisReport) => void;
  folders: FolderNode[];
  reports: AnalysisReport[];
  onCreateFolder: (name: string, parentId?: string) => void;
  highlightedReportId?: string;
}

export const FoldersView: React.FC<FoldersViewProps> = ({ 
  onLoadCurl, 
  onSelectReport, 
  folders, 
  reports, 
  onCreateFolder, 
  highlightedReportId 
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(folders.map(f => f.id)));
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleReportClick = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      onSelectReport(report);
    }
  };

  const getReportsInFolder = (folderId: string) => {
    return reports.filter(r => r.folderId === folderId);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setCreatingFolder(false);
    }
  };

  const renderTreeNode = (node: FolderNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const folderReports = node.type === 'folder' ? getReportsInFolder(node.id) : [];
    
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
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else if (node.type === 'report' && node.reportId) {
              handleReportClick(node.reportId);
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
          {node.type === 'folder' && (
            <div style={{ width: '16px', display: 'flex', justifyContent: 'center' }}>
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
          )}
          {node.type === 'report' && (
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
          
          {node.type === 'folder' && folderReports.length > 0 && (
            <span style={{ 
              fontSize: '11px', 
              color: 'hsl(var(--muted-foreground))', 
              backgroundColor: 'hsl(var(--muted))', 
              padding: '2px 6px', 
              borderRadius: '10px' 
            }}>
              {folderReports.length}
            </span>
          )}
          
          {highlightedReportId && node.reportId === highlightedReportId && (
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'hsl(var(--primary))',
              animation: 'pulse 2s infinite'
            }} />
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
        
        {node.type === 'folder' && isExpanded && (
          <div>
            {/* Render child folders */}
            {hasChildren && node.children!.map(child => renderTreeNode(child, depth + 1))}
            
            {/* Render reports in this folder */}
            {folderReports.map(report => (
              <div key={`report-${report.id}`}>
                {renderTreeNode({
                  id: `report-node-${report.id}`,
                  name: `${report.method} ${new URL(report.url).pathname}`,
                  type: 'report',
                  reportId: report.id,
                  parentId: node.id,
                  createdAt: report.timestamp,
                  updatedAt: report.timestamp
                }, depth + 1)}
              </div>
            ))}
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
        
        {!creatingFolder ? (
          <button
            style={createButtonStyle}
            onClick={() => setCreatingFolder(true)}
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
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              style={{
                padding: '8px 12px',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateFolder();
                if (e.key === 'Escape') {
                  setCreatingFolder(false);
                  setNewFolderName('');
                }
              }}
              autoFocus
            />
            <button
              onClick={handleCreateFolder}
              style={{
                padding: '8px 12px',
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Create
            </button>
            <button
              onClick={() => {
                setCreatingFolder(false);
                setNewFolderName('');
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: 'transparent',
                color: 'hsl(var(--muted-foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div style={treeContainerStyle}>
        {folders.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'hsl(var(--muted-foreground))'
          }}>
            No folders created yet. Create your first folder to organize your analysis reports.
          </div>
        ) : (
          <div style={{ padding: '12px 0' }}>
            {folders.map(node => renderTreeNode(node))}
          </div>
        )}
      </div>
    </div>
  );
};