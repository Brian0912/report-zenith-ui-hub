import { useState, useCallback, useMemo } from 'react';
import { AnalysisReport, FolderNode, XRayState } from '../types/xray';
import { mockAnalysisReports, mockFolders } from '../components/traffic-annotator/mockAnalysisData';

export const useXRayState = () => {
  const [state, setState] = useState<XRayState>({
    reports: mockAnalysisReports,
    folders: mockFolders,
    starredReportIds: new Set(mockAnalysisReports.filter(r => r.isStarred).map(r => r.id)),
    selectedFolderId: 'folder-default',
    currentReport: null,
    searchTerm: ''
  });

  const toggleStar = useCallback((reportId: string) => {
    setState(prev => {
      const newStarredIds = new Set(prev.starredReportIds);
      const reports = prev.reports.map(report => {
        if (report.id === reportId) {
          const isStarred = !report.isStarred;
          if (isStarred) {
            newStarredIds.add(reportId);
          } else {
            newStarredIds.delete(reportId);
          }
          return { ...report, isStarred };
        }
        return report;
      });
      
      return {
        ...prev,
        reports,
        starredReportIds: newStarredIds
      };
    });
  }, []);

  const setCurrentReport = useCallback((report: AnalysisReport | null) => {
    setState(prev => ({ ...prev, currentReport: report }));
  }, []);

  const setSelectedFolder = useCallback((folderId: string) => {
    setState(prev => ({ ...prev, selectedFolderId: folderId }));
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const addReport = useCallback((report: AnalysisReport) => {
    setState(prev => ({
      ...prev,
      reports: [report, ...prev.reports]
    }));
  }, []);

  const addFolder = useCallback((name: string, parentId?: string) => {
    const newFolder: FolderNode = {
      id: `folder-${Date.now()}`,
      name,
      type: 'folder',
      parentId,
      children: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setState(prev => {
      const folders = [...prev.folders];
      if (parentId) {
        // Add to parent folder
        const updateFolder = (folder: FolderNode): FolderNode => {
          if (folder.id === parentId) {
            return {
              ...folder,
              children: [...(folder.children || []), newFolder]
            };
          }
          if (folder.children) {
            return {
              ...folder,
              children: folder.children.map(updateFolder)
            };
          }
          return folder;
        };
        return {
          ...prev,
          folders: folders.map(updateFolder)
        };
      } else {
        // Add as root folder
        return {
          ...prev,
          folders: [...folders, newFolder]
        };
      }
    });
  }, []);

  const moveReport = useCallback((reportId: string, targetFolderId: string) => {
    setState(prev => ({
      ...prev,
      reports: prev.reports.map(report =>
        report.id === reportId ? { ...report, folderId: targetFolderId } : report
      )
    }));
  }, []);

  const renameFolder = useCallback((folderId: string, newName: string) => {
    setState(prev => {
      const updateFolderName = (folders: FolderNode[]): FolderNode[] => {
        return folders.map(folder => {
          if (folder.id === folderId) {
            return { ...folder, name: newName, updatedAt: new Date().toISOString() };
          }
          if (folder.children) {
            return { ...folder, children: updateFolderName(folder.children) };
          }
          return folder;
        });
      };

      return {
        ...prev,
        folders: updateFolderName(prev.folders)
      };
    });
  }, []);

  // Computed values
  const starredReports = useMemo(() => 
    state.reports.filter(report => state.starredReportIds.has(report.id)),
    [state.reports, state.starredReportIds]
  );

  const recentReports = useMemo(() => 
    [...state.reports]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10),
    [state.reports]
  );

  const filteredReports = useMemo(() => {
    if (!state.searchTerm) return state.reports;
    
    const term = state.searchTerm.toLowerCase();
    return state.reports.filter(report =>
      report.url.toLowerCase().includes(term) ||
      report.method.toLowerCase().includes(term) ||
      report.curlCommand.toLowerCase().includes(term)
    );
  }, [state.reports, state.searchTerm]);

  const getReportsByFolder = useCallback((folderId: string) => {
    return state.reports.filter(report => report.folderId === folderId);
  }, [state.reports]);

  const getFolderPath = useCallback((folderId: string): string[] => {
    const findPath = (folders: FolderNode[], targetId: string, path: string[] = []): string[] | null => {
      for (const folder of folders) {
        const currentPath = [...path, folder.name];
        if (folder.id === targetId) {
          return currentPath;
        }
        if (folder.children) {
          const childPath = findPath(folder.children, targetId, currentPath);
          if (childPath) return childPath;
        }
      }
      return null;
    };

    return findPath(state.folders, folderId) || [];
  }, [state.folders]);

  return {
    state,
    toggleStar,
    setCurrentReport,
    setSelectedFolder,
    setSearchTerm,
    addReport,
    addFolder,
    moveReport,
    renameFolder,
    starredReports,
    recentReports,
    filteredReports,
    getReportsByFolder,
    getFolderPath
  };
};