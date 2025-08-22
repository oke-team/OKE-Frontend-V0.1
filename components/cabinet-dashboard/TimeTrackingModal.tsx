'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, FileText, Save } from 'lucide-react';
import { CabinetDossier } from '@/lib/mock-data/cabinet-dashboard-data';

interface TimeTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  dossier: CabinetDossier | null;
}

const taskTypes = [
  { id: 'compta', label: 'Saisie comptable', color: 'text-blue-600' },
  { id: 'revision', label: 'Révision', color: 'text-green-600' },
  { id: 'fiscal', label: 'Déclarations fiscales', color: 'text-purple-600' },
  { id: 'social', label: 'Paie et social', color: 'text-orange-600' },
  { id: 'conseil', label: 'Conseil', color: 'text-indigo-600' },
  { id: 'admin', label: 'Administratif', color: 'text-gray-600' },
];

export default function TimeTrackingModal({ isOpen, onClose, dossier }: TimeTrackingModalProps) {
  const [selectedTask, setSelectedTask] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask || !duration) return;

    setIsSubmitting(true);
    
    // Simulation d'enregistrement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setSelectedTask('');
    setDuration('');
    setNotes('');
    setIsSubmitting(false);
    onClose();
  };

  const formatDuration = (value: string) => {
    // Convertit les formats: 1.5, 1h30, 90min en heures décimales
    if (!value) return '';
    
    // Format décimal direct (1.5)
    if (/^\d+\.?\d*$/.test(value)) {
      return `${parseFloat(value)} h`;
    }
    
    // Format heures + minutes (1h30, 1:30)
    const hourMinuteMatch = value.match(/^(\d+)[h:](\d+)$/);
    if (hourMinuteMatch) {
      const hours = parseInt(hourMinuteMatch[1]);
      const minutes = parseInt(hourMinuteMatch[2]);
      return `${(hours + minutes / 60).toFixed(2)} h`;
    }
    
    // Format minutes seulement (90min, 90m)
    const minutesMatch = value.match(/^(\d+)m(?:in)?$/);
    if (minutesMatch) {
      const minutes = parseInt(minutesMatch[1]);
      return `${(minutes / 60).toFixed(2)} h`;
    }
    
    return value;
  };

  if (!isOpen || !dossier) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4C34CE] to-[#6246EA] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Saisie de temps</h2>
                <p className="text-blue-100 text-sm mt-1">{dossier.nomEntreprise}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Type de tâche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de tâche
              </label>
              <div className="grid grid-cols-2 gap-2">
                {taskTypes.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTask(task.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      selectedTask === task.id
                        ? 'border-[#4C34CE] bg-[#4C34CE]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`text-sm font-medium ${task.color}`}>
                      {task.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Durée */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="1.5 ou 1h30 ou 90min"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-transparent"
                  required
                />
              </div>
              {duration && (
                <p className="text-xs text-gray-500 mt-1">
                  = {formatDuration(duration)}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optionnel)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Détails sur les tâches effectuées..."
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C34CE] focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={!selectedTask || !duration || isSubmitting}
                className="flex-1 px-4 py-3 bg-[#4C34CE] text-white rounded-lg hover:bg-[#3d2a9f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}