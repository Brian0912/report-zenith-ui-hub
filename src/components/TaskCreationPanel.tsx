import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer } from 'react';
import { X, Plus, Save, AlertCircle, CheckCircle, Sparkles, Clock, User, Search, HelpCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface TaskCreationPanelProps {
  onSuccess?: () => void;
}

// Constants
const VALIDATION_RULES = {
  GOAL_MIN_WORDS: 10,
  BACKGROUND_MIN_WORDS: 20,
  MEANINGFUL_CONTENT_RATIO: 0.7,
  MIN_WORD_LENGTH:
