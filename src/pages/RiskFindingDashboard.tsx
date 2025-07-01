
import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { RiskFindingHeader } from '../components/risk-finding/RiskFindingHeader';
import { RiskFindingFilters } from '../components/risk-finding/RiskFindingFilters';
import { RiskCategoryList } from '../components/risk-finding/RiskCategoryList';
import { FindingSubmissionModal } from '../components/risk-finding/FindingSubmissionModal';
import { FindingDetailModal } from '../components/risk-finding/FindingDetailModal';
import { mockRiskCategories, mockFindings, RiskCategory, Finding } from '../components/risk-finding/mockFindingData';

export const RiskFindingDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [submitterFilter, setSubmitterFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [findings, setFindings] = useState<Finding[]>(mockFindings);
  const [riskCategories] = useState<RiskCategory[]>(mockRiskCategories);

  const filteredFindings = findings.filter(finding => {
    const matchesSearch = finding.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         finding.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || finding.status === statusFilter;
    const matchesSubmitter = !submitterFilter || finding.reporter.toLowerCase().includes(submitterFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesSubmitter;
  });

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    padding: '24px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const mainContentStyle: React.CSSProperties = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
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
      <div style={mainContentStyle}>
        <RiskFindingHeader 
          onSubmitFinding={() => setIsSubmissionModalOpen(true)}
        />
        
        <RiskFindingFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          submitterFilter={submitterFilter}
          onSubmitterChange={setSubmitterFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <RiskCategoryList
          riskCategories={riskCategories}
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
