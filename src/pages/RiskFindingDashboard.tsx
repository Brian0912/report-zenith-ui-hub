
import React, { useState } from 'react';
import { RiskFindingPageHeader } from '../components/risk-finding/RiskFindingPageHeader';
import { StatusSummaryCards } from '../components/risk-finding/StatusSummaryCards';
import { FindingsList } from '../components/risk-finding/FindingsList';
import { FindingSubmissionModal } from '../components/risk-finding/FindingSubmissionModal';
import { FindingDetailModal } from '../components/risk-finding/FindingDetailModal';
import { mockFindings, Finding } from '../components/risk-finding/mockFindingData';

export const RiskFindingDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [findings, setFindings] = useState<Finding[]>(mockFindings);

  const filteredFindings = findings.filter(finding => {
    const matchesSearch = finding.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || finding.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'hsl(var(--muted))'
  };

  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px 24px'
  };

  const handleSubmitFinding = (findingData: any) => {
    const newFinding: Finding = {
      id: Date.now().toString(),
      ...findingData,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'waiting_assignment' as const,
      timeline: [
        {
          stage: 'Finding Submitted',
          timestamp: new Date().toISOString(),
          completed: true,
          details: {
            submitter: findingData.reporter,
            submissionDate: new Date().toISOString().split('T')[0]
          }
        }
      ]
    };
    
    setFindings(prev => [...prev, newFinding]);
    setIsSubmissionModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      <RiskFindingPageHeader 
        onSubmitFinding={() => setIsSubmissionModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      
      <div style={mainContentStyle}>
        <StatusSummaryCards findings={filteredFindings} />

        <FindingsList
          findings={filteredFindings}
          onFindingClick={setSelectedFinding}
        />

        {isSubmissionModalOpen && (
          <FindingSubmissionModal
            onClose={() => setIsSubmissionModalOpen(false)}
            onSubmit={handleSubmitFinding}
          />
        )}

        {selectedFinding && (
          <FindingDetailModal
            finding={selectedFinding}
            onClose={() => setSelectedFinding(null)}
          />
        )}
      </div>
    </div>
  );
};
