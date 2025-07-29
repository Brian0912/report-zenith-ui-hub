import React, { useState, useRef } from 'react';
import { Folder, FolderOpen, File, Plus, MoreVertical, ChevronRight, ChevronDown, Edit2, Scan } from 'lucide-react';
import { FolderNode, AnalysisReport } from '../../../types/xray';

interface FoldersViewProps {
  onLoadCurl: (curl: string) => void;
  onSelectReport: (report: AnalysisReport) => void;
  folders: FolderNode[];
  reports: AnalysisReport[];
  onCreateFolder: (name: string, parentId?: string) => void;
  highlightedReportId?: string;
  onMoveReport: (reportId: string, targetFolderId: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
  onNewScanInFolder: (folderId: string) => void;
}

export const FoldersView: React.FC<FoldersViewProps> = ({ 
  onLoadCurl, 
  onSelectReport, 
  folders, 
  reports, 
  onCreateFolder, 
  highlightedReportId,
  onMoveReport,
  onRenameFolder,
  onNewScanInFolder
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(folders.map(f => f.id)));
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [folderContextMenu, setFolderContextMenu] = useState<{ folderId: string; x: number; y: number } | null>(null);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState('');
  const [draggedReport, setDraggedReport] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);

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

  const handleFolderContextMenu = (folderId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setFolderContextMenu({
      folderId,
      x: event.clientX,
      y: event.clientY
    });
  };

  const closeFolderContextMenu = () => {
    setFolderContextMenu(null);
  };

  const handleRenameStart = (folderId: string, currentName: string) => {
    setEditingFolder(folderId);
    setEditFolderName(currentName);
    closeFolderContextMenu();
  };

  const handleRenameComplete = () => {
    if (editingFolder && editFolderName.trim()) {
      onRenameFolder(editingFolder, editFolderName.trim());
    }
    setEditingFolder(null);
    setEditFolderName('');
  };

  const handleRenameCancel = () => {
    setEditingFolder(null);
    setEditFolderName('');
  };

  const handleDragStart = (reportId: string) => {
    setDraggedReport(reportId);
  };

  const handleDragOver = (event: React.DragEvent, folderId: string) => {
    event.preventDefault();
    setDropTarget(folderId);
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  const handleDrop = (event: React.DragEvent, targetFolderId: string) => {
    event.preventDefault();
    if (draggedReport && draggedReport !== targetFolderId) {
      onMoveReport(draggedReport, targetFolderId);
    }
    setDraggedReport(null);
    setDropTarget(null);
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
          ref={dragRef}
          style={{
            ...nodeStyle,
            backgroundColor: node.type === 'folder' && dropTarget === node.id ? 'hsl(var(--primary) / 0.1)' : 
                           highlightedReportId && node.reportId === highlightedReportId ? 'hsl(var(--primary) / 0.2)' : 'transparent',
            border: node.type === 'folder' && dropTarget === node.id ? '2px dashed hsl(var(--primary))' : 'none',
            cursor: node.type === 'report' ? 'move' : 'pointer'
          }}
          onClick={() => {
            if (editingFolder === node.id) return;
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else if (node.type === 'report' && node.reportId) {
              handleReportClick(node.reportId);
            }
          }}
          onMouseEnter={(e) => {
            if (editingFolder !== node.id) {
              e.currentTarget.style.backgroundColor = node.type === 'folder' && dropTarget === node.id ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--muted))';
              const actionBtn = e.currentTarget.querySelector('[data-action-btn]') as HTMLElement;
              if (actionBtn) actionBtn.style.opacity = '1';
            }
          }}
          onMouseLeave={(e) => {
            if (editingFolder !== node.id) {
              e.currentTarget.style.backgroundColor = node.type === 'folder' && dropTarget === node.id ? 'hsl(var(--primary) / 0.1)' : 
                                                     highlightedReportId && node.reportId === highlightedReportId ? 'hsl(var(--primary) / 0.2)' : 'transparent';
              const actionBtn = e.currentTarget.querySelector('[data-action-btn]') as HTMLElement;
              if (actionBtn) actionBtn.style.opacity = '0';
            }
          }}
          draggable={node.type === 'report'}
          onDragStart={() => node.reportId && handleDragStart(node.reportId)}
          onDragOver={(e) => node.type === 'folder' && handleDragOver(e, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => node.type === 'folder' && handleDrop(e, node.id)}
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
          
          {editingFolder === node.id ? (
            <input
              type="text"
              value={editFolderName}
              onChange={(e) => setEditFolderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameComplete();
                if (e.key === 'Escape') handleRenameCancel();
              }}
              onBlur={handleRenameComplete}
              style={{
                flex: 1,
                padding: '4px 8px',
                border: '1px solid hsl(var(--border))',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                outline: 'none'
              }}
              autoFocus
            />
          ) : (
            <span style={nameStyle}>{node.name}</span>
          )}
          
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
          
          {node.type === 'folder' && (
            <button
              data-action-btn
              style={actionButtonStyle}
              onClick={(e) => handleFolderContextMenu(node.id, e)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <MoreVertical size={14} />
            </button>
          )}
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

      {/* Folder Context Menu */}
      {folderContextMenu && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998
            }}
            onClick={closeFolderContextMenu}
          />
          <div
            style={{
              position: 'fixed',
              top: folderContextMenu.y,
              left: folderContextMenu.x,
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              zIndex: 999,
              minWidth: '200px',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={() => {
                const folder = folders.find(f => f.id === folderContextMenu.folderId);
                if (folder) {
                  handleRenameStart(folder.id, folder.name);
                }
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'hsl(var(--foreground))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Edit2 size={14} />
              Rename
            </button>
            <button
              onClick={() => {
                setCreatingFolder(true);
                closeFolderContextMenu();
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'hsl(var(--foreground))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Plus size={14} />
              Create Subfolder
            </button>
            <button
              onClick={() => {
                onNewScanInFolder(folderContextMenu.folderId);
                closeFolderContextMenu();
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: 'transparent',
                border: 'none',
                textAlign: 'left',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'hsl(var(--foreground))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Scan size={14} />
              New Scan in This Folder
            </button>
          </div>
        </>
      )}
    </div>
  );
};