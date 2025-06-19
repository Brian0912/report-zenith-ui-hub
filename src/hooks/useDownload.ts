
import { useState } from 'react';

export interface DownloadProgress {
  progress: number;
  isDownloading: boolean;
  fileName: string;
}

export const useDownload = () => {
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    progress: 0,
    isDownloading: false,
    fileName: ''
  });

  const startDownload = async (reportTitle: string, reportId: string) => {
    setDownloadProgress({
      progress: 0,
      isDownloading: true,
      fileName: `${reportTitle}.pdf`
    });

    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(prev => ({
        ...prev,
        progress: i
      }));
    }

    // Simulate file download
    const blob = new Blob(['Sample report content'], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadProgress({
      progress: 100,
      isDownloading: false,
      fileName: ''
    });
  };

  const cancelDownload = () => {
    setDownloadProgress({
      progress: 0,
      isDownloading: false,
      fileName: ''
    });
  };

  return {
    downloadProgress,
    startDownload,
    cancelDownload
  };
};
