'use client';

import React, { useState } from 'react';
import { usePdfConfig } from '@/lib/hooks/usePdfConfig';
import { FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function PdfPreviewTest() {
  const { isReady } = usePdfConfig();
  const [testResult, setTestResult] = useState<'pending' | 'success' | 'error'>('pending');

  const testPdfLoad = async () => {
    if (!isReady) {
      setTestResult('error');
      return;
    }

    try {
      // Test basique d'import de react-pdf
      const { Document } = await import('react-pdf');
      setTestResult('success');
      console.log('PDF configuration test: SUCCESS');
    } catch (error) {
      console.error('PDF configuration test: FAILED', error);
      setTestResult('error');
    }
  };

  React.useEffect(() => {
    if (isReady) {
      testPdfLoad();
    }
  }, [isReady]);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg border border-gray-200 shadow-lg z-50 max-w-xs">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium">PDF Preview Status</span>
      </div>
      
      <div className="mt-2 flex items-center gap-2 text-sm">
        {!isReady ? (
          <>
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-700">Configuration en cours...</span>
          </>
        ) : testResult === 'success' ? (
          <>
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-700">Previews PDF activées ✓</span>
          </>
        ) : testResult === 'error' ? (
          <>
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-700">Erreur configuration PDF</span>
          </>
        ) : (
          <>
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-blue-700">Test en cours...</span>
          </>
        )}
      </div>
      
      {testResult === 'success' && (
        <div className="mt-1 text-xs text-gray-500">
          Les thumbnails PDF se génèrent automatiquement
        </div>
      )}
    </div>
  );
}