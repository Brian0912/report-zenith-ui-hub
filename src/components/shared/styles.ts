
export const sharedStyles = {
  // Typography
  heading: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '16px'
  },
  subheading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '12px'
  },
  label: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  },
  value: {
    fontSize: '14px',
    color: '#1a202c',
    fontWeight: '500',
    lineHeight: '1.5'
  },
  
  // Layout
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px'
  },
  
  section: {
    marginBottom: '32px'
  },
  
  // Badges
  badge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  }
};
