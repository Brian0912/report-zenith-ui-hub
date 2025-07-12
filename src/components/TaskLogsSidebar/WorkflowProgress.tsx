
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
  const getStepColor = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'current':
        return '#3B82F6';
      case 'error':
        return '#EF4444';
      default:
        return '#9CA3AF';
    }
  };

  const completedSteps = steps.filter(step => step.status === 'completed').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className={className}>
      {/* Horizontal Steps */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '0 12px'
      }}>
        {/* Connection Line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '24px',
          right: '24px',
          height: '2px',
          backgroundColor: '#E5E7EB',
          transform: 'translateY(-50%)',
          zIndex: 1
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#10B981',
            width: `${Math.max(0, (completedSteps - 1) / (steps.length - 1) * 100)}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Step Nodes */}
        {steps.map((step, index) => (
          <div key={step.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            position: 'relative',
            zIndex: 2,
            flex: 1,
            maxWidth: '80px'
          }}>
            {/* Node */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: step.status === 'completed' ? '#10B981' : 
                              step.status === 'current' ? '#3B82F6' : 
                              step.status === 'error' ? '#EF4444' : 'white',
              border: `2px solid ${getStepColor(step.status)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}>
              {step.status === 'completed' ? (
                <CheckCircle size={14} style={{ color: 'white' }} />
              ) : step.status === 'current' ? (
                <Clock size={12} style={{ color: 'white' }} />
              ) : step.status === 'error' ? (
                <AlertCircle size={12} style={{ color: 'white' }} />
              ) : (
                <Circle size={8} style={{ color: '#9CA3AF', fill: 'transparent' }} />
              )}
            </div>
            
            {/* Step Label */}
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              color: getStepColor(step.status),
              textAlign: 'center',
              lineHeight: '1.3',
              maxWidth: '70px',
              minHeight: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {step.label.split(' ').map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const calculateProgress = (steps: WorkflowStep[]): number => {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return Math.round((completedSteps / steps.length) * 100);
};
