'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Check, X, AlertCircle, Loader2 } from 'lucide-react';

interface LogoUploaderProps {
  onLogoUpload: (file: File) => Promise<void>;
  onLogoRemove?: () => void;
  currentLogoUrl?: string;
  isUploading?: boolean;
  error?: string;
  accept?: string;
  maxSize?: number; // en bytes
  className?: string;
}

export default function LogoUploader({
  onLogoUpload,
  onLogoRemove,
  currentLogoUrl,
  isUploading = false,
  error,
  accept = "image/*",
  maxSize = 10 * 1024 * 1024, // 10MB par défaut
  className = ''
}: LogoUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentLogoUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Vérification du type
    if (!file.type.startsWith('image/')) {
      return 'Veuillez sélectionner un fichier image valide.';
    }

    // Vérification de la taille
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return `Le fichier est trop volumineux. Taille maximum : ${maxSizeMB}MB.`;
    }

    // Vérification de la taille minimum (1KB)
    if (file.size < 1024) {
      return 'Le fichier est trop petit (minimum 1KB).';
    }

    return null;
  };

  const handleFileSelect = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      return;
    }

    // Génère une preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      await onLogoUpload(file);
    } catch (err) {
      setPreview(currentLogoUrl || null);
    }
  }, [onLogoUpload, currentLogoUrl, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
    // Reset l'input pour permettre de sélectionner le même fichier
    e.target.value = '';
  }, [handleFileSelect]);

  const handleRemoveLogo = useCallback(() => {
    setPreview(null);
    onLogoRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onLogoRemove]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Zone de drop principale */}
      <motion.div
        className={`
          relative w-full h-40 sm:h-48 rounded-xl border-2 border-dashed backdrop-blur-sm
          transition-all duration-200 overflow-hidden
          ${isDragOver 
            ? 'border-primary-400 bg-primary/10 sm:scale-105' 
            : preview 
              ? 'border-green-400/50 bg-green-500/5'
              : 'border-neutral-600 bg-white/5 hover:border-neutral-500 hover:bg-white/8'
          }
          ${!isUploading && !preview ? 'cursor-pointer' : ''}
          touch-manipulation
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!isUploading && !preview ? openFileDialog : undefined}
        whileHover={!isUploading && !preview ? { scale: 1.02 } : {}}
        whileTap={!isUploading && !preview ? { scale: 0.98 } : {}}
      >
        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 animate-spin mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base text-white font-medium mb-1">Upload en cours...</p>
              <p className="text-xs sm:text-sm text-neutral-400">Veuillez patienter</p>
              
              {/* Barre de progression simulée */}
              <div className="w-32 h-1 bg-neutral-700 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-primary-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          ) : preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
              {/* Image preview */}
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview du logo"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shadow-lg"
                />
                
                {/* Badge de succès */}
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              </div>

              <p className="text-sm sm:text-base text-green-400 font-medium mt-2 sm:mt-3 mb-1">Logo uploadé avec succès !</p>
              
              {/* Actions */}
              <div className="flex space-x-2 mt-2 sm:mt-3">
                <motion.button
                  onClick={openFileDialog}
                  className="px-3 py-2 sm:py-1.5 text-xs bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors min-h-[44px] sm:min-h-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remplacer
                </motion.button>
                <motion.button
                  onClick={handleRemoveLogo}
                  className="px-3 py-2 sm:py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors min-h-[44px] sm:min-h-0 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
            >
              <motion.div
                animate={{ 
                  y: isDragOver ? -5 : 0,
                  scale: isDragOver ? 1.1 : 1 
                }}
                transition={{ duration: 0.2 }}
              >
                {isDragOver ? (
                  <Upload className="w-12 h-12 text-primary-400 mb-3" />
                ) : (
                  <Image className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 mb-2 sm:mb-3" />
                )}
              </motion.div>

              <h4 className="text-sm sm:text-base text-white font-medium mb-2 px-2 text-center">
                {isDragOver ? 'Déposez votre logo ici' : 'Uploadez le logo de votre entreprise'}
              </h4>
              
              <p className="text-neutral-400 text-xs sm:text-sm text-center mb-3 sm:mb-4 px-2">
                <span className="hidden sm:inline">Glissez-déposez un fichier ou </span>Cliquez pour sélectionner
              </p>
              
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-xs text-neutral-500 px-2">
                <span>PNG, JPG, SVG</span>
                <span className="hidden sm:inline">, WebP</span>
                <span className="sm:hidden">...</span>
                <span>•</span>
                <span>Max {formatFileSize(maxSize)}</span>
              </div>

              {/* Animation de pulsation au survol */}
              {isDragOver && (
                <motion.div
                  className="absolute inset-0 border-2 border-primary-400 rounded-xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message d'erreur */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-3 flex items-start space-x-2 text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Informations d'aide */}
      <div className="mt-3 text-xs text-neutral-500 space-y-1">
        <p>• Formats acceptés : PNG, JPG, SVG, WebP</p>
        <p className="hidden sm:block">• Taille recommandée : 256x256px minimum</p>
        <p>• Taille maximum : {formatFileSize(maxSize)}</p>
      </div>
    </div>
  );
}