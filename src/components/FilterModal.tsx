
import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';

export interface FilterState {
  selectedFilters: string[];
  taskStatus: string[];
  creators: string[];
  tags: string[];
  frequency: string[];
  timeRange: { start: string | null; end: string | null };
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  initialFilters: FilterState;
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

const allCreators: Creator[] = [
  { id: 'john-doe', name: 'John Doe', avatar: 'JD', color: 'bg-cyan-500' },
  { id: 'jane-smith', name: 'Jane Smith', avatar: 'JS', color: 'bg-purple-500' },
  { id: 'mike-johnson', name: 'Mike Johnson', avatar: 'MJ', color: 'bg-amber-500' },
  { id: 'sarah-wilson', name: 'Sarah Wilson', avatar: 'SW', color: 'bg-pink-500' }
];

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters
}) => {
  const [filterState, setFilterState] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setFilterState(initialFilters);
  }, [initialFilters]);

  if (!isOpen) return null;

  const statusOptions = [
    { value: 'completed', label: 'Completed', icon: '✓', color: 'bg-green-500' },
    { value: 'running', label: 'Running', icon: '↻', color: 'bg-blue-500' },
    { value: 'queued', label: 'Queued', icon: '⏸', color: 'bg-amber-500' },
    { value: 'failed', label: 'Failed', icon: '✗', color: 'bg-red-500' }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly', icon: 'W', color: 'bg-blue-500' },
    { value: 'monthly', label: 'Monthly', icon: 'M', color: 'bg-green-500' },
    { value: 'quarterly', label: 'Quarterly', icon: 'Q', color: 'bg-amber-500' },
    { value: 'ad-hoc', label: 'Ad Hoc', icon: 'A', color: 'bg-purple-500' }
  ];

  const quickFilterPresets = [
    { id: 'my-recent', label: 'My Recent' },
    { id: 'team-weekly', label: 'Team Weekly' },
    { id: 'monthly-reports', label: 'Monthly Reports' },
    { id: 'failed-tasks', label: 'Failed Tasks' }
  ];

  const toggleSelection = (type: keyof FilterState, value: string) => {
    setFilterState(prev => {
      const currentSet = new Set(prev[type] as string[]);
      if (currentSet.has(value)) {
        currentSet.delete(value);
      } else {
        currentSet.add(value);
      }
      return {
        ...prev,
        [type]: Array.from(currentSet)
      };
    });
  };

  const selectAll = (type: keyof FilterState, options: any[]) => {
    setFilterState(prev => ({
      ...prev,
      [type]: options.map(opt => opt.value)
    }));
  };

  const clearSection = (type: keyof FilterState) => {
    if (type === 'timeRange') {
      setFilterState(prev => ({
        ...prev,
        timeRange: { start: null, end: null }
      }));
    } else {
      setFilterState(prev => ({
        ...prev,
        [type]: []
      }));
    }
  };

  const handleCreatorSearch = (query: string) => {
    setSearchQuery(query);
    clearTimeout(searchTimeoutRef.current);
    
    if (query.trim() === '') {
      setShowSearchResults(false);
      return;
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setShowSearchResults(true);
    }, 150);
  };

  const selectCreator = (creatorId: string) => {
    if (!filterState.creators.includes(creatorId)) {
      setFilterState(prev => ({
        ...prev,
        creators: [...prev.creators, creatorId]
      }));
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const removeCreator = (creatorId: string) => {
    setFilterState(prev => ({
      ...prev,
      creators: prev.creators.filter(id => id !== creatorId)
    }));
  };

  const applyPreset = (presetId: string) => {
    let newState = { ...filterState };
    
    // Clear existing filters
    newState.taskStatus = [];
    newState.creators = [];
    newState.frequency = [];
    newState.timeRange = { start: null, end: null };
    
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    switch (presetId) {
      case 'my-recent':
        newState.taskStatus = ['running', 'completed'];
        newState.creators = ['john-doe'];
        newState.timeRange = {
          start: thirtyDaysAgo.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        };
        break;
      case 'team-weekly':
        newState.taskStatus = ['running', 'queued'];
        newState.frequency = ['weekly'];
        break;
      case 'monthly-reports':
        newState.taskStatus = ['completed'];
        newState.frequency = ['monthly'];
        break;
      case 'failed-tasks':
        newState.taskStatus = ['failed'];
        newState.timeRange = {
          start: sevenDaysAgo.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        };
        break;
    }
    
    setFilterState(newState);
  };

  const getFilterTags = () => {
    const tags = [];
    
    filterState.taskStatus.forEach(status => {
      const option = statusOptions.find(opt => opt.value === status);
      tags.push({ type: 'Status', value: status, display: option?.label || status });
    });
    
    filterState.creators.forEach(creatorId => {
      const creator = allCreators.find(c => c.id === creatorId);
      tags.push({ type: 'Creator', value: creatorId, display: creator?.name || creatorId });
    });
    
    filterState.frequency.forEach(freq => {
      const option = frequencyOptions.find(opt => opt.value === freq);
      tags.push({ type: 'Frequency', value: freq, display: option?.label || freq });
    });
    
    if (filterState.timeRange.start || filterState.timeRange.end) {
      const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      let rangeText = '';
      if (filterState.timeRange.start && filterState.timeRange.end) {
        rangeText = `${formatDate(filterState.timeRange.start)} to ${formatDate(filterState.timeRange.end)}`;
      } else if (filterState.timeRange.start) {
        rangeText = `From ${formatDate(filterState.timeRange.start)}`;
      } else if (filterState.timeRange.end) {
        rangeText = `Until ${formatDate(filterState.timeRange.end)}`;
      }
      tags.push({ type: 'Time Range', value: 'timeRange', display: rangeText });
    }
    
    return tags;
  };

  const removeFilterTag = (type: string, value: string) => {
    if (type === 'Status') {
      setFilterState(prev => ({
        ...prev,
        taskStatus: prev.taskStatus.filter(s => s !== value)
      }));
    } else if (type === 'Creator') {
      removeCreator(value);
    } else if (type === 'Frequency') {
      setFilterState(prev => ({
        ...prev,
        frequency: prev.frequency.filter(f => f !== value)
      }));
    } else if (type === 'Time Range') {
      clearSection('timeRange');
    }
  };

  const clearAllFilters = () => {
    setFilterState({
      selectedFilters: [],
      taskStatus: [],
      creators: [],
      tags: [],
      frequency: [],
      timeRange: { start: null, end: null }
    });
  };

  const getFilteredResults = () => {
    const baseResults = 1247;
    let filteredResults = baseResults;
    
    if (filterState.taskStatus.length > 0) filteredResults = Math.floor(filteredResults * 0.7);
    if (filterState.creators.length > 0) filteredResults = Math.floor(filteredResults * 0.6);
    if (filterState.frequency.length > 0) filteredResults = Math.floor(filteredResults * 0.8);
    if (filterState.timeRange.start || filterState.timeRange.end) filteredResults = Math.floor(filteredResults * 0.5);
    
    return Math.max(12, filteredResults);
  };

  const filteredCreators = allCreators.filter(creator =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !filterState.creators.includes(creator.id)
  );

  const filterTags = getFilterTags();
  const resultCount = getFilteredResults();
  const baseResults = 1247;
  const change = baseResults - resultCount;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.4)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '480px', 
        maxHeight: '85vh', 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>Filter Reports</h2>
          <button
            onClick={onClose}
            style={{ 
              width: '32px', 
              height: '32px', 
              border: 'none', 
              background: '#f1f5f9', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#64748b',
              transition: 'all 0.15s ease'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Filters */}
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>Quick Filters</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {quickFilterPresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                style={{
                  padding: '6px 12px',
                  background: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#6b7280',
                  transition: 'all 0.15s ease'
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Applied Filters */}
        {filterTags.length > 0 && (
          <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Applied Filters</div>
              <span style={{ fontSize: '11px', color: '#6b7280', background: 'white', padding: '2px 6px', borderRadius: '8px' }}>
                {filterTags.length} active
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {filterTags.map((tag, index) => (
                <div key={index} style={{ padding: '4px 8px', background: 'white', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '12px', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{tag.type}: {tag.display}</span>
                  <button
                    onClick={() => removeFilterTag(tag.type, tag.value)}
                    style={{ cursor: 'pointer', color: '#9ca3af', fontSize: '12px', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.15s ease', border: 'none', background: 'transparent' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', minHeight: 0 }}>
          {/* Task Status */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Task Status</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span onClick={() => selectAll('taskStatus', statusOptions)} style={{ fontSize: '11px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '3px 6px', borderRadius: '4px', transition: 'all 0.15s ease' }}>Select All</span>
                <span onClick={() => clearSection('taskStatus')} style={{ fontSize: '11px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '3px 6px', borderRadius: '4px', transition: 'all 0.15s ease' }}>Clear</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {statusOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => toggleSelection('taskStatus', option.value)}
                  style={{
                    padding: '10px 12px',
                    border: filterState.taskStatus.includes(option.value) ? '1px solid #3b82f6' : '1px solid #e2e8f0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    background: filterState.taskStatus.includes(option.value) ? '#eff6ff' : 'white'
                  }}
                >
                  <div style={{ 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '8px', 
                    color: 'white', 
                    fontWeight: '600',
                    background: option.color === 'bg-green-500' ? '#10b981' : option.color === 'bg-blue-500' ? '#3b82f6' : option.color === 'bg-amber-500' ? '#f59e0b' : '#ef4444'
                  }}>
                    {option.icon}
                  </div>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Creators */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Creators</div>
              <span onClick={() => clearSection('creators')} style={{ fontSize: '11px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '3px 6px', borderRadius: '4px', transition: 'all 0.15s ease' }}>Clear</span>
            </div>
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => handleCreatorSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 32px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  background: 'white',
                  transition: 'all 0.15s ease'
                }}
              />
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            </div>
            
            {/* Selected Creators */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '6px', 
              marginBottom: '8px', 
              minHeight: '24px', 
              padding: '6px', 
              border: '1px dashed #d1d5db', 
              borderRadius: '6px', 
              background: '#fafbfc'
            }}>
              {filterState.creators.length === 0 ? (
                <div style={{ color: '#9ca3af', fontSize: '12px', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  No creators selected
                </div>
              ) : (
                filterState.creators.map(creatorId => {
                  const creator = allCreators.find(c => c.id === creatorId);
                  if (!creator) return null;
                  return (
                    <div key={creatorId} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 6px 3px 3px', background: 'white', border: '1px solid #d1d5db', borderRadius: '12px', fontSize: '11px', color: '#374151' }}>
                      <div style={{ 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '8px', 
                        fontWeight: '600', 
                        color: 'white',
                        background: creator.color === 'bg-cyan-500' ? '#06b6d4' : creator.color === 'bg-purple-500' ? '#8b5cf6' : creator.color === 'bg-amber-500' ? '#f59e0b' : '#ec4899'
                      }}>
                        {creator.avatar}
                      </div>
                      <span>{creator.name}</span>
                      <button
                        onClick={() => removeCreator(creatorId)}
                        style={{ width: '14px', height: '14px', border: 'none', background: 'transparent', color: '#6b7280', cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', transition: 'all 0.15s ease' }}
                      >
                        ×
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Search Results */}
            {showSearchResults && searchQuery && (
              <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', marginTop: '4px' }}>
                {filteredCreators.length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '12px', fontStyle: 'italic' }}>
                    No creators found
                  </div>
                ) : (
                  filteredCreators.map(creator => (
                    <div
                      key={creator.id}
                      onClick={() => selectCreator(creator.id)}
                      style={{ padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', transition: 'all 0.15s ease', borderBottom: '1px solid #f1f5f9' }}
                    >
                      <div style={{ 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '8px', 
                        fontWeight: '600', 
                        color: 'white',
                        background: creator.color === 'bg-cyan-500' ? '#06b6d4' : creator.color === 'bg-purple-500' ? '#8b5cf6' : creator.color === 'bg-amber-500' ? '#f59e0b' : '#ec4899'
                      }}>
                        {creator.avatar}
                      </div>
                      <span>{creator.name}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Frequency */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Frequency</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span onClick={() => selectAll('frequency', frequencyOptions)} style={{ fontSize: '11px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '3px 6px', borderRadius: '4px', transition: 'all 0.15s ease' }}>Select All</span>
                <span onClick={() => clearSection('frequency')} style={{ fontSize: '11px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '3px 6px', borderRadius: '4px', transition: 'all 0.15s ease' }}>Clear</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {frequencyOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => toggleSelection('frequency', option.value)}
                  style={{
                    padding: '10px 12px',
                    border: filterState.frequency.includes(option.value) ? '1px solid #3b82f6' : '1px solid #e2e8f0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    background: filterState.frequency.includes(option.value) ? '#eff6ff' : 'white'
                  }}
                >
                  <div style={{ 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '3px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '8px', 
                    color: 'white', 
                    fontWeight: '600',
                    background: option.color === 'bg-blue-500' ? '#3b82f6' : option.color === 'bg-green-500' ? '#10b981' : option.color === 'bg-amber-500' ? '#f59e0b' : '#8b5cf6'
                  }}>
                    {option.icon}
                  </div>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Time Range</div>
              <span onClick={() => clearSection('timeRange')} style={{ fontSize: '11px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '3px 6px', borderRadius: '4px', transition: 'all 0.15s ease' }}>Clear</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#6b7280' }}>From</label>
                <input
                  type="date"
                  value={filterState.timeRange.start || ''}
                  onChange={(e) => setFilterState(prev => ({ ...prev, timeRange: { ...prev.timeRange, start: e.target.value } }))}
                  style={{ padding: '7px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', background: 'white', transition: 'all 0.15s ease' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '500', color: '#6b7280' }}>To</label>
                <input
                  type="date"
                  value={filterState.timeRange.end || ''}
                  onChange={(e) => setFilterState(prev => ({ ...prev, timeRange: { ...prev.timeRange, end: e.target.value } }))}
                  style={{ padding: '7px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '12px', background: 'white', transition: 'all 0.15s ease' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={clearAllFilters}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              color: '#374151',
              transition: 'all 0.15s ease'
            }}
          >
            Clear all
          </button>
          <button
            onClick={() => onApplyFilters(filterState)}
            style={{
              flex: 2,
              padding: '10px 12px',
              background: '#3b82f6',
              color: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: '600', fontSize: '13px' }}>Show {resultCount.toLocaleString()} results</div>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>
                {change > 0 ? `↓ ${change.toLocaleString()} fewer` : 'Same as original'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
