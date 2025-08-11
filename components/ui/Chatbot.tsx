'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Paperclip,
  Sparkles,
  User,
  Bot,
  HeadphonesIcon,
  Clock,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'support';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  attachments?: string[];
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * Chatbot inspiré de Papercups
 * - IA pour piloter l'app en langage naturel
 * - Support humain intégré
 * - Système de tickets
 */
export default function Chatbot({ isOpen, onClose, className }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Bonjour ! Je suis votre assistant Oké. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<'ai' | 'support'>('ai');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulation de réponse
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: mode === 'ai' ? 'bot' : 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('facture')) {
      return 'Je peux vous aider avec les factures. Voulez-vous créer une nouvelle facture, consulter vos factures existantes ou importer des factures ?';
    }
    if (lowerInput.includes('virement') || lowerInput.includes('paiement')) {
      return 'Pour effectuer un virement, accédez au module Banque. Je peux vous y rediriger ou vous guider étape par étape.';
    }
    if (lowerInput.includes('rapport') || lowerInput.includes('analyse')) {
      return 'Le module Reporting vous permet de générer des analyses détaillées. Quel type de rapport souhaitez-vous consulter ?';
    }
    if (lowerInput.includes('aide') || lowerInput.includes('support')) {
      return 'Je suis là pour vous aider ! Vous pouvez aussi basculer en mode support humain si vous préférez parler à un conseiller.';
    }
    
    return 'Je comprends votre demande. Laissez-moi analyser cela pour vous...';
  };

  const quickActions = [
    { label: 'Créer une facture', icon: MessageSquare },
    { label: 'Voir mes ventes', icon: MessageSquare },
    { label: 'Rapprochement bancaire', icon: MessageSquare },
    { label: 'Support humain', icon: HeadphonesIcon }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            "fixed bottom-4 right-4 z-50",
            "w-96 h-[600px] max-h-[80vh]",
            "bg-white dark:bg-neutral-900",
            "rounded-2xl shadow-2xl",
            "border border-neutral-200 dark:border-neutral-800",
            "flex flex-col",
            "md:bottom-6 md:right-6",
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  {mode === 'ai' ? (
                    <Sparkles className="w-5 h-5 text-white" />
                  ) : (
                    <HeadphonesIcon className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {mode === 'ai' ? 'Assistant Oké' : 'Support Oké'}
                </h3>
                <p className="text-xs text-neutral-500">
                  {mode === 'ai' ? 'IA disponible 24/7' : 'Équipe support'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode selector */}
          <div className="flex gap-2 p-3 border-b border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setMode('ai')}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                mode === 'ai' 
                  ? "bg-primary text-white" 
                  : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              )}
            >
              Assistant IA
            </button>
            <button
              onClick={() => setMode('support')}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                mode === 'support' 
                  ? "bg-primary text-white" 
                  : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              )}
            >
              Support humain
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.sender === 'user' && "flex-row-reverse"
                )}
              >
                {/* Avatar */}
                {message.sender !== 'user' && (
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      message.sender === 'bot' 
                        ? "bg-gradient-to-r from-primary to-secondary"
                        : "bg-green-500"
                    )}>
                      {message.sender === 'bot' ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2",
                    message.sender === 'user'
                      ? "bg-primary text-white"
                      : "bg-neutral-100 dark:bg-neutral-800"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className={cn(
                    "flex items-center gap-2 mt-1",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    {message.sender === 'user' && message.status && (
                      <>
                        {message.status === 'sending' && <Clock className="w-3 h-3" />}
                        {message.status === 'sent' && <CheckCircle className="w-3 h-3" />}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-neutral-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-neutral-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-neutral-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(action.label)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}