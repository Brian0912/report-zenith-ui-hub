
import React from 'react';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';

export interface WorkflowStep {
  id: string;
  label: string;
  status: 'completed' | 'current' | 'pending' | 'error';
}

export const WORKFLOW_STEPS = [
  'Task Submitted',
  'Data Collection', 
  'Metrics Generation',
  'Analysis',
  'Report',
  'Completion'
] as const;

interface WorkflowProgressProps {
  steps: WorkflowStep[];
  className?: string;
}

export const WorkflowProgress: React.FC<WorkflowProgressProps> = ({ steps, className = '' }) => {
  const getStepIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} style={{ color: '#10B981' }} />;
      case 'current':
        return <Clock size={20} style={{ color: '#3B82F6' }} />;
      case 'error':
        return <AlertCircle size={20} style={{ color: '#EF4444' }} />;
      default:
        return <Circle size={20} style={{ color: '#9CA3AF' }} />;
    }
  };

  const getStepStyles = (status: WorkflowStep['status']) => {
    const baseStyles = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    };

    switch (status) {
      case 'completed':
        return { ...baseStyles, backgroundColor: '#F0FDF4', color: '#15803D' };
      case 'current':
        return { ...baseStyles, backgroundColor: '#EFF6FF', color: '#1D4ED8' };
      case 'error':
        return { ...baseStyles, backgroundColor: '#FEF2F2', color: '#DC2626' };
      default:
        return { ...baseStyles, backgroundColor: '#F9FAFB', color: '#6B7280' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className={className}>
      {steps.map((step, index) => (
        <div key={step.id} style={getStepStyles(step.status)}>
          {getStepIcon(step.status)}
          <span>{step.label}</span>
          {index < steps.length - 1 && (
            <div style={{
              position: 'absolute',
              left: '26px',
              top: '44px',
              width: '2px',
              height: '20px',
              backgroundColor: step.status === 'completed' ? '#10B981' : '#E5E7EB'
            }} />
          )}
        </div>
      ))}
    </div>
  );
};
