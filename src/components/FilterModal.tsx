
import React, { useState, useEffect } from 'react';
import { X, Check, User, Tag as TagIcon, Clock, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  selectedFilters: string[];
  taskStatus: string[];
  creators: string[];
  tags: string[];
}

const TASK_STATUSES = [
  { id: 'completed', label: 'Completed', icon: Check, color: '#10B981' },
  { id: 'running', label: 'Running', icon: Clock, color: '#3B82F6' },
  { id: 'queued', label: 'Queued', icon: Clock, color: '#F59E0B' },
  { id: 'failed', label: 'Failed', icon: X, color: '#EF4444' }
];

const CREATORS = [
  { id: 'john-doe', name: 'John Doe', avatar: null, initials: 'JD' },
  { id: 'jane-smith', name: 'Jane Smith', avatar: null, initials: 'JS' },
  { id: 'mike-johnson', name: 'Mike Johnson', avatar: null, initials: 'MJ' },
  { id: 'sarah-wilson', name: 'Sarah Wilson', avatar: null, initials: 'SW' }
];

const TAGS = [
  'Financial', 'Operational', 'Compliance', 'Security', 'Performance', 
  'Risk Assessment', 'Audit', 'Monthly', 'Weekly', 'Critical'
];

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = { selectedFilters: [], taskStatus: [], creators: [], tags: [] }
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [totalResults, setTotalResults] = useState(1247); // Mock count

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleStatusToggle = (statusId: string) => {
    setFilters(prev => ({
      ...prev,
      taskStatus: prev.taskStatus.includes(statusId)
        ? prev.taskStatus.filter(id => id !== statusId)
        : [...prev.taskStatus, statusId]
    }));
  };

  const handleCreatorToggle = (creatorId: string) => {
    setFilters(prev => ({
      ...prev,
      creators: prev.creators.includes(creatorId)
        ? prev.creators.filter(id => id !== creatorId)
        : [...prev.creators, creatorId]
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const removeSelectedFilter = (filter: string) => {
    setFilters(prev => ({
      ...prev,
      selectedFilters: prev.selectedFilters.filter(f => f !== filter),
      taskStatus: prev.taskStatus.filter(s => s !== filter),
      creators: prev.creators.filter(c => c !== filter),
      tags: prev.tags.filter(t => t !== filter)
    }));
  };

  const clearAllFilters = () => {
    setFilters({ selectedFilters: [], taskStatus: [], creators: [], tags: [] });
  };

  const applyFilters = () => {
    const allSelected = [
      ...filters.taskStatus,
      ...filters.creators,
      ...filters.tags
    ];
    
    const updatedFilters = {
      ...filters,
      selectedFilters: allSelected
    };
    
    onApplyFilters(updatedFilters);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const allSelectedCount = filters.taskStatus.length + filters.creators.length + filters.tags.length;

  if (!isOpen) return null;

  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--background))',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 24px 16px 24px',
    borderBottom: '1px solid hsl(var(--border))'
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '0 24px'
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    borderTop: '1px solid hsl(var(--border))',
    backgroundColor: 'hsl(var(--muted) / 0.3)'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '32px'
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    marginBottom: '16px'
  };

  const pillGridStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  };

  const statusButtonStyle = (isSelected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
    backgroundColor: isSelected ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--background))',
    color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500'
  });

  const creatorButtonStyle = (isSelected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
    backgroundColor: isSelected ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--background))',
    color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%'
  });

  const tagPillStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: '20px',
    border: `1px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
    backgroundColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--background))',
    color: isSelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500'
  });

  return (
    <div style={modalStyle} onClick={handleBackdropClick}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'hsl(var(--foreground))' }}>
            Filters
          </h2>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'hsl(var(--muted-foreground))',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          {/* Selected Filters */}
          {allSelectedCount > 0 && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Selected</h3>
              <div style={pillGridStyle}>
                {filters.taskStatus.map(status => {
                  const statusInfo = TASK_STATUSES.find(s => s.id === status);
                  return (
                    <div
                      key={status}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        backgroundColor: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                        borderRadius: '16px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {statusInfo?.label}
                      <button
                        onClick={() => removeSelectedFilter(status)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'inherit',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  );
                })}
                {filters.creators.map(creatorId => {
                  const creator = CREATORS.find(c => c.id === creatorId);
                  return (
                    <div
                      key={creatorId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        backgroundColor: 'hsl(var(--primary))',
                        color: 'hsl(var(--primary-foreground))',
                        borderRadius: '16px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {creator?.name}
                      <button
                        onClick={() => removeSelectedFilter(creatorId)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'inherit',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  );
                })}
                {filters.tags.map(tag => (
                  <div
                    key={tag}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))',
                      borderRadius: '16px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => removeSelectedFilter(tag)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: 'none',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Task Status */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Task Status</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              {TASK_STATUSES.map(status => {
                const isSelected = filters.taskStatus.includes(status.id);
                const Icon = status.icon;
                return (
                  <button
                    key={status.id}
                    onClick={() => handleStatusToggle(status.id)}
                    style={statusButtonStyle(isSelected)}
                  >
                    <Icon size={16} style={{ color: status.color }} />
                    {status.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Creators */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Creators</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {CREATORS.map(creator => {
                const isSelected = filters.creators.includes(creator.id);
                return (
                  <button
                    key={creator.id}
                    onClick={() => handleCreatorToggle(creator.id)}
                    style={creatorButtonStyle(isSelected)}
                  >
                    <Avatar style={{ width: '32px', height: '32px' }}>
                      <AvatarImage src={creator.avatar || undefined} />
                      <AvatarFallback style={{ fontSize: '12px' }}>
                        {creator.initials}
                      </AvatarFallback>
                    </Avatar>
                    {creator.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Tags</h3>
            <div style={pillGridStyle}>
              {TAGS.map(tag => {
                const isSelected = filters.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    style={tagPillStyle(isSelected)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <button
            onClick={clearAllFilters}
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'hsl(var(--muted-foreground))',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Clear all
          </button>
          <Button onClick={applyFilters} style={{ fontSize: '14px', fontWeight: '500' }}>
            Show {totalResults.toLocaleString()} results
          </Button>
        </div>
      </div>
    </div>
  );
};
