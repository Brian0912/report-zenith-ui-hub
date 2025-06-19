
import React from 'react';
import { Modal, Progress, Button, Space } from '@arco-design/web-react';
import { IconDownload, IconClose } from '@arco-design/web-react/icon';
import { useTheme } from './ThemeProvider';
import { DownloadProgress } from '../hooks/useDownload';

interface DownloadProgressModalProps {
  visible: boolean;
  progress: DownloadProgress;
  onCancel: () => void;
}

export const DownloadProgressModal: React.FC<DownloadProgressModalProps> = ({
  visible,
  progress,
  onCancel
}) => {
  const { theme } = useTheme();

  const modalStyle: React.CSSProperties = {
    background: theme === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: theme === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    width: '400px'
  };

  const headerStyle: React.CSSProperties = {
    color: theme === 'dark' ? '#F3F4F6' : '#111827',
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '1rem'
  };

  const statusStyle: React.CSSProperties = {
    color: theme === 'dark' ? '#D1D5DB' : '#6B7280',
    fontSize: '0.875rem',
    marginBottom: '0.5rem'
  };

  const fileNameStyle: React.CSSProperties = {
    color: theme === 'dark' ? '#F3F4F6' : '#111827',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '1rem'
  };

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      style={modalStyle}
      maskStyle={{ backdropFilter: 'blur(4px)' }}
    >
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <IconDownload style={{ marginRight: '0.5rem', color: theme === 'dark' ? '#3B82F6' : '#2563EB' }} />
          <span style={headerStyle}>Downloading Report</span>
        </div>
        
        <div style={statusStyle}>
          {progress.isDownloading ? 'Downloading...' : 'Download Complete'}
        </div>
        
        <div style={fileNameStyle}>{progress.fileName}</div>
        
        <Progress
          percent={progress.progress}
          status={progress.isDownloading ? 'normal' : 'success'}
          style={{ marginBottom: '1.5rem' }}
        />
        
        <div style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={onCancel}
            icon={<IconClose />}
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)'
                : 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
              border: 'none'
            }}
          >
            {progress.isDownloading ? 'Cancel' : 'Close'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
