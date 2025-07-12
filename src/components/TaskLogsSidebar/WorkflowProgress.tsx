
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
        return <CheckCircle size={16} style={{ color: '#10B981' }} />;
      case 'current':
        return <Clock size={16} style={{ color: '#3B82F6' }} />;
      case 'error':
        return <AlertCircle size={16} style={{ color: '#EF4444' }} />;
      default:
        return <Circle size={16} style={{ color: '#9CA3AF' }} />;
    }
  };

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
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={className}>
      {/* Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          fontWeight: '500',
          color: '#6B7280'
        }}>
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#F3F4F6',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#10B981',
            width: `${progressPercentage}%`,
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Horizontal Steps */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '8px'
      }}>
        {/* Connection Line */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '8px',
          right: '8px',
          height: '2px',
          backgroundColor: '#E5E7EB',
          zIndex: 1
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#10B981',
            width: `${Math.max(0, (completedSteps - 1) / (steps.length - 1) * 100)}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Step Markers */}
        {steps.map((step, index) => (
          <div key={step.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
            zIndex: 2,
            flex: 1,
            maxWidth: '80px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: `2px solid ${getStepColor(step.status)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {step.status === 'completed' ? (
                <CheckCircle size={12} style={{ color: '#10B981' }} />
              ) : step.status === 'current' ? (
                <Clock size={12} style={{ color: '#3B82F6' }} />
              ) : step.status === 'error' ? (
                <AlertCircle size={12} style={{ color: '#EF4444' }} />
              ) : (
                <Circle size={8} style={{ color: '#9CA3AF', fill: '#9CA3AF' }} />
              )}
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              color: getStepColor(step.status),
              textAlign: 'center',
              lineHeight: '1.2',
              maxWidth: '60px'
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
