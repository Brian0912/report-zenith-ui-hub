
import { User, Clock, Database, AlertCircle } from 'lucide-react';

export const METADATA_CATEGORIES = {
  employee: {
    name: 'Employee',
    icon: User,
    options: [
      { key: 'username', label: 'Username', placeholder: 'e.g., john.doe' },
      { key: 'department', label: 'Department', placeholder: 'e.g., Engineering' },
      { key: 'base_country', label: 'Base Country', placeholder: 'e.g., United States' },
      { key: 'physical_country', label: 'Physical Country', placeholder: 'e.g., Canada' },
      { key: 'manager', label: 'Manager', placeholder: 'e.g., Jane Smith' },
      { key: 'role', label: 'Role', placeholder: 'e.g., Senior Developer' },
      { key: 'employee_id', label: 'Employee ID', placeholder: 'e.g., EMP001' }
    ]
  },
  traffic: {
    name: 'Traffic',
    icon: Clock,
    options: [
      { key: 'source_ip', label: 'Source IP', placeholder: 'e.g., 192.168.1.1' },
      { key: 'destination', label: 'Destination', placeholder: 'e.g., api.example.com' },
      { key: 'protocol', label: 'Protocol', placeholder: 'e.g., HTTPS' },
      { key: 'port', label: 'Port', placeholder: 'e.g., 443' },
      { key: 'bandwidth', label: 'Bandwidth', placeholder: 'e.g., 100 Mbps' },
      { key: 'region', label: 'Region', placeholder: 'e.g., us-east-1' }
    ]
  },
  data_assets: {
    name: 'Data Assets',
    icon: Database,
    options: [
      { key: 'asset_name', label: 'Asset Name', placeholder: 'e.g., Customer Database' },
      { key: 'data_type', label: 'Data Type', placeholder: 'e.g., PII' },
      { key: 'classification', label: 'Classification', placeholder: 'e.g., Confidential' },
      { key: 'owner', label: 'Data Owner', placeholder: 'e.g., Data Team' },
      { key: 'location', label: 'Location', placeholder: 'e.g., AWS RDS' },
      { key: 'retention_period', label: 'Retention Period', placeholder: 'e.g., 7 years' }
    ]
  },
  policy: {
    name: 'Policy',
    icon: AlertCircle,
    options: [
      { key: 'policy_name', label: 'Policy Name', placeholder: 'e.g., Data Retention Policy' },
      { key: 'compliance_framework', label: 'Compliance Framework', placeholder: 'e.g., GDPR' },
      { key: 'severity', label: 'Severity', placeholder: 'e.g., High' },
      { key: 'approval_required', label: 'Approval Required', placeholder: 'e.g., Yes' },
      { key: 'expiry_date', label: 'Expiry Date', placeholder: 'e.g., 2024-12-31' },
      { key: 'owner', label: 'Policy Owner', placeholder: 'e.g., Security Team' }
    ]
  }
};

export type MetadataItemType = {
  id: string;
  category: keyof typeof METADATA_CATEGORIES;
  key: string;
  value: string;
};

export type FormData = {
  goal: string;
  background: string;
  metadata: MetadataItemType[];
};

export type FormAction =
  | { type: 'SET_FIELD'; field: keyof Omit<FormData, 'metadata'>; value: string }
  | { type: 'ADD_METADATA'; item: MetadataItemType }
  | { type: 'UPDATE_METADATA'; id: string; value: string }
  | { type: 'REMOVE_METADATA'; id: string }
  | { type: 'SET_ALL'; data: FormData };

export const TEMPLATE_DATA = {
  goal: "Implement a user authentication system",
  background: "We need a secure and scalable authentication system for our web application. It should support email/password login, social logins, and multi-factor authentication. The system must integrate with our existing user database and comply with GDPR regulations.",
  metadata: [
    { id: '1', category: 'employee' as const, key: 'username', value: 'john.doe' },
    { id: '2', category: 'policy' as const, key: 'policy_name', value: 'Authentication Policy' }
  ]
};
