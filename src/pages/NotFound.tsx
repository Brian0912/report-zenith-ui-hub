
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme === 'dark' 
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    color: theme === 'dark' ? '#ffffff' : '#1a202c',
    textAlign: 'center',
    padding: '40px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '72px',
    fontWeight: 'bold',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '8px',
    color: theme === 'dark' ? '#f1f5f9' : '#334155'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '16px',
    color: theme === 'dark' ? '#94a3b8' : '#64748b',
    marginBottom: '32px',
    maxWidth: '500px'
  };

  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
  };

  return (
    <div style={containerStyle}>
      <div style={{ fontSize: '120px', marginBottom: '24px' }}>🔍</div>
      <h1 style={titleStyle}>404</h1>
      <h2 style={subtitleStyle}>Page Not Found</h2>
      <p style={descriptionStyle}>
        The page you're looking for doesn't exist or has been moved to a different location.
      </p>
      <button
        style={buttonStyle}
        onClick={() => navigate('/aplus')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
        }}
      >
        🏠 Back to Dashboard
      </button>
    </div>
  );
};
