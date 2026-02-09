"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, CheckCircle2, Play, Sparkles, Zap, Clock, Users, TrendingUp, Star } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated background mesh with yellow and blue */}
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-50/30 via-blue-50/30 to-cyan-50/30 pointer-events-none" />
      <div className="fixed inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                Crenoz
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:flex font-medium text-gray-700 hover:text-blue-600">
                  Connexion
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-500 hover:from-yellow-500 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300">
                  Commencer
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Varied color background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/20 via-blue-400/20 to-yellow-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              rotate: [360, 180, 0],
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-yellow-400/15 via-blue-400/15 to-cyan-400/15 rounded-full blur-3xl"
          />
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto max-w-7xl relative z-10"
        >
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-50 to-blue-50 border border-yellow-200/60 mb-8 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-blue-500 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-yellow-700 to-blue-700 bg-clip-text text-transparent">
                Solution professionnelle de prise de rendez-vous
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight"
            >
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Simplifiez vos
              </span>
              <span className="block mt-2 bg-gradient-to-r from-yellow-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]">
                rendez-vous
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              La plateforme moderne qui transforme la gestion de vos rendez-vous.
              <br className="hidden sm:block" />
              <span className="text-gray-500">Gagnez du temps, offrez une expérience exceptionnelle.</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-500 hover:from-yellow-500 hover:via-blue-600 hover:to-cyan-600 text-white px-10 py-7 text-lg font-semibold shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Démarrer gratuitement
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-7 text-lg font-semibold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-24 relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-blue-50/50 to-cyan-50/50" />
                <div className="relative p-8 sm:p-12">
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-xl border-2 transition-all ${
                          i === 2
                            ? "border-blue-500 bg-gradient-to-br from-yellow-50 to-blue-50 shadow-lg scale-105"
                            : i < 3
                            ? "border-gray-200 hover:border-blue-300 bg-white"
                            : "border-gray-100 bg-gray-50 opacity-50"
                        }`}
                      >
                        <div className="h-full flex flex-col items-center justify-center p-2">
                          <div className="text-xs text-gray-400 mb-1">Lun</div>
                          <div className={`text-lg font-bold ${i === 2 ? "text-blue-600" : "text-gray-900"}`}>
                            {i + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Prochain rendez-vous</div>
                      <div className="text-xl font-bold text-gray-900">Consultation - 14:00</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works Section with Widgets */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/50 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-50 to-blue-50 border border-yellow-200/60 mb-6">
              <span className="text-sm font-semibold bg-gradient-to-r from-yellow-700 to-blue-700 bg-clip-text text-transparent">
                Comment ça marche
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Simple et
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                rapide
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              En trois étapes simples, votre calendrier est prêt
            </p>
          </motion.div>

          {/* Steps with animated widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "1",
                title: "Créez votre compte",
                description: "Inscrivez-vous en quelques secondes et configurez votre profil",
                color: "from-yellow-400 to-yellow-500",
                bgColor: "from-yellow-50 to-yellow-100",
                icon: Users,
              },
              {
                step: "2",
                title: "Définissez vos disponibilités",
                description: "Configurez vos horaires et types de rendez-vous",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
                icon: Clock,
              },
              {
                step: "3",
                title: "Partagez votre lien",
                description: "Vos clients réservent directement en ligne",
                color: "from-cyan-500 to-cyan-600",
                bgColor: "from-cyan-50 to-cyan-100",
                icon: Zap,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="group relative"
              >
                <div className="relative h-full bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  <div className="relative z-10">
                    {/* Animated icon widget */}
                    <motion.div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-xl`}
                      whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    
                    {/* Step number badge */}
                    <motion.div
                      className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold mb-4`}
                      whileHover={{ scale: 1.1 }}
                    >
                      Étape {item.step}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">{item.description}</p>
                  </div>
                  
                  {/* Animated decorative elements */}
                  <motion.div
                    className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Stats Widgets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: TrendingUp,
                value: "5 min",
                label: "Configuration",
                color: "from-yellow-400 to-yellow-500",
                bgColor: "from-yellow-50 to-yellow-100",
              },
              {
                icon: Zap,
                value: "100%",
                label: "Automatisé",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
              },
              {
                icon: Star,
                value: "24/7",
                label: "Disponible",
                color: "from-cyan-500 to-cyan-600",
                bgColor: "from-cyan-50 to-cyan-100",
              },
            ].map((widget, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${widget.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative z-10 flex items-center gap-4">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${widget.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <widget.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{widget.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{widget.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Prêt à transformer
              <br />
              votre gestion de rendez-vous ?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Rejoignez Crenoz aujourd&apos;hui et découvrez comment simplifier votre quotidien professionnel.
            </p>
            <Link href="/login">
              <Button
                size="lg"
                className="group bg-white text-blue-600 hover:bg-gray-50 px-10 py-7 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Créer mon compte gratuit
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Crenoz
              </span>
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
