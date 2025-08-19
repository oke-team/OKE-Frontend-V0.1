'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Sparkles, 
  User,
  Bot,
  Paperclip,
  Mic,
  Image,
  FileText,
  TrendingUp,
  Receipt,
  Calculator,
  ChevronDown,
  Zap,
  MessageCircle,
  HeadphonesIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  action: string;
}

const quickActions: QuickAction[] = [
  { id: '1', label: 'Créer une facture', icon: FileText, action: 'create_invoice' },
  { id: '2', label: 'Voir mes ventes', icon: TrendingUp, action: 'view_sales' },
  { id: '3', label: 'Rapprochement bancaire', icon: Calculator, action: 'bank_reconciliation' },
  { id: '4', label: 'Générer un rapport', icon: Receipt, action: 'generate_report' },
];

interface AssistantChatProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AssistantChat({ isOpen = false, onClose }: AssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant Oké. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simuler une réponse de l'assistant
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Je traite votre demande. Un instant s\'il vous plaît...',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputText(action.label);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Fenêtre de chat - s'étend du header à la navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-20 bottom-28 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-[45] flex flex-col overflow-hidden border border-gray-200 md:top-20 md:bottom-32"
          >
            {/* Header - couleur unie violet */}
            <div className="bg-[#4C34CE] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Assistant Oké</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white/80 text-xs">IA disponible 24/7</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Support humain */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg px-3 py-2 flex items-center justify-center gap-2 transition-colors"
              >
                <HeadphonesIcon className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Support humain</span>
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'assistant' && (
                    <div className="w-8 h-8 bg-[#4C34CE] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-2',
                    message.sender === 'user' 
                      ? 'bg-[#4C34CE] text-white' 
                      : 'bg-white border border-gray-200'
                  )}>
                    <p className={cn(
                      'text-sm',
                      message.sender === 'assistant' && 'text-gray-800'
                    )}>
                      {message.text}
                    </p>
                    <span className={cn(
                      'text-xs mt-1 block',
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    )}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 bg-[#4C34CE] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Actions rapides avec meilleur support du scroll */}
            <div className="border-t border-gray-200 bg-white">
              <div className="px-4 py-2 relative">
                <div 
                  className="flex gap-2 overflow-x-auto pb-1 actions-scroll"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  <style jsx>{`
                    .actions-scroll::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs font-medium text-gray-700 transition-colors whitespace-nowrap"
                    >
                      <action.icon className="w-3.5 h-3.5 text-[#FAA016]" />
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Zone de saisie */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Tapez votre message..."
                    className="w-full px-4 py-2 pr-10 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#4C34CE]/20 text-sm"
                    rows={1}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors">
                    <Mic className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    inputText.trim() 
                      ? "bg-[#FAA016] text-white shadow-lg hover:bg-[#E8941A]" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center justify-center mt-2 text-xs text-gray-400">
                <Zap className="w-3 h-3 mr-1 text-[#FAA016]" />
                Propulsé par OKÉ AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}