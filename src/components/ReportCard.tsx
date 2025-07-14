import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, ArrowUp, ArrowDown, User, FileText } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { sharedStyles } from './shared/styles';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export interface Report {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'running' | 'queued' | 'error';
  createdAt: Date;
  schedule: {
    frequency?: string;
    nextRun: Date;
    lastRun: Date;
  };
  pointOfContact: {
    name: string;
    role: string;
  };
  subscriberCount: number;
  isSubscribed: boolean;
  taskCreation?: {
    goal?: string;
    analysisType?: string;
    background?: string;
    timeRange?: string | { start: Date; end: Date; };
    metadata?: { [key: string]: string | string[] };
  };
  supportEvidences: {
    id: string;
    filename: string;
    size: number;
    generatedAt: Date;
  }[];
  versions: {
    id: string;
    versionNumber: string;
    generatedAt: Date;
  }[];
}

interface ReportCardProps {
  report: Report;
  onSubscribe: (reportId: string) => void;
  onViewLogs: (reportId: string) => void;
  viewMode?: 'grid' | 'list';
  animationDelay?: number;
}

export const ReportCard: React.FC<ReportCardProps> = ({ 
  report, 
  onSubscribe, 
  onViewLogs,
  viewMode = 'grid',
  animationDelay = 0
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    animationDelay: `${animationDelay}ms`
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px 24px',
    borderBottom: '1px solid hsl(var(--border))',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const headerActionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  };

  const statusStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    backgroundColor:
      report.status === 'completed' ? 'hsl(var(--success) / 0.15)' :
      report.status === 'running' ? 'hsl(var(--primary) / 0.15)' :
      report.status === 'queued' ? 'hsl(var(--warning) / 0.15)' :
      'hsl(var(--destructive) / 0.15)',
    color:
      report.status === 'completed' ? 'hsl(var(--success))' :
      report.status === 'running' ? 'hsl(var(--primary))' :
      report.status === 'queued' ? 'hsl(var(--warning))' :
      'hsl(var(--destructive))'
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    marginBottom: '8px',
    letterSpacing: '-0.025em',
    lineHeight: '1.3'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'hsl(var(--muted-foreground))',
    lineHeight: '1.5',
    marginBottom: '16px'
  };

  const metadataStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  };

  const metadataItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: 'hsl(var(--muted-foreground))'
  };

  const metadataIconStyle: React.CSSProperties = {
    width: '16px',
    height: '16px',
    opacity: '0.7'
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  };

  const subscribeButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: report.isSubscribed ? 'hsl(var(--destructive) / 0.15)' : 'hsl(var(--primary) / 0.15)',
    color: report.isSubscribed ? 'hsl(var(--destructive))' : 'hsl(var(--primary))',
    border: 'none',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const secondaryButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    color: 'hsl(var(--muted-foreground))',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isTitleTruncated = report.title.length > 50;
  const isDescriptionTruncated = report.description.length > 120;

  const titleElement = (
    <h3 style={titleStyle}>
      {report.title}
    </h3>
  );

  const descriptionElement = (
    <p style={descriptionStyle}>
      {report.description}
    </p>
  );

  return (
    <TooltipProvider>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={statusStyle}>{report.status}</div>
          <div style={headerActionsStyle}>
            <button style={{ 
              padding: '6px', 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              color: 'hsl(var(--muted-foreground))',
              transition: 'all 0.2s ease'
            }}>
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        <div style={contentStyle}>
          {isTitleTruncated ? (
            <Tooltip>
              <TooltipTrigger asChild>
                {titleElement}
              </TooltipTrigger>
              <TooltipContent>
                <p style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{report.title}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            titleElement
          )}

          {isDescriptionTruncated ? (
            <Tooltip>
              <TooltipTrigger asChild>
                {descriptionElement}
              </TooltipTrigger>
              <TooltipContent>
                <p style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{report.description}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            descriptionElement
          )}

          <div style={metadataStyle}>
            <div style={metadataItemStyle}>
              <User size={16} style={metadataIconStyle} />
              {report.pointOfContact.name}
            </div>
            <div style={metadataItemStyle}>
              <FileText size={16} style={metadataIconStyle} />
              {formatTimestamp(report.schedule.lastRun)}
            </div>
          </div>

          <div style={footerStyle}>
            <button
              style={subscribeButtonStyle}
              onClick={() => onSubscribe(report.id)}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              {report.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                style={secondaryButtonStyle}
                onClick={() => onViewLogs(report.id)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--accent))'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                View Logs
              </button>
              <Button size="sm" onClick={() => navigate(`/task/${report.id}`)}>
                View Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
