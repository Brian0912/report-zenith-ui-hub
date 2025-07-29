
import { Users, Globe, Database, Shield } from 'lucide-react';

export interface FormData {
  reportName: string;
  goal: string;
  analysisType: 'situational' | 'impact' | '';
  background: string;
  timeRange: { start: Date; end: Date } | null;
  metadata: MetadataItemType[];
}

export interface MetadataItemType {
  id: string;
  category: keyof typeof METADATA_CATEGORIES;
  key: string;
  value: string;
}

export type FormAction =
  | { type: 'SET_FIELD'; field: keyof Omit<FormData, 'metadata' | 'timeRange'>; value: string }
  | { type: 'SET_ANALYSIS_TYPE'; value: 'situational' | 'impact' | '' }
  | { type: 'SET_TIME_RANGE'; value: { start: Date; end: Date } | null }
  | { type: 'ADD_METADATA'; item: MetadataItemType }
  | { type: 'UPDATE_METADATA'; id: string; value: string }
  | { type: 'REMOVE_METADATA'; id: string }
  | { type: 'SET_ALL'; data: FormData };

export interface MetadataOption {
  key: string;
  label: string;
  description: string;
  examples: string[];
  inputType: 'text' | 'autocomplete' | 'dropdown' | 'multiselect' | 'datetime' | 'number' | 'range';
  options?: string[];
  placeholder: string;
}

export interface MetadataCategory {
  name: string;
  icon: any;
  description: string;
  options: MetadataOption[];
}

export const METADATA_CATEGORIES = {
  employee: {
    name: 'Employee',
    icon: Users,
    description: 'Employee-related metadata fields',
    options: [
      {
        key: 'employee_username',
        label: 'Employee Username',
        description: 'Unique identifier of employee',
        examples: ['john.doe', 'alice.smith'],
        inputType: 'autocomplete' as const,
        placeholder: 'Enter employee username...'
      },
      {
        key: 'access_level',
        label: 'Access Level',
        description: 'Employee data access permission level',
        examples: ['ACCESS_LEVEL_FULLY_RESTRICTED', 'ACCESS_LEVEL_UN_RESTRICTED', 'ACCESS_LEVEL_PARTIALLY_RESTRICTED'],
        inputType: 'dropdown' as const,
        options: ['ACCESS_LEVEL_FULLY_RESTRICTED', 'ACCESS_LEVEL_UN_RESTRICTED', 'ACCESS_LEVEL_PARTIALLY_RESTRICTED'],
        placeholder: 'Select access level...'
      },
      {
        key: 'base_country',
        label: 'Base Country',
        description: 'Employee base country attribute',
        examples: ['MX', 'SG', 'US'],
        inputType: 'dropdown' as const,
        options: ['MX', 'SG', 'US', 'GB', 'DE', 'FR', 'JP', 'KR', 'AU', 'CA'],
        placeholder: 'Select base country...'
      },
      {
        key: 'physical_location',
        label: 'Physical Location',
        description: 'Employee geographic position during traffic',
        examples: ['US', 'SG', 'MX'],
        inputType: 'dropdown' as const,
        options: ['US', 'SG', 'MX', 'GB', 'DE', 'FR', 'JP', 'KR', 'AU', 'CA'],
        placeholder: 'Select physical location...'
      },
      {
        key: 'terminated',
        label: 'Terminated',
        description: 'Employee termination status at collection time',
        examples: ['Active', 'Terminated', 'Unknown'],
        inputType: 'dropdown' as const,
        options: ['Active', 'Terminated', 'Unknown'],
        placeholder: 'Select termination status...'
      },
      {
        key: 'email',
        label: 'Email',
        description: 'Email address of the employee',
        examples: ['john.doe@tiktok.com'],
        inputType: 'autocomplete' as const,
        placeholder: 'Enter email address...'
      },
      {
        key: 'department_en_name',
        label: 'Department',
        description: 'Department name at time of traffic collection',
        examples: ['Engineering', 'Product Management', 'Legal Affairs'],
        inputType: 'dropdown' as const,
        options: ['Engineering', 'Product Management', 'Legal Affairs', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'],
        placeholder: 'Select department...'
      },
      {
        key: 'employee_type_en_name',
        label: 'Employee Type',
        description: 'Employee type at time of traffic collection',
        examples: ['Regular', 'Outsourcing', 'Intern'],
        inputType: 'dropdown' as const,
        options: ['Regular', 'Outsourcing', 'Intern', 'Third-party Associate', 'Partnership', 'Independent Contractor'],
        placeholder: 'Select employee type...'
      },
      {
        key: 'company_en_name',
        label: 'Company',
        description: 'Employee company entity at time of traffic collection',
        examples: ['TikTok Pte. Ltd.', 'ByteDance Inc.', 'TikTok Technology Limited'],
        inputType: 'dropdown' as const,
        options: ['TikTok Pte. Ltd.', 'ByteDance Inc.', 'TikTok Technology Limited'],
        placeholder: 'Select company...'
      },
      {
        key: 'assign_countries',
        label: 'Assign Countries',
        description: 'Employee assignment countries at collection time',
        examples: ['SGP', 'USA', 'KOR', 'ARE'],
        inputType: 'multiselect' as const,
        options: ['SGP', 'USA', 'KOR', 'ARE', 'GBR', 'MEX', 'BRA', 'IDN'],
        placeholder: 'Select assign countries...'
      },
      {
        key: 'direct_manager_username',
        label: 'Direct Manager Username',
        description: 'Employee direct manager at time of traffic collection',
        examples: ['jane.manager', 'team.lead.asia'],
        inputType: 'autocomplete' as const,
        placeholder: 'Enter direct manager username...'
      }
    ]
  },
  traffic: {
    name: 'Traffic',
    icon: Globe,
    description: 'Traffic-related metadata fields',
    options: [
      {
        key: 'recorded_at',
        label: 'Recorded At',
        description: 'Unix timestamp when HTTP request was recorded',
        examples: ['1752620094 (July 16, 2025)'],
        inputType: 'datetime' as const,
        placeholder: 'Select date/time range...'
      },
      {
        key: 'waf_id',
        label: 'WAF ID',
        description: 'Traffic unique identifier linking request and response',
        examples: ['05b7a42d501ca113664e8f1de747e7c9'],
        inputType: 'text' as const,
        placeholder: 'Enter WAF ID...'
      },
      {
        key: 'direction',
        label: 'Direction',
        description: 'Traffic direction indicating request or response',
        examples: ['DIRECTION_INBOUND', 'DIRECTION_OUTBOUND'],
        inputType: 'dropdown' as const,
        options: ['DIRECTION_INBOUND', 'DIRECTION_OUTBOUND'],
        placeholder: 'Select direction...'
      },
      {
        key: 'ip',
        label: 'IP Address',
        description: 'Employee IP address at time of traffic transmission',
        examples: ['fdbd:ff1:ce00:4484:433:5577:f800:caa6', '10.73.193.241'],
        inputType: 'text' as const,
        placeholder: 'Enter IP address...'
      },
      {
        key: 'host',
        label: 'Host',
        description: 'Target domain receiving the traffic request',
        examples: ['csp-us.tiktok-row.net'],
        inputType: 'autocomplete' as const,
        placeholder: 'Enter host domain...'
      },
      {
        key: 'effective_psm',
        label: 'Effective PSM',
        description: 'Service name identifier for traffic attribution',
        examples: ['code.web.server'],
        inputType: 'autocomplete' as const,
        placeholder: 'Enter PSM service name...'
      },
      {
        key: 'http_method',
        label: 'HTTP Method',
        description: 'HTTP verb defining request operation type',
        examples: ['get', 'post', 'put', 'delete'],
        inputType: 'dropdown' as const,
        options: ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'],
        placeholder: 'Select HTTP method...'
      },
      {
        key: 'original_path',
        label: 'Original Path',
        description: 'Non-aggregated real traffic path',
        examples: ['/api/v1/users/12345/profile'],
        inputType: 'text' as const,
        placeholder: 'Enter original path...'
      },
      {
        key: 'normalized_path',
        label: 'Normalized Path',
        description: 'Aggregated traffic path for pattern analysis',
        examples: ['/api/v1/users/{{userId}}/profile'],
        inputType: 'text' as const,
        placeholder: 'Enter normalized path...'
      },
      {
        key: 'status_code',
        label: 'Status Code',
        description: 'HTTP response status code',
        examples: ['-1', '200', '404', '500'],
        inputType: 'dropdown' as const,
        options: ['-1', '200', '201', '204', '400', '401', '403', '404', '500', '502', '503'],
        placeholder: 'Select status code...'
      },
      {
        key: 'media_type',
        label: 'Media Type',
        description: 'Content type specification',
        examples: ['application/json', 'text/plain', 'multipart/form-data'],
        inputType: 'dropdown' as const,
        options: ['application/json', 'text/plain', 'multipart/form-data', 'text/html', 'application/xml'],
        placeholder: 'Select media type...'
      },
      {
        key: 'pipeline',
        label: 'Pipeline',
        description: 'Traffic processing pipeline assignment',
        examples: ['primary', 'structured_text', 'file_download'],
        inputType: 'dropdown' as const,
        options: ['primary', 'structured_text', 'file_download', 'data_platform', 'infra', 'data_q'],
        placeholder: 'Select pipeline...'
      },
      {
        key: 'gw_code',
        label: 'Gateway Code',
        description: 'Gateway Code for internal traffic control',
        examples: ['2003', '3004', '4001'],
        inputType: 'dropdown' as const,
        options: ['2003', '3004', '4001', '1001', '1002', '5005'],
        placeholder: 'Select gateway code...'
      }
    ]
  },
  data: {
    name: 'Data',
    icon: Database,
    description: 'Data-related metadata fields',
    options: [
      {
        key: 'nodes',
        label: 'Nodes',
        description: 'Total number of data fields in the traffic',
        examples: ['150', '2500'],
        inputType: 'range' as const,
        placeholder: 'Enter number of nodes...'
      },
      {
        key: 'nodes_pseudonymized',
        label: 'Nodes Pseudonymized',
        description: 'Data fields pseudonymized in this traffic',
        examples: ['12', '89'],
        inputType: 'range' as const,
        placeholder: 'Enter pseudonymized nodes...'
      },
      {
        key: 'nodes_user_data',
        label: 'Nodes User Data',
        description: 'Personal data fields detected in this traffic',
        examples: ['5', '23'],
        inputType: 'range' as const,
        placeholder: 'Enter user data nodes...'
      },
      {
        key: 'nodes_eu_user_data',
        label: 'Nodes EU User Data',
        description: 'EU user data fields identified in this traffic',
        examples: ['3', '15'],
        inputType: 'range' as const,
        placeholder: 'Enter EU user data nodes...'
      },
      {
        key: 'nodes_has_schema',
        label: 'Nodes Has Schema',
        description: 'Schema-validated data fields in this traffic',
        examples: ['100', '200'],
        inputType: 'range' as const,
        placeholder: 'Enter schema nodes...'
      },
      {
        key: 'bytedatatag_id',
        label: 'Byte Data Tag ID',
        description: 'Foreign key to bytedatatag classification',
        examples: ['33', '98', '2090', '1207', '372'],
        inputType: 'dropdown' as const,
        options: ['33', '98', '2090', '1207', '372'],
        placeholder: 'Select byte data tag ID...'
      },
      {
        key: 'tag_name',
        label: 'Tag Name',
        description: 'Human-readable data classification label',
        examples: ['UserID', 'EUAGG', 'VideoID', 'ItemID', 'MusicID'],
        inputType: 'dropdown' as const,
        options: ['UserID', 'EUAGG', 'VideoID', 'ItemID', 'MusicID'],
        placeholder: 'Select tag name...'
      }
    ]
  },
  policy: {
    name: 'Policy',
    icon: Shield,
    description: 'Policy-related metadata fields',
    options: [
      {
        key: 'policy_id',
        label: 'Policy ID',
        description: 'Traffic control policy unique identifier',
        examples: ['-1', '7', '14'],
        inputType: 'dropdown' as const,
        options: ['-1', '7', '14'],
        placeholder: 'Select policy ID...'
      },
      {
        key: 'policy_count',
        label: 'Policy Count',
        description: 'Count of fields matching this policy',
        examples: ['5', '25'],
        inputType: 'range' as const,
        placeholder: 'Enter policy count...'
      },
      {
        key: 'data_sender_group',
        label: 'Data Sender Group',
        description: 'Group classification of data sender',
        examples: ['unknown', 'GP', 'SP', 'SA'],
        inputType: 'dropdown' as const,
        options: ['unknown', 'GP', 'SP', 'SA'],
        placeholder: 'Select sender group...'
      },
      {
        key: 'policy_action_id',
        label: 'Policy Action ID',
        description: 'Policy action identifier for traffic control',
        examples: ['1', '8', '6', '3', '2'],
        inputType: 'dropdown' as const,
        options: ['1', '8', '6', '3', '2'],
        placeholder: 'Select policy action ID...'
      },
      {
        key: 'policy_action',
        label: 'Policy Action',
        description: 'Executed governance action on a data field',
        examples: ['redact', 'forbid', 'agg_noise', 'pseudonymize'],
        inputType: 'dropdown' as const,
        options: ['redact', 'forbid', 'agg_noise', 'pseudonymize', 'depseudonymize', 'timestamp_rounding', 'custom_bucket', 'noise_pseudonymize', 'bypass'],
        placeholder: 'Select policy action...'
      },
      {
        key: 'flow_direction',
        label: 'Flow Direction',
        description: 'Policy attribute defining data flow direction',
        examples: ['sender2receiver', 'receiver2sender'],
        inputType: 'dropdown' as const,
        options: ['sender2receiver', 'receiver2sender'],
        placeholder: 'Select flow direction...'
      },
      {
        key: 'legal_exemption_id',
        label: 'Legal Exemption ID',
        description: 'Legal exemption indicator for policy',
        examples: ['Exempted', 'Not Exempted', 'Unknown'],
        inputType: 'dropdown' as const,
        options: ['Exempted', 'Not Exempted', 'Unknown'],
        placeholder: 'Select legal exemption...'
      }
    ]
  }
};

export const TEMPLATE_DATA: FormData = {
  reportName: 'Employee Data Access Analysis Report',
  goal: 'Analyze employee data access patterns and compliance with data governance policies across different geographical locations and departments.',
  analysisType: 'situational',
  background: 'Our organization needs to conduct a comprehensive analysis of employee data access patterns to ensure compliance with regional data protection regulations. This analysis will help identify potential policy violations, unusual access patterns, and areas where additional governance controls may be needed. We need to examine traffic patterns, data classification effectiveness, and policy enforcement across different employee groups and geographical locations.',
  timeRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date()
  },
  metadata: [
    {
      id: '1',
      category: 'employee',
      key: 'access_level',
      value: 'ACCESS_LEVEL_PARTIALLY_RESTRICTED'
    },
    {
      id: '2',
      category: 'traffic',
      key: 'direction',
      value: 'DIRECTION_INBOUND'
    },
    {
      id: '3',
      category: 'data',
      key: 'nodes_user_data',
      value: '15'
    },
    {
      id: '4',
      category: 'policy',
      key: 'policy_action',
      value: 'pseudonymize'
    }
  ]
};
