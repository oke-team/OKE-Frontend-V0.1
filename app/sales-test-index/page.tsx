'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Layers, 
  PanelRight, 
  SplitSquareHorizontal, 
  MousePointer, 
  Sparkles,
  Eye,
  ChevronRight
} from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import Link from 'next/link';

export default function SalesTestIndexPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const versions = [
    {
      id: 'test-1',
      title: 'Toolbar Flottante',
      description: 'Header minimaliste avec actions flottantes en bas à droite',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Header épuré',
        'Toolbar en bas à droite',
        'Menu avancé contextuel',
        'Actions principales visibles'
      ],
      pros: ['Interface claire', 'Actions accessibles', 'Pas d\'encombrement'],
      cons: ['Actions éloignées du header', 'Peut être manqué']
    },
    {
      id: 'test-2',  
      title: 'Sidebar Actions',
      description: 'Panel latéral dédié aux actions avec organisation par catégories',
      icon: PanelRight,
      color: 'from-emerald-500 to-teal-500',
      features: [
        'Panel latéral 320px',
        'Actions par catégories',
        'Design vertical élégant',
        'Sauvegarder en évidence'
      ],
      pros: ['Organisation parfaite', 'Beaucoup d\'espace', 'Très structuré'],
      cons: ['Prend de l\'espace', 'Peut sembler lourd']
    },
    {
      id: 'test-3',
      title: 'Split Header (2 niveaux)',
      description: 'Header structuré avec actions organisées en groupes logiques',
      icon: SplitSquareHorizontal,
      color: 'from-purple-500 to-violet-500',
      features: [
        'Niveau 1: Infos contextuelles',
        'Niveau 2: Actions groupées',
        'Hiérarchisation claire',
        'Style professionnel'
      ],
      pros: ['Très organisé', 'Évolutif', 'Professionnel'],
      cons: ['Plus de hauteur', 'Complexité visuelle']
    },
    {
      id: 'test-4',
      title: 'Quick Actions contextuelles',
      description: 'Actions au survol des sections avec Command Palette',
      icon: MousePointer,
      color: 'from-orange-500 to-red-500',
      features: [
        'Actions au hover',
        'Command Palette ⌘K',
        'Raccourcis clavier',
        'Style Notion/moderne'
      ],
      pros: ['Interface épurée', 'Très moderne', 'Power users'],
      cons: ['Actions cachées', 'Courbe d\'apprentissage']
    },
    {
      id: 'test-5',
      title: 'Apple Vision Pro',
      description: 'Effets Liquid Glass poussés avec micro-animations',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      features: [
        'Effets glass avancés',
        'Micro-animations',
        'Particules flottantes',
        'Style Vision Pro'
      ],
      pros: ['Très impressionnant', 'Effets wow', 'Premium'],
      cons: ['Peut distraire', 'Performance']
    },
    {
      id: 'test-6',
      title: 'Navbar Verticale Large',
      description: 'Variante Version 1 avec navbar droite, header réduit et facture élargie',
      icon: PanelRight,
      color: 'from-indigo-500 to-purple-600',
      features: [
        'Navbar verticale à droite',
        'Header réduit/supprimé',
        'Facture en plus large',
        'Boutons colorés + tooltips'
      ],
      pros: ['Facture très visible', 'Actions organisées', 'Gain d\'espace horizontal'],
      cons: ['Navbar prend de l\'espace', 'Actions éloignées du contenu']
    }
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-[#4C34CE] via-[#6246EA] to-[#FAA016] bg-clip-text text-transparent mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Comparaison des modèles de Modal
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Testez et comparez les différentes approches d'organisation des actions dans le modal de facture.
            Chaque version explore une philosophie d'interface différente.
          </motion.p>
        </motion.div>

        {/* Grille des versions */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {versions.map((version, index) => (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onMouseEnter={() => setHoveredCard(version.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                <Link href={`/sales-${version.id}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="h-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 cursor-pointer overflow-hidden relative"
                    style={{
                      background: hoveredCard === version.id 
                        ? 'rgba(255, 255, 255, 0.95)' 
                        : 'white',
                      backdropFilter: hoveredCard === version.id ? 'blur(10px)' : 'none',
                      boxShadow: hoveredCard === version.id 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Effet de gradient au hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${version.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    {/* Icône */}
                    <motion.div
                      className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${version.color} flex items-center justify-center`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <version.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Titre et description */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                      {version.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {version.description}
                    </p>

                    {/* Caractéristiques */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Caractéristiques</h4>
                        <div className="space-y-1">
                          {version.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-xs text-gray-600">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${version.color} mr-2 flex-shrink-0`} />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                      <div>
                        <h4 className="font-semibold text-emerald-700 mb-1">Avantages</h4>
                        <ul className="space-y-1">
                          {version.pros.map((pro, i) => (
                            <li key={i} className="text-emerald-600">+ {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-700 mb-1">Inconvénients</h4>
                        <ul className="space-y-1">
                          {version.cons.map((con, i) => (
                            <li key={i} className="text-red-600">- {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bouton d'action */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-sm font-medium text-gray-700">Tester cette version</span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </motion.div>

                    {/* Numéro de version */}
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600"
                      whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Section recommandation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-br from-[#4C34CE]/10 to-[#FAA016]/10 rounded-3xl p-8 border border-[#4C34CE]/20 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-[#4C34CE] mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Recommandation</h3>
              </div>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Après avoir testé toutes les versions, la <strong>Version 3 (Split Header)</strong> semble offrir 
                le meilleur équilibre entre organisation, évolutivité et expérience utilisateur. 
                Cependant, testez-les toutes pour voir celle qui correspond le mieux à votre workflow !
              </p>
              <Link href="/sales-test-3">
                <GlassButton className="bg-gradient-to-r from-[#4C34CE] to-[#FAA016] text-white">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Tester la version recommandée
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlassButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}