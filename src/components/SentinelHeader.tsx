import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { Filter } from 'lucide-react';
import { FilterModal, FilterState } from './FilterModal';

interface SentinelHeaderProps {
  onCreateTask: () => void;
}

export const SentinelHeader: React.FC<SentinelHeaderProps> = ({ onCreateTask }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    selectedFilters: [],
    taskStatus: [],
    creators: [],
    tags: [],
    frequency: [],
    timeRange: { start: null, end: null }
  });

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'hsl(var(--card))',
    borderBottom: '1px solid hsl(var(--border))',
    padding: '16px 24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const leftSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoCircleStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    backgroundColor: 'hsl(var(--primary))',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'hsl(var(--primary-foreground))',
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    color: 'hsl(var(--foreground))',
    margin: 0
  };

  const centerSectionStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: '400px',
    margin: '0 48px'
  };

  const searchContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  };

  const searchInputStyle: React.CSSProperties = {
    flex: 1,
    padding: '10px 16px 10px 40px',
    borderRadius: '8px',
    border: '1px solid hsl(var(--border))',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'hsl(var(--muted))',
    color: 'hsl(var(--foreground))'
  };

  const searchIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'hsl(var(--muted-foreground))',
    fontSize: '16px'
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const dashboardButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'hsl(var(--muted-foreground))',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease'
  };

  const createTaskButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary-foreground))',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const themeToggleStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'hsl(var(--muted))',
    border: '1px solid hsl(var(--border))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    setIsFilterModalOpen(false);
    console.log('Applied filters:', filters);
    // Here you would typically update the reports based on the filters
  };

  const getTotalActiveFilters = () => {
    return activeFilters.taskStatus.length + 
           activeFilters.creators.length + 
           activeFilters.frequency.length + 
           (activeFilters.timeRange.start || activeFilters.timeRange.end ? 1 : 0);
  };

  const activeFilterCount = getTotalActiveFilters();

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={leftSectionStyle}>
            <div style={logoStyle}>
              <div style={logoCircleStyle}>C</div>
              <h1 style={logoTextStyle}>Crystal Report Center</h1>
            </div>
          </div>

          <div style={centerSectionStyle}>
            <div style={searchContainerStyle}>
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={searchIconStyle}>🔍</span>
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={searchInputStyle}
                />
              </div>
              
              <Button 
                variant="outline" 
                size="default"
                onClick={() => setIsFilterModalOpen(true)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Filter size={16} />
                Filter
                {activeFilterCount > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {activeFilterCount}
                  </div>
                )}
              </Button>
            </div>
          </div>

          <div style={rightSectionStyle}>
            <button 
              style={createTaskButtonStyle}
              onClick={onCreateTask}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--primary))';
              }}
            >
              Create Task
            </button>
          </div>
        </div>
      </header>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </>
  );
};
