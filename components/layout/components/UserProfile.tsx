'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Bell,
  CreditCard,
  Users,
  HelpCircle,
  Sparkles,
  ChevronDown,
  Circle
} from 'lucide-react';
import { liquidGlass } from '@/lib/design-system/liquid-glass';

interface UserProfileProps {
  size?: 'compact' | 'medium' | 'large';
  showName?: boolean;
  showStatus?: boolean;
  className?: string;
}

interface User {
  name: string;
  email: string;
  initials: string;
  avatar?: string;
  role: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  plan: 'starter' | 'pro' | 'enterprise';
}

/**
 * UserProfile - Avatar utilisateur amélioré avec ring gradient
 * 
 * Caractéristiques :
 * - Avatar avec ring gradient animé selon le statut
 * - Menu utilisateur avec animations fluides
 * - Tailles adaptatives et options d'affichage
 * - Indicateur de statut en ligne
 * - Badge de plan premium
 * - Gestion des raccourcis clavier
 * - Effets Liquid Glass pour le menu
 */
const UserProfile: React.FC<UserProfileProps> = ({
  size = 'medium',
  showName = true,
  showStatus = false,
  className = ''
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useState<User>({
    name: 'Jean Dupont',
    email: 'jean@techcorp.fr',
    initials: 'JD',
    role: 'Dirigeant',
    status: 'online',
    plan: 'pro'
  });
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Configuration des tailles
  const sizeConfig = {
    compact: {
      avatar: 'w-8 h-8',
      text: 'text-sm',
      ring: 'ring-2',
      container: 'gap-2'
    },
    medium: {
      avatar: 'w-9 h-9',
      text: 'text-sm',
      ring: 'ring-2',
      container: 'gap-2'
    },
    large: {
      avatar: 'w-10 h-10',
      text: 'text-sm',
      ring: 'ring-3',
      container: 'gap-3'
    }
  };

  const config = sizeConfig[size];

  // Couleurs du ring selon le statut
  const statusColors = {
    online: 'from-emerald-400 to-green-500',
    away: 'from-amber-400 to-yellow-500',
    busy: 'from-red-400 to-rose-500',
    offline: 'from-slate-300 to-slate-400'
  };

  // Couleurs du plan
  const planColors = {
    starter: 'bg-slate-100 text-slate-600',
    pro: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    enterprise: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
  };

  // Gestion des clics extérieurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuAction = (action: string) => {
    console.log(`User menu action: ${action}`);
    setIsMenuOpen(false);
  };

  const getStatusIndicator = () => (
    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3">
      <motion.div
        className={`
          w-full h-full rounded-full bg-gradient-to-r ${statusColors[user.status]} 
          border-2 border-white shadow-sm
        `}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Pulse effect pour online */}
      {user.status === 'online' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.7, 0.3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      )}
    </div>
  );

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      {/* Profile Button */}
      <motion.button
        onClick={handleMenuToggle}
        className={`
          flex items-center ${config.container} p-1 rounded-lg hover:bg-slate-50/95 
          transition-all duration-200 group
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Menu utilisateur"
        aria-expanded={isMenuOpen}
      >
        {/* Avatar avec ring gradient */}
        <div className="relative">
          <motion.div
            className={`
              ${config.avatar} rounded-full relative overflow-hidden
              ${config.ring} ring-offset-2 bg-gradient-to-br ${statusColors[user.status]}
              shadow-lg
            `}
            animate={{
              boxShadow: [
                `0 0 0 0px rgba(16, 185, 129, 0.4)`,
                `0 0 0 4px rgba(16, 185, 129, 0.1)`,
                `0 0 0 0px rgba(16, 185, 129, 0.4)`
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Ring gradient animé */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent 0deg, ${user.status === 'online' ? '#10b981' : '#64748b'} 180deg, transparent 360deg)`
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            
            {/* Avatar content */}
            <div className="relative inset-0.5 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {user.initials}
                </motion.span>
              )}
            </div>
          </motion.div>

          {/* Status indicator */}
          {showStatus && getStatusIndicator()}
        </div>

        {/* Name and role */}
        {showName && (
          <div className="flex flex-col items-start min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-medium text-slate-900 truncate ${config.text}`}>
                {user.name}
              </span>
              
              {/* Plan badge */}
              <span className={`
                px-2 py-0.5 text-xs font-bold rounded-full
                ${planColors[user.plan]}
              `}>
                {user.plan.toUpperCase()}
              </span>
            </div>
            
            <span className="text-xs text-slate-500 truncate">
              {user.role}
            </span>
          </div>
        )}

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown size={14} className="text-slate-400" />
        </motion.div>
      </motion.button>

      {/* User Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full right-0 z-50 mt-2 w-80"
            style={liquidGlass.effects.elevated}
          >
            <div className="rounded-xl overflow-hidden">
              {/* User Info Header */}
              <div className="px-4 py-4 bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`
                      w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 
                      flex items-center justify-center text-white font-bold shadow-lg
                    `}>
                      {user.initials}
                    </div>
                    {getStatusIndicator()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {user.name}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{user.role}</span>
                      <Circle size={4} className="text-slate-300 fill-current" />
                      <span className={`
                        text-xs px-2 py-0.5 rounded-full
                        ${planColors[user.plan]}
                      `}>
                        Plan {user.plan.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <div className="space-y-1">
                  <button
                    onClick={() => handleMenuAction('profile')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/95 transition-colors text-left group"
                  >
                    <User size={16} className="text-slate-400 group-hover:text-slate-600" />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      Mon profil
                    </span>
                  </button>

                  <button
                    onClick={() => handleMenuAction('settings')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/95 transition-colors text-left group"
                  >
                    <Settings size={16} className="text-slate-400 group-hover:text-slate-600" />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      Paramètres
                    </span>
                  </button>

                  <button
                    onClick={() => handleMenuAction('notifications')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/95 transition-colors text-left group"
                  >
                    <Bell size={16} className="text-slate-400 group-hover:text-slate-600" />
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-sm text-slate-700 group-hover:text-slate-900">
                        Notifications
                      </span>
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleMenuAction('billing')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/95 transition-colors text-left group"
                  >
                    <CreditCard size={16} className="text-slate-400 group-hover:text-slate-600" />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      Facturation
                    </span>
                  </button>

                  <button
                    onClick={() => handleMenuAction('team')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/95 transition-colors text-left group"
                  >
                    <Users size={16} className="text-slate-400 group-hover:text-slate-600" />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      Équipe
                    </span>
                  </button>
                </div>

                <div className="my-2 h-px bg-slate-200/50"></div>

                <div className="space-y-1">
                  <button
                    onClick={() => handleMenuAction('admin')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-50/95 transition-colors text-left group"
                  >
                    <Shield size={16} className="text-amber-500 group-hover:text-amber-600" />
                    <span className="text-sm text-amber-700 group-hover:text-amber-800">
                      Administration
                    </span>
                    <span className="ml-auto px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                      Admin
                    </span>
                  </button>

                  <button
                    onClick={() => handleMenuAction('help')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50/95 transition-colors text-left group"
                  >
                    <HelpCircle size={16} className="text-slate-400 group-hover:text-slate-600" />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">
                      Aide & Support
                    </span>
                  </button>
                </div>

                <div className="my-2 h-px bg-slate-200/50"></div>

                <button
                  onClick={() => handleMenuAction('logout')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-left group"
                >
                  <LogOut size={16} className="text-red-400 group-hover:text-red-600" />
                  <span className="text-sm text-red-600 group-hover:text-red-700">
                    Déconnexion
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;