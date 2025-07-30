
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Download, Check } from 'lucide-react';

interface ParsedRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
}

interface MockResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

interface CommentData {
  text: string;
  images: string[];
}

interface FieldData {
  id: string;
  fieldPath: string;
  source: string;
  category: string;
  hasSchema: string;
  prodTag: string;
  gcpTag: string;
  deccTag: string;
  attributedTo: string;
  dataSovereignty: string;
  policyAction: string;
  linkToFinding: string;
  comment: string;
  selectedFinding?: string;
  selectedComment?: CommentData;
}

interface SaveAnnotationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  curlInput: string;
  parsedRequest: ParsedRequest | null;
  response: MockResponse | null;
  selectedFields: FieldData[];
  onSave?: (annotations: FieldData[]) => void;
}

export const SaveAnnotationsModal: React.FC<SaveAnnotationsModalProps> = ({
  isOpen,
  onClose,
  curlInput,
  parsedRequest,
  response,
  selectedFields,
  onSave
}) => {
  const [includeOptions, setIncludeOptions] = useState({
    curl: true,
    response: true,
    enhancementSchedule: true,
    fieldAnalysis: true,
    selectedFields: true
  });

  const handleOptionChange = (option: keyof typeof includeOptions) => {
    setIncludeOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const generateSaveData = () => {
    const saveData: any = {
      timestamp: new Date().toISOString(),
      annotations: {}
    };

    if (includeOptions.curl && curlInput) {
      saveData.annotations.curlCommand = curlInput;
    }

    if (includeOptions.response && response) {
      saveData.annotations.response = response;
    }

    if (includeOptions.enhancementSchedule && parsedRequest) {
      saveData.annotations.enhancementSchedule = {
        url: parsedRequest.url,
        method: parsedRequest.method,
        estimatedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };
    }

    if (includeOptions.fieldAnalysis && parsedRequest) {
      saveData.annotations.fieldAnalysis = {
        totalFields: selectedFields.length,
        analyzedRequest: parsedRequest
      };
    }

    if (includeOptions.selectedFields) {
      saveData.annotations.selectedFieldsWithAnnotations = selectedFields.map(field => ({
        fieldPath: field.fieldPath,
        source: field.source,
        category: field.category,
        finding: field.selectedFinding,
        comment: field.selectedComment,
        metadata: {
          hasSchema: field.hasSchema,
          prodTag: field.prodTag,
          gcpTag: field.gcpTag,
          deccTag: field.deccTag,
          attributedTo: field.attributedTo,
          dataSovereignty: field.dataSovereignty,
          policyAction: field.policyAction
        }
      }));
    }

    return saveData;
  };

  const handleSave = () => {
    if (onSave) {
      onSave(selectedFields);
    }
    onClose();
  };

  const handleDownload = () => {
    const data = generateSaveData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `traffic-annotations-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    if (onSave) {
      onSave(selectedFields);
    }
    onClose();
  };

  const modalStyle: React.CSSProperties = {
    maxWidth: '500px',
    width: '90vw'
  };

  const optionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '8px',
    cursor: 'pointer',
    backgroundColor: '#ffffff'
  };

  const selectedOptionStyle: React.CSSProperties = {
    ...optionStyle,
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb'
  };

  const previewData = generateSaveData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={modalStyle}>
        <DialogHeader>
          <DialogTitle>Save Traffic Annotations</DialogTitle>
          <DialogDescription>
            Select which components to include in your annotation export
          </DialogDescription>
        </DialogHeader>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', color: '#111827' }}>
            Include in Export:
          </h4>
          
          <div
            style={includeOptions.curl ? selectedOptionStyle : optionStyle}
            onClick={() => handleOptionChange('curl')}
          >
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '3px', 
              border: '2px solid #d1d5db',
              backgroundColor: includeOptions.curl ? '#2563eb' : 'transparent',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {includeOptions.curl && <Check size={10} color="white" />}
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>cURL Command</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Original request command</div>
            </div>
          </div>

          <div
            style={includeOptions.response ? selectedOptionStyle : optionStyle}
            onClick={() => handleOptionChange('response')}
          >
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '3px', 
              border: '2px solid #d1d5db',
              backgroundColor: includeOptions.response ? '#2563eb' : 'transparent',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {includeOptions.response && <Check size={10} color="white" />}
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>Response Data</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Complete response information</div>
            </div>
          </div>

          <div
            style={includeOptions.enhancementSchedule ? selectedOptionStyle : optionStyle}
            onClick={() => handleOptionChange('enhancementSchedule')}
          >
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '3px', 
              border: '2px solid #d1d5db',
              backgroundColor: includeOptions.enhancementSchedule ? '#2563eb' : 'transparent',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {includeOptions.enhancementSchedule && <Check size={10} color="white" />}
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>API Enhancement Schedule</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Enhancement timeline information</div>
            </div>
          </div>

          <div
            style={includeOptions.fieldAnalysis ? selectedOptionStyle : optionStyle}
            onClick={() => handleOptionChange('fieldAnalysis')}
          >
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '3px', 
              border: '2px solid #d1d5db',
              backgroundColor: includeOptions.fieldAnalysis ? '#2563eb' : 'transparent',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {includeOptions.fieldAnalysis && <Check size={10} color="white" />}
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>Field Analysis</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>General field analysis results</div>
            </div>
          </div>

          <div
            style={includeOptions.selectedFields ? selectedOptionStyle : optionStyle}
            onClick={() => handleOptionChange('selectedFields')}
          >
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '3px', 
              border: '2px solid #d1d5db',
              backgroundColor: includeOptions.selectedFields ? '#2563eb' : 'transparent',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {includeOptions.selectedFields && <Check size={10} color="white" />}
            </div>
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>Selected Fields & Annotations</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {selectedFields.length} annotated fields
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '500', marginBottom: '8px', color: '#111827' }}>
            Preview Export Data:
          </div>
          <pre style={{ 
            fontSize: '10px', 
            color: '#6b7280', 
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            {JSON.stringify(previewData, null, 2)}
          </pre>
        </div>

        <DialogFooter style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Save Annotations
          </button>
          <button
            onClick={handleDownload}
            style={{
              padding: '8px 16px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Download size={16} />
            Download JSON
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
