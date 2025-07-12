
import { useState, useCallback } from 'react';
import { Report } from '../components/mockData';

interface EditableFields {
  frequency: string;
  timeRange: {
    start: Date;
    end: Date;
  };
  metadata: Array<{
    id: string;
    category: string;
    key: string;
    value: string;
  }>;
}

export const useTaskEditor = (task: Report) => {
  const [originalValues] = useState<EditableFields>({
    frequency: task.schedule?.frequency || 'Monthly',
    timeRange: {
      start: task.taskCreation?.timeRange?.start || new Date(),
      end: task.taskCreation?.timeRange?.end || new Date()
    },
    metadata: task.taskCreation?.metadata || []
  });

  const [currentValues, setCurrentValues] = useState<EditableFields>(originalValues);
  const [isSaving, setIsSaving] = useState(false);

  const hasUnsavedChanges = 
    currentValues.frequency !== originalValues.frequency ||
    currentValues.timeRange.start.getTime() !== originalValues.timeRange.start.getTime() ||
    currentValues.timeRange.end.getTime() !== originalValues.timeRange.end.getTime() ||
    JSON.stringify(currentValues.metadata) !== JSON.stringify(originalValues.metadata);

  const updateFrequency = useCallback((frequency: string) => {
    setCurrentValues(prev => ({ ...prev, frequency }));
  }, []);

  const updateTimeRange = useCallback((timeRange: { start: Date; end: Date }) => {
    setCurrentValues(prev => ({ ...prev, timeRange }));
  }, []);

  const updateMetadata = useCallback((metadata: EditableFields['metadata']) => {
    setCurrentValues(prev => ({ ...prev, metadata }));
  }, []);

  const saveChanges = useCallback(async () => {
    setIsSaving(true);
    try {
      // Here you would typically call an API
      console.log('Saving changes:', currentValues);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // Update original values after successful save
      Object.assign(originalValues, currentValues);
    } catch (error) {
      console.error('Failed to save changes:', error);
    } finally {
      setIsSaving(false);
    }
  }, [currentValues, originalValues]);

  const resetChanges = useCallback(() => {
    setCurrentValues({ ...originalValues });
  }, [originalValues]);

  return {
    currentValues,
    hasUnsavedChanges,
    isSaving,
    updateFrequency,
    updateTimeRange,
    updateMetadata,
    saveChanges,
    resetChanges
  };
};
