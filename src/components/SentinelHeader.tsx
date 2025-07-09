
import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Filter } from 'lucide-react';

interface SentinelHeaderProps {
  onCreateTask: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const SentinelHeader: React.FC<SentinelHeaderProps> = ({ 
  onCreateTask, 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    maxWidth: '500px',
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

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'running', label: 'Running' },
    { value: 'error', label: 'Error' },
    { value: 'queued', label: 'Queued' }
  ];

  const filterContentStyle: React.CSSProperties = {
    width: '200px'
  };

  const filterOptionStyle = (isSelected: boolean): React.CSSProperties => ({
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
    backgroundColor: isSelected ? 'hsl(var(--accent))' : 'transparent',
    color: 'hsl(var(--foreground))',
    fontSize: '14px',
    transition: 'background-color 0.2s ease'
  });

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <div style={logoStyle}>
            <div style={logoCircleStyle}>C</div>
            <h1 style={logoTextStyle}>Report Center</h1>
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
            
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="default">
                  <Filter size={16} />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent style={filterContentStyle}>
                <div>
                  <h4 style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    marginBottom: '8px',
                    color: 'hsl(var(--foreground))'
                  }}>
                    Filter by Status
                  </h4>
                  {statusOptions.map(option => (
                    <div
                      key={option.value}
                      style={filterOptionStyle(statusFilter === option.value)}
                      onClick={() => {
                        setStatusFilter(option.value);
                        setIsFilterOpen(false);
                      }}
                      onMouseEnter={(e) => {
                        if (statusFilter !== option.value) {
                          e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (statusFilter !== option.value) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div style={rightSectionStyle}>
          <Button onClick={onCreateTask}>
            Create Task
          </Button>
          <button
            style={themeToggleStyle}
            onClick={toggleTheme}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--accent))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};
