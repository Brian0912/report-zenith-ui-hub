
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockGovernanceGroups, mockEntities, mockRisks } from '../components/risk-management/mockRiskData';

const GovernancePage = () => {
  const { governanceId } = useParams<{ governanceId: string }>();
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [entityStates, setEntityStates] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPSMs, setSelectedPSMs] = useState<string[]>([]);

  const governance = mockGovernanceGroups.find(g => g.id === governanceId);
  const risk = governance ? mockRisks.find(r => r.id === governance.riskId) : null;
  const entities = governance ? mockEntities.filter(e => governance.entityIds.includes(e.id)) : [];

  // Filter entities based on search and PSM selection
  const filteredEntities = entities.filter(entity => {
    const matchesSearch = !searchTerm || 
      entity.psm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.apiPath.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.httpMethod.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPSM = selectedPSMs.length === 0 || selectedPSMs.includes(entity.psm);
    
    return matchesSearch && matchesPSM;
  });

  // Get unique PSMs
  const uniquePSMs = Array.from(new Set(entities.map(e => e.psm)));

  const toggleEntitySelection = (entityId: string) => {
    setSelectedEntities(prev =>
      prev.includes(entityId)
        ? prev.filter(id => id !== entityId)
        : [...prev, entityId]
    );
  };

  const toggleEntityState = (entityId: string) => {
    setEntityStates(prev => ({
      ...prev,
      [entityId]: !prev[entityId]
    }));
  };

  const batchToggleSelected = () => {
    const newState = !selectedEntities.every(id => entityStates[id]);
    const updates: Record<string, boolean> = {};
    selectedEntities.forEach(id => {
      updates[id] = newState;
    });
    setEntityStates(prev => ({ ...prev, ...updates }));
  };

  const togglePSMFilter = (psm: string) => {
    setSelectedPSMs(prev =>
      prev.includes(psm)
        ? prev.filter(p => p !== psm)
        : [...prev, psm]
    );
  };

  const selectAllEntities = () => {
    setSelectedEntities(filteredEntities.map(e => e.id));
  };

  const clearSelection = () => {
    setSelectedEntities([]);
  };

  if (!governance) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Governance group not found</h1>
        <Link to="/aplus-risk-management" style={{ color: '#3b82f6' }}>
          Back to Risk Management
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/aplus-risk-management" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to Risk Management
        </Link>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0 0.5rem 0' }}>
          {governance.name}
        </h1>
        <div style={{ color: '#666', marginBottom: '1rem' }}>
          <strong>Risk:</strong> {risk?.name} ({risk?.severity}) | 
          <strong> Status:</strong> <span style={{ 
            color: governance.status === 'active' ? '#16a34a' : 
                  governance.status === 'completed' ? '#3b82f6' : '#6b7280'
          }}>
            {governance.status}
          </span> | 
          <strong> Created:</strong> {new Date(governance.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Search Entities
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search PSM, API path, or method..."
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Filter by P.S.M
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {uniquePSMs.map(psm => (
              <label key={psm} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedPSMs.includes(psm)}
                  onChange={() => togglePSMFilter(psm)}
                  style={{ marginRight: '0.25rem' }}
                />
                <span style={{ fontSize: '0.875rem' }}>{psm}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Batch Operations */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          onClick={selectAllEntities}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Select All
        </button>
        <button
          onClick={clearSelection}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Clear Selection
        </button>
        <button
          onClick={batchToggleSelected}
          disabled={selectedEntities.length === 0}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: selectedEntities.length === 0 ? '#d1d5db' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: selectedEntities.length === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Batch Toggle Fix ({selectedEntities.length} selected)
        </button>
      </div>

      {/* Entities Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #d1d5db' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '0.75rem', border: '1px solid #d1d5db', width: '50px' }}>
                <input
                  type="checkbox"
                  checked={filteredEntities.length > 0 && selectedEntities.length === filteredEntities.length}
                  onChange={() => {
                    if (selectedEntities.length === filteredEntities.length) {
                      clearSelection();
                    } else {
                      selectAllEntities();
                    }
                  }}
                />
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #d1d5db', fontWeight: '600' }}>
                P.S.M
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #d1d5db', fontWeight: '600' }}>
                Entity
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #d1d5db', fontWeight: '600' }}>
                Status
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #d1d5db', fontWeight: '600' }}>
                Fixed
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'center', border: '1px solid #d1d5db', fontWeight: '600' }}>
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEntities.map(entity => (
              <tr key={entity.id} style={{ borderBottom: '1px solid #d1d5db' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={selectedEntities.includes(entity.id)}
                    onChange={() => toggleEntitySelection(entity.id)}
                  />
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>
                  {entity.psm}
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>
                  <div style={{ fontWeight: '500' }}>
                    {entity.apiPath} {entity.httpMethod}
                  </div>
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', textAlign: 'center' }}>
                  <span style={{ 
                    color: entity.status === 'active' ? '#16a34a' : 
                          entity.status === 'maintenance' ? '#ca8a04' : '#dc2626',
                    textTransform: 'capitalize'
                  }}>
                    {entity.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', textAlign: 'center' }}>
                  <label style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={entityStates[entity.id] || false}
                      onChange={() => toggleEntityState(entity.id)}
                    />
                  </label>
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', textAlign: 'center' }}>
                  <Link
                    to={`/entity/${entity.id}`}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem'
                    }}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GovernancePage;
