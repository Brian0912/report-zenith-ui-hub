
import { FormData, FormAction } from './types';

export function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'ADD_METADATA':
      if (state.metadata.find(m => m.id === action.item.id)) {
        return state;
      }
      return { ...state, metadata: [...state.metadata, action.item] };
    case 'UPDATE_METADATA':
      return {
        ...state,
        metadata: state.metadata.map(m =>
          m.id === action.id ? { ...m, value: action.value } : m
        )
      };
    case 'REMOVE_METADATA':
      return {
        ...state,
        metadata: state.metadata.filter(m => m.id !== action.id)
      };
    case 'SET_ALL':
      return action.data;
    default:
      return state;
  }
}
