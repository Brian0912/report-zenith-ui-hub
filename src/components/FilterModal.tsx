
import React, { useState, useEffect, useRef } from 'react';
import { X, Search, BarChart3, TrendingUp } from 'lucide-react';

export interface FilterState {
  selectedFilters: string[];
  taskStatus: string[];
  taskType: string[];
  owners: string[];
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

interface Owner {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

const allOwners: Owner[] = [
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

  const taskTypeOptions = [
    { value: 'situational', label: 'Situational Analysis', icon: BarChart3, color: '#10b981' },
    { value: 'impact', label: 'Impact Analysis', icon: TrendingUp, color: '#3b82f6' }
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

  const handleOwnerSearch = (query: string) => {
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

  const selectOwner = (ownerId: string) => {
    if (!filterState.owners.includes(ownerId)) {
      setFilterState(prev => ({
        ...prev,
        owners: [...prev.owners, ownerId]
      }));
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const removeOwner = (ownerId: string) => {
    setFilterState(prev => ({
      ...prev,
      owners: prev.owners.filter(id => id !== ownerId)
    }));
  };

  const applyPreset = (presetId: string) => {
    let newState = { ...filterState };
    
    // Clear existing filters
    newState.taskStatus = [];
    newState.taskType = [];
    newState.owners = [];
    newState.frequency = [];
    newState.timeRange = { start: null, end: null };
    
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    switch (presetId) {
      case 'my-recent':
        newState.taskStatus = ['running', 'completed'];
        newState.owners = ['john-doe'];
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

    filterState.taskType.forEach(type => {
      const option = taskTypeOptions.find(opt => opt.value === type);
      tags.push({ type: 'Task Type', value: type, display: option?.label || type });
    });
    
    filterState.owners.forEach(ownerId => {
      const owner = allOwners.find(c => c.id === ownerId);
      tags.push({ type: 'Owner', value: ownerId, display: owner?.name || ownerId });
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
    } else if (type === 'Task Type') {
      setFilterState(prev => ({
        ...prev,
        taskType: prev.taskType.filter(t => t !== value)
      }));
    } else if (type === 'Owner') {
      removeOwner(value);
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
      taskType: [],
      owners: [],
      tags: [],
      frequency: [],
      timeRange: { start: null, end: null }
    });
  };

  const filteredOwners = allOwners.filter(owner =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !filterState.owners.includes(owner.id)
  );

  const filterTags = getFilterTags();

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.4)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '520px', 
        maxHeight: '85vh', 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid hsl(var(--border))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Filter Reports</h2>
          <button
            onClick={onClose}
            style={{ 
              width: '32px', 
              height: '32px', 
              border: 'none', 
              background: '#f1f5f9', 
              borderRadius: '8px', 
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
        <div style={{ padding: '20px 24px', background: 'hsl(var(--muted))', borderBottom: '1px solid hsl(var(--border))', flexShrink: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', marginBottom: '12px' }}>Quick Filters</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {quickFilterPresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                style={{
                  padding: '8px 16px',
                  background: 'white',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#111827',
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
          <div style={{ padding: '20px 24px', background: 'hsl(var(--muted))', borderBottom: '1px solid hsl(var(--border))', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Applied Filters</div>
              <span style={{ fontSize: '11px', color: '#6b7280', background: 'white', padding: '4px 8px', borderRadius: '8px', fontWeight: '500' }}>
                {filterTags.length} active
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {filterTags.map((tag, index) => (
                <div key={index} style={{ padding: '6px 12px', background: 'white', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: '#111827', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                  <span>{tag.type}: {tag.display}</span>
                  <button
                    onClick={() => removeFilterTag(tag.type, tag.value)}
                    style={{ cursor: 'pointer', color: '#9ca3af', fontSize: '14px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.15s ease', border: 'none', background: 'transparent' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', minHeight: 0 }}>
          {/* Task Status */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Task Status</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span onClick={() => selectAll('taskStatus', statusOptions)} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Select All</span>
                <span onClick={() => clearSection('taskStatus')} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Clear</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {statusOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => toggleSelection('taskStatus', option.value)}
                  style={{
                    padding: '12px 16px',
                    border: filterState.taskStatus.includes(option.value) ? '2px solid #3b82f6' : '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    background: filterState.taskStatus.includes(option.value) ? '#eff6ff' : 'white'
                  }}
                >
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '9px', 
                    color: 'white', 
                    fontWeight: '600',
                    background: option.color === 'bg-green-500' ? '#10b981' : option.color === 'bg-blue-500' ? '#3b82f6' : option.color === 'bg-amber-500' ? '#f59e0b' : '#ef4444'
                  }}>
                    {option.icon}
                  </div>
                  <span style={{ color: '#111827' }}>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Type */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Task Type</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span onClick={() => selectAll('taskType', taskTypeOptions)} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Select All</span>
                <span onClick={() => clearSection('taskType')} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Clear</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {taskTypeOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={option.value}
                    onClick={() => toggleSelection('taskType', option.value)}
                    style={{
                      padding: '12px 16px',
                      border: filterState.taskType.includes(option.value) ? '2px solid #3b82f6' : '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      fontWeight: '500',
                      background: filterState.taskType.includes(option.value) ? '#eff6ff' : 'white'
                    }}
                  >
                    <div style={{ 
                      width: '16px', 
                      height: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: option.color
                    }}>
                      <IconComponent size={16} />
                    </div>
                    <span style={{ color: '#111827' }}>{option.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Owners */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Owners</div>
              <span onClick={() => clearSection('owners')} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Clear</span>
            </div>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search owners..."
                value={searchQuery}
                onChange={(e) => handleOwnerSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '14px',
                  background: 'white',
                  transition: 'all 0.15s ease',
                  outline: 'none'
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            </div>
            
            {/* Selected Owners */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              marginBottom: '12px', 
              minHeight: '32px', 
              padding: '12px', 
              border: '1px dashed hsl(var(--border))', 
              borderRadius: '12px', 
              background: 'hsl(var(--muted))'
            }}>
              {filterState.owners.length === 0 ? (
                <div style={{ color: '#9ca3af', fontSize: '12px', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  No owners selected
                </div>
              ) : (
                filterState.owners.map(ownerId => {
                  const owner = allOwners.find(c => c.id === ownerId);
                  if (!owner) return null;
                  return (
                    <div key={ownerId} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px 4px 4px', background: 'white', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px', color: '#111827', fontWeight: '500' }}>
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '9px', 
                        fontWeight: '600', 
                        color: 'white',
                        background: owner.color === 'bg-cyan-500' ? '#06b6d4' : owner.color === 'bg-purple-500' ? '#8b5cf6' : owner.color === 'bg-amber-500' ? '#f59e0b' : '#ec4899'
                      }}>
                        {owner.avatar}
                      </div>
                      <span>{owner.name}</span>
                      <button
                        onClick={() => removeOwner(ownerId)}
                        style={{ width: '16px', height: '16px', border: 'none', background: 'transparent', color: '#6b7280', cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', transition: 'all 0.15s ease' }}
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
              <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid hsl(var(--border))', borderRadius: '12px', background: 'white', marginTop: '4px' }}>
                {filteredOwners.length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '12px', fontStyle: 'italic' }}>
                    No owners found
                  </div>
                ) : (
                  filteredOwners.map(owner => (
                    <div
                      key={owner.id}
                      onClick={() => selectOwner(owner.id)}
                      style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', transition: 'all 0.15s ease', borderBottom: '1px solid hsl(var(--border))' }}
                    >
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '9px', 
                        fontWeight: '600', 
                        color: 'white',
                        background: owner.color === 'bg-cyan-500' ? '#06b6d4' : owner.color === 'bg-purple-500' ? '#8b5cf6' : owner.color === 'bg-amber-500' ? '#f59e0b' : '#ec4899'
                      }}>
                        {owner.avatar}
                      </div>
                      <span style={{ color: '#111827', fontWeight: '500' }}>{owner.name}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Frequency */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Frequency</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span onClick={() => selectAll('frequency', frequencyOptions)} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Select All</span>
                <span onClick={() => clearSection('frequency')} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Clear</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {frequencyOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => toggleSelection('frequency', option.value)}
                  style={{
                    padding: '12px 16px',
                    border: filterState.frequency.includes(option.value) ? '2px solid #3b82f6' : '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    background: filterState.frequency.includes(option.value) ? '#eff6ff' : 'white'
                  }}
                >
                  <div style={{ 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '4px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '9px', 
                    color: 'white', 
                    fontWeight: '600',
                    background: option.color === 'bg-blue-500' ? '#3b82f6' : option.color === 'bg-green-500' ? '#10b981' : option.color === 'bg-amber-500' ? '#f59e0b' : '#8b5cf6'
                  }}>
                    {option.icon}
                  </div>
                  <span style={{ color: '#111827' }}>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Time Range</div>
              <span onClick={() => clearSection('timeRange')} style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer', fontWeight: '500', padding: '4px 8px', borderRadius: '6px', transition: 'all 0.15s ease' }}>Clear</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>From</label>
                <input
                  type="date"
                  value={filterState.timeRange.start || ''}
                  onChange={(e) => setFilterState(prev => ({ ...prev, timeRange: { ...prev.timeRange, start: e.target.value } }))}
                  style={{ padding: '10px 12px', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '14px', background: 'white', transition: 'all 0.15s ease', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>To</label>
                <input
                  type="date"
                  value={filterState.timeRange.end || ''}
                  onChange={(e) => setFilterState(prev => ({ ...prev, timeRange: { ...prev.timeRange, end: e.target.value } }))}
                  style={{ padding: '10px 12px', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '14px', background: 'white', transition: 'all 0.15s ease', outline: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid hsl(var(--border))', display: 'flex', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={clearAllFilters}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'white',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111827',
              transition: 'all 0.15s ease'
            }}
          >
            Clear all
          </button>
          <button
            onClick={() => onApplyFilters(filterState)}
            style={{
              flex: 2,
              padding: '12px 16px',
              background: '#3b82f6',
              color: 'white',
              border: '1px solid #3b82f6',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.15s ease'
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
