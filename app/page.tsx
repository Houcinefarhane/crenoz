"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Zap, Shield, Globe, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold gradient-text"
            >
              Crenoz
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:flex font-medium">
                  Connexion
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                  Commencer
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200/50 mb-8"
            >
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                La solution moderne de prise de rendez-vous
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Planifiez</span> vos rendez-vous
              <br />
              <span className="text-gray-900">en toute simplicité</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
            >
              La solution moderne pour gérer vos rendez-vous en ligne.
              <br />
              <span className="text-gray-500">Économisez du temps et offrez une expérience fluide à vos clients.</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-6 text-lg font-semibold shadow-xl shadow-emerald-500/30 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Commencer gratuitement
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 shimmer" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-gray-300 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
              >
                Voir une démo
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 relative"
          >
            <div className="relative glass-effect rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="aspect-video bg-gradient-to-br from-emerald-100 via-teal-100 to-green-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <Calendar className="h-32 w-32 text-emerald-600 opacity-30 relative z-10" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 right-4 w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-2xl shadow-xl hidden sm:block"
            >
              <Clock className="h-6 w-6" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-4 rounded-2xl shadow-xl hidden sm:block"
            >
              <Zap className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Tout ce dont</span> vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Des fonctionnalités puissantes pour simplifier votre gestion de rendez-vous
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className="glass-effect rounded-2xl p-6 border border-white/20 hover:border-purple-200/50 transition-all h-full">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-7 w-7 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto font-light">
              Rejoignez des milliers de professionnels qui font confiance à
              Crenoz pour gérer leurs rendez-vous.
            </p>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-50 px-8 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
              >
                Créer un compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-xl font-bold gradient-text mb-4 sm:mb-0">
              Crenoz
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 Crenoz. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Calendar,
    title: "Calendrier intelligent",
    description:
      "Gérez vos disponibilités en quelques clics et laissez vos clients réserver facilement.",
  },
  {
    icon: Zap,
    title: "Rapide et efficace",
    description:
      "Configuration en moins de 5 minutes. Aucune compétence technique requise.",
  },
  {
    icon: Shield,
    title: "Sécurisé",
    description:
      "Vos données sont protégées avec les meilleures pratiques de sécurité.",
  },
  {
    icon: Globe,
    title: "Accessible partout",
    description:
      "Fonctionne sur tous les appareils. Vos clients peuvent réserver depuis n&apos;importe où.",
  },
  {
    icon: Clock,
    title: "Synchronisation",
    description:
      "Synchronisez avec Google Calendar pour une gestion unifiée de votre emploi du temps.",
  },
  {
    icon: Calendar,
    title: "Notifications",
    description:
      "Recevez des confirmations par email pour chaque rendez-vous réservé.",
  },
];
