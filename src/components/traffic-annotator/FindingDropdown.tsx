
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { ExternalLink } from 'lucide-react';

interface Finding {
  id: string;
  name: string;
  url: string;
}

interface FindingDropdownProps {
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const mockFindings: Finding[] = [
  { id: 'finding-001', name: 'PII Data Exposure Risk', url: 'https://compliance-portal.com/finding/001' },
  { id: 'finding-002', name: 'Unauthorized API Access', url: 'https://compliance-portal.com/finding/002' },
  { id: 'finding-003', name: 'Data Retention Violation', url: 'https://compliance-portal.com/finding/003' },
  { id: 'finding-004', name: 'Encryption Standards Gap', url: 'https://compliance-portal.com/finding/004' },
  { id: 'finding-005', name: 'GDPR Compliance Issue', url: 'https://compliance-portal.com/finding/005' }
];

export const FindingDropdown: React.FC<FindingDropdownProps> = ({
  value,
  onValueChange,
  className
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const selectedFinding = mockFindings.find(f => f.id === value);
  const filteredFindings = mockFindings.filter(finding =>
    finding.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (findingId: string) => {
    onValueChange(findingId);
    setOpen(false);
    setSearchValue('');
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SelectValue placeholder="Select finding..." />
          {selectedFinding && (
            <button
              onClick={(e) => handleLinkClick(e, selectedFinding.url)}
              style={{
                padding: '2px',
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Open finding link"
            >
              <ExternalLink size={14} />
            </button>
          )}
        </SelectTrigger>
        <SelectContent>
          <Command>
            <CommandInput
              placeholder="Search findings..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No findings found.</CommandEmpty>
              <CommandGroup>
                {filteredFindings.map((finding) => (
                  <CommandItem
                    key={finding.id}
                    value={finding.id}
                    onSelect={() => handleSelect(finding.id)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span>{finding.name}</span>
                    <button
                      onClick={(e) => handleLinkClick(e, finding.url)}
                      style={{
                        padding: '2px',
                        color: '#2563eb',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      title="Open finding link"
                    >
                      <ExternalLink size={12} />
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </SelectContent>
      </Select>
    </div>
  );
};
