
import { useState, useCallback, useEffect } from 'react';
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
  const createInitialValues = (currentTask: Report): EditableFields => ({
    frequency: currentTask.schedule?.frequency || 'Monthly',
    timeRange: {
      start: currentTask.taskCreation?.timeRange?.start || new Date(),
      end: currentTask.taskCreation?.timeRange?.end || new Date()
    },
    metadata: currentTask.taskCreation?.metadata || []
  });

  const [originalValues, setOriginalValues] = useState<EditableFields>(() => createInitialValues(task));
  const [currentValues, setCurrentValues] = useState<EditableFields>(originalValues);
  const [isSaving, setIsSaving] = useState(false);

  // Reset state when task changes
  useEffect(() => {
    const newInitialValues = createInitialValues(task);
    setOriginalValues(newInitialValues);
    setCurrentValues(newInitialValues);
  }, [task.id]);

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
      console.log('Saving changes:', currentValues);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newValues = { ...currentValues };
      setOriginalValues(newValues);
    } catch (error) {
      console.error('Failed to save changes:', error);
    } finally {
      setIsSaving(false);
    }
  }, [currentValues]);

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
