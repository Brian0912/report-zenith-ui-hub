
import React from 'react';

interface WordCounterProps {
  count: number;
  minWords: number;
}

export const WordCounter: React.FC<WordCounterProps> = ({ count, minWords }) => {
  const isValid = count >= minWords;
  return (
    <div style={{ fontSize: '12px', color: isValid ? '#16a34a' : '#dc2626' }}>
      {count} / {minWords} words
    </div>
  );
};
