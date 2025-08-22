'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image as ImageIcon, 
  File, 
  Check, 
  Download,
  Eye,
  MoreVertical
} from 'lucide-react';
import { DocumentAttachment } from '@/types/document-viewer';
import { realDocumentUtils } from '@/lib/mock-data/real-documents-data';
import { cn } from '@/lib/utils';
import DocumentPreview from './DocumentPreview';

interface DocumentCardProps {
  document: DocumentAttachment;
  viewMode: 'grid' | 'list';
  isSelected: boolean;
  onSelect: () => void;
  onClick: () => void;
  index: number;
}

const getDocumentIcon = (document: DocumentAttachment) => {
  switch (document.type) {
    case 'pdf':
      return <FileText className="w-6 h-6 text-red-500" />;
    case 'image':
      return <ImageIcon className="w-6 h-6 text-blue-500" />;
    case 'office':
      return <File className="w-6 h-6 text-blue-600" />;
    default:
      return <File className="w-6 h-6 text-gray-500" />;
  }
};

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  viewMode,
  isSelected,
  onSelect,
  onClick,
  index
}) => {
  const fileType = document.type;
  const isViewable = fileType !== 'unsupported';
  
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ delay: index * 0.02 }}
        className={cn(
          "flex items-center gap-3 p-3 bg-white rounded-lg border transition-all cursor-pointer",
          isSelected 
            ? "border-[#4C34CE] bg-[#4C34CE]/5" 
            : "border-gray-200 hover:border-[#4C34CE]/20 hover:shadow-sm"
        )}
      >
        {/* Checkbox */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={cn(
            "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 cursor-pointer",
            isSelected 
              ? "border-[#4C34CE] bg-[#4C34CE]" 
              : "border-gray-300 hover:border-[#4C34CE]"
          )}
        >
          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
        </div>

        {/* Preview/Thumbnail */}
        <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
          <DocumentPreview 
            document={document}
            width={40}
            height={40}
            lazy={false}
            className="w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0" onClick={onClick}>
          <h3 className="font-medium text-gray-900 truncate">
            {document.name}
          </h3>
          <p className="text-sm text-gray-500">
            {realDocumentUtils.formatFileSize(document.size)} • 
            {document.lastModified && realDocumentUtils.formatLastModified(document.lastModified)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {isViewable && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="p-1.5 text-gray-400 hover:text-[#4C34CE] hover:bg-[#4C34CE]/10 rounded transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              realDocumentUtils.downloadDocument(document);
            }}
            className="p-1.5 text-gray-400 hover:text-[#4C34CE] hover:bg-[#4C34CE]/10 rounded transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  // Vue grille
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.02 }}
      className={cn(
        "group bg-white rounded-xl border p-3 transition-all cursor-pointer relative",
        isSelected 
          ? "border-[#4C34CE] shadow-[0_8px_32px_rgba(76,52,206,0.15)]" 
          : "border-[#4C34CE]/10 shadow-[0_4px_20px_rgba(76,52,206,0.06)] hover:border-[#4C34CE]/20 hover:shadow-[0_8px_32px_rgba(76,52,206,0.1)] hover:-translate-y-0.5"
      )}
    >
      {/* Checkbox en overlay */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={cn(
          "absolute top-2 right-2 w-4 h-4 rounded border-2 flex items-center justify-center transition-all cursor-pointer z-10",
          isSelected 
            ? "border-[#4C34CE] bg-[#4C34CE]" 
            : "border-white bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        )}
      >
        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
      </div>

      <div onClick={onClick}>
        {/* Preview avec le nouveau composant optimisé */}
        <div className="aspect-[4/3] bg-gray-50 rounded-lg mb-3 overflow-hidden">
          <DocumentPreview 
            document={document}
            width={180}
            height={135}
            lazy={true}
            className="w-full h-full"
          />
        </div>

        {/* Info */}
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
          {document.name}
        </h3>

        {/* Status/Actions en bas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {fileType === 'pdf' && (
              <span className="inline-flex px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">
                PDF • {realDocumentUtils.formatFileSize(document.size)}
              </span>
            )}
            {fileType === 'image' && (
              <span className="inline-flex px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                IMG • {realDocumentUtils.formatFileSize(document.size)}
              </span>
            )}
            {fileType === 'office' && (
              <span className="inline-flex px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded">
                DOC • {realDocumentUtils.formatFileSize(document.size)}
              </span>
            )}
            {fileType === 'unsupported' && (
              <span className="inline-flex px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                FILE • {realDocumentUtils.formatFileSize(document.size)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {isViewable && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="p-1 text-gray-400 hover:text-[#4C34CE] transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                realDocumentUtils.downloadDocument(document);
              }}
              className="p-1 text-gray-400 hover:text-[#4C34CE] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;