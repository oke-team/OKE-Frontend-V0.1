'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  CreditCard,
  HelpCircle,
  FileText,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface UserInfo {
  name: string;
  email: string;
  initials: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
}

interface AvatarDropdownProps {
  user: UserInfo;
  onSignOut?: () => void;
  className?: string;
}

const menuItems = [
  {
    id: 'profile',
    label: 'Mon profil',
    icon: User,
    href: '/profile',
    divider: false
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: Settings,
    href: '/settings',
    divider: true
  },
  {
    id: 'billing',
    label: 'Facturation',
    icon: CreditCard,
    href: '/billing',
    divider: false
  },
  {
    id: 'security',
    label: 'Sécurité',
    icon: Shield,
    href: '/security',
    divider: false
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    href: '/notifications',
    divider: true
  },
  {
    id: 'help',
    label: 'Aide et support',
    icon: HelpCircle,
    href: '/help',
    divider: false
  },
  {
    id: 'docs',
    label: 'Documentation',
    icon: FileText,
    href: '/docs',
    divider: true
  },
  {
    id: 'logout',
    label: 'Déconnexion',
    icon: LogOut,
    action: 'logout',
    divider: false,
    accent: 'danger'
  }
];

export default function AvatarDropdown({ user, onSignOut, className }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTimeout(() => setShowFullMenu(false), 200);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    if (item.action === 'logout') {
      onSignOut?.();
    }
    setIsOpen(false);
    setTimeout(() => setShowFullMenu(false), 200);
  };

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setTimeout(() => setShowFullMenu(false), 200);
    }
  };

  const visibleItems = showFullMenu ? menuItems : menuItems.slice(0, 3);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Avatar Button */}
      <motion.button
        onClick={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
          "bg-gradient-to-br from-[#4C34CE] to-[#6B46FF]",
          "hover:shadow-lg hover:shadow-[#4C34CE]/25",
          isOpen && "ring-2 ring-[#4C34CE]/30 ring-offset-2"
        )}
      >
        {user.avatarUrl ? (
          <img 
            src={user.avatarUrl} 
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white font-semibold text-sm">
            {user.initials}
          </span>
        )}
        
        {/* Status indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "absolute right-0 mt-2 z-50",
                "w-72 max-w-[calc(100vw-2rem)]",
                "bg-white rounded-xl shadow-2xl",
                "border border-gray-100",
                "overflow-hidden"
              )}
            >
              {/* User Info Header */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full",
                      "bg-gradient-to-br from-[#4C34CE] to-[#6B46FF]"
                    )}>
                      {user.avatarUrl ? (
                        <img 
                          src={user.avatarUrl} 
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-semibold">
                          {user.initials}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {user.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                      {user.role && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#4C34CE]/10 text-[#4C34CE] mt-1">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2 max-h-[400px] overflow-y-auto">
                {visibleItems.map((item, index) => {
                  const Icon = item.icon;
                  const isLast = index === visibleItems.length - 1;
                  const isDanger = item.accent === 'danger';
                  
                  return (
                    <React.Fragment key={item.id}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={() => handleMenuItemClick(item)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 transition-all",
                            "hover:bg-gray-50",
                            isDanger && "hover:bg-red-50"
                          )}
                        >
                          <Icon className={cn(
                            "w-4 h-4",
                            isDanger ? "text-red-500" : "text-gray-400"
                          )} />
                          <span className={cn(
                            "text-sm",
                            isDanger ? "text-red-600 font-medium" : "text-gray-700"
                          )}>
                            {item.label}
                          </span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleMenuItemClick(item)}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 transition-all text-left",
                            "hover:bg-gray-50",
                            isDanger && "hover:bg-red-50"
                          )}
                        >
                          <Icon className={cn(
                            "w-4 h-4",
                            isDanger ? "text-red-500" : "text-gray-400"
                          )} />
                          <span className={cn(
                            "text-sm",
                            isDanger ? "text-red-600 font-medium" : "text-gray-700"
                          )}>
                            {item.label}
                          </span>
                        </button>
                      )}
                      {item.divider && !isLast && (
                        <div className="my-1 mx-4 border-t border-gray-100" />
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Show More Button */}
                {!showFullMenu && (
                  <>
                    <div className="my-1 mx-4 border-t border-gray-100" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFullMenu(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-[#4C34CE] hover:bg-[#4C34CE]/5 transition-all font-medium"
                    >
                      <ChevronDown className="w-4 h-4" />
                      Voir plus
                    </button>
                  </>
                )}
              </div>

              {/* Footer with Connect Button */}
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 px-4 bg-[#4C34CE] hover:bg-[#5A42DB] text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  Connecter
                  <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}