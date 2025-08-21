'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Image, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentUploadZoneProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadFile {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

const DocumentUploadZone: React.FC<DocumentUploadZoneProps> = ({ isOpen, onClose }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFiles = useCallback((files: FileList | File[]) => {
    const newFiles: UploadFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending' as const,
      progress: 0
    }));

    setUploadFiles(prev => [...prev, ...newFiles]);

    // Simuler l'upload
    newFiles.forEach(uploadFile => {
      setTimeout(() => {
        setUploadFiles(prev => prev.map(f => 
          f.id === uploadFile.id ? { ...f, status: 'uploading' } : f
        ));

        // Simuler la progression
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 20;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setUploadFiles(prev => prev.map(f => 
              f.id === uploadFile.id ? { ...f, status: 'success', progress } : f
            ));
          } else {
            setUploadFiles(prev => prev.map(f => 
              f.id === uploadFile.id ? { ...f, progress } : f
            ));
          }
        }, 200);
      }, 500);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const removeFile = useCallback((fileId: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    }
    if (file.type === 'application/pdf') {
      return <FileText className="w-5 h-5 text-red-500" />;
    }
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Upload de documents</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="p-6">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer",
              isDragOver 
                ? "border-[#4C34CE] bg-[#4C34CE]/5" 
                : "border-gray-300 hover:border-[#4C34CE]/40 hover:bg-[#4C34CE]/5"
            )}
          >
            <Upload className={cn(
              "w-12 h-12 mx-auto mb-4 transition-colors",
              isDragOver ? "text-[#4C34CE]" : "text-gray-400"
            )} />
            
            <h3 className="text-lg font-medium mb-2">
              {isDragOver ? "Déposez vos fichiers ici" : "Glissez vos documents ici"}
            </h3>
            
            <p className="text-gray-500 mb-4">
              ou{' '}
              <label className="text-[#4C34CE] font-medium cursor-pointer hover:underline">
                parcourez vos fichiers
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.xls,.xlsx"
                />
              </label>
            </p>
            
            <p className="text-sm text-gray-400">
              PDF, Images, Documents Office - Jusqu'à 10MB par fichier
            </p>
          </div>

          {/* Files List */}
          <AnimatePresence>
            {uploadFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 space-y-2 max-h-60 overflow-y-auto"
              >
                {uploadFiles.map((uploadFile) => (
                  <motion.div
                    key={uploadFile.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    {getFileIcon(uploadFile.file)}
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {uploadFile.file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-500">
                          {(uploadFile.file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                        
                        {uploadFile.status === 'uploading' && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#4C34CE] transition-all duration-300"
                                style={{ width: `${uploadFile.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">
                              {Math.round(uploadFile.progress)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {uploadFile.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    )}
                    
                    {uploadFile.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}

                    <button
                      onClick={() => removeFile(uploadFile.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {uploadFiles.length > 0 && (
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={() => setUploadFiles([])}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Tout supprimer
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#4C34CE] text-white rounded-lg hover:bg-[#4C34CE]/90 transition-colors"
            >
              Terminer
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DocumentUploadZone;