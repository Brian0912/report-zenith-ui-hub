
export const VALIDATION_RULES = {
  GOAL_MIN_WORDS: 10,
  BACKGROUND_MIN_WORDS: 20,
  MEANINGFUL_CONTENT_RATIO: 0.7,
  MIN_WORD_LENGTH: 2,
  AUTO_RESIZE_MAX_HEIGHT: 200,
  DEBOUNCE_DELAY: 300
};

export function useValidation(formData: { goal: string; background: string }) {
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length >= VALIDATION_RULES.MIN_WORD_LENGTH).length;
  };

  const meaningfulContentRatio = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return 0;
    const meaningfulWords = words.filter(word => word.length >= VALIDATION_RULES.MIN_WORD_LENGTH).length;
    return meaningfulWords / words.length;
  };

  const wordCounts = {
    goal: countWords(formData.goal),
    background: countWords(formData.background)
  };

  const goalValid =
    wordCounts.goal >= VALIDATION_RULES.GOAL_MIN_WORDS &&
    meaningfulContentRatio(formData.goal) >= VALIDATION_RULES.MEANINGFUL_CONTENT_RATIO;

  const backgroundValid =
    wordCounts.background >= VALIDATION_RULES.BACKGROUND_MIN_WORDS &&
    meaningfulContentRatio(formData.background) >= VALIDATION_RULES.MEANINGFUL_CONTENT_RATIO;

  const isFormValid = goalValid && backgroundValid;

  return { wordCounts, goalValid, backgroundValid, isFormValid };
}

export function useAutoResize() {
  const resize = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = 'auto';
    const newHeight = Math.min(el.scrollHeight, VALIDATION_RULES.AUTO_RESIZE_MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
  };

  return resize;
}
