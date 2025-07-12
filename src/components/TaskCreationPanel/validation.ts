
import { useMemo, useCallback } from 'react';
import { FormData } from './types';

export const VALIDATION_RULES = {
  GOAL_MIN_WORDS: 5,
  BACKGROUND_MIN_WORDS: 10
};

export function useValidation(formData: FormData) {
  const wordCounts = useMemo(() => ({
    goal: formData.goal.trim().split(/\s+/).filter(word => word.length > 0).length,
    background: formData.background.trim().split(/\s+/).filter(word => word.length > 0).length
  }), [formData.goal, formData.background]);

  const goalValid = useMemo(() => 
    formData.goal.trim().length > 0 && wordCounts.goal >= VALIDATION_RULES.GOAL_MIN_WORDS,
    [formData.goal, wordCounts.goal]
  );

  const analysisTypeValid = useMemo(() => 
    formData.analysisType !== '',
    [formData.analysisType]
  );

  const backgroundValid = useMemo(() => 
    formData.background.trim().length > 0 && wordCounts.background >= VALIDATION_RULES.BACKGROUND_MIN_WORDS,
    [formData.background, wordCounts.background]
  );

  const timeRangeValid = useMemo(() => 
    formData.timeRange !== null,
    [formData.timeRange]
  );

  const isFormValid = useMemo(() => 
    goalValid && analysisTypeValid && backgroundValid && timeRangeValid,
    [goalValid, analysisTypeValid, backgroundValid, timeRangeValid]
  );

  return {
    wordCounts,
    goalValid,
    analysisTypeValid,
    backgroundValid,
    timeRangeValid,
    isFormValid
  };
}

export function useAutoResize() {
  return useCallback((element: HTMLTextAreaElement | null) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = element.scrollHeight + 'px';
    }
  }, []);
}
