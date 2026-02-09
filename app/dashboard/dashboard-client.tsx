"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Plus,
  Settings,
  LogOut,
  User,
  Clock,
  Trash2,
  Edit,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { EventTypeDialog } from "./event-type-dialog";
import { AvailabilityManager } from "./availability-manager";
import { UsernameSettings } from "./username-settings";

interface DashboardClientProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    username?: string | null;
  };
}

interface EventType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  duration: number;
  color: string;
  active: boolean;
  createdAt: string;
}

export function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingEventType, setEditingEventType] = useState<EventType | null>(
    null
  );
  const [showAvailability, setShowAvailability] = useState(false);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const fetchEventTypes = async () => {
    try {
      const response = await fetch("/api/event-types");
      if (response.ok) {
        const data = await response.json();
        setEventTypes(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce type de RDV ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/event-types/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEventTypes(eventTypes.filter((et) => et.id !== id));
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression");
    }
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h${mins}min` : `${hours}h`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background */}
      <div className="fixed inset-0 bg-mesh-gradient opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Crenoz
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name || user.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Bienvenue,
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {user.name || "Utilisateur"}
              </span>
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Gérez vos rendez-vous et vos disponibilités en toute simplicité
            </p>
          </div>

          {/* Settings Username */}
          <div className="mb-10">
            <UsernameSettings user={user} />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-10 bg-gray-50 rounded-xl p-1.5 border border-gray-200">
            <button
              onClick={() => setShowAvailability(false)}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                !showAvailability
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Types de RDV
            </button>
            <button
              onClick={() => setShowAvailability(true)}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                showAvailability
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Disponibilités
            </button>
          </div>

          {!showAvailability ? (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                    Types de rendez-vous
                  </h2>
                  <p className="text-gray-600 text-lg font-light">
                    Créez et gérez vos différents types de rendez-vous
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-500 hover:from-yellow-500 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300"
                  onClick={() => {
                    setEditingEventType(null);
                    setShowDialog(true);
                  }}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Nouveau type de RDV
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-500">Chargement...</p>
                </div>
              ) : eventTypes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-gradient-to-br from-yellow-50/50 to-blue-50/50 rounded-3xl border-2 border-dashed border-yellow-200"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/25">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Aucun type de rendez-vous
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Créez votre premier type de rendez-vous pour commencer à recevoir des réservations
                  </p>
                  <Button
                    className="bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-500 hover:from-yellow-500 hover:via-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300"
                    onClick={() => {
                      setEditingEventType(null);
                      setShowDialog(true);
                    }}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Créer votre premier type de RDV
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventTypes.map((eventType, index) => (
                    <motion.div
                      key={eventType.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 via-blue-50/0 to-cyan-50/0 group-hover:from-yellow-50/50 group-hover:via-blue-50/50 group-hover:to-cyan-50/50 transition-all duration-300" />
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-yellow-500/25">
                            <Calendar className="h-7 w-7 text-white" />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingEventType(eventType);
                                setShowDialog(true);
                              }}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(eventType.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                          {eventType.name}
                        </h3>
                        {eventType.description && (
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                            {eventType.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{formatDuration(eventType.duration)}</span>
                        </div>
                        {!eventType.active && (
                          <div className="inline-block">
                            <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                              Inactif
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <AvailabilityManager userId={user.id} />
          )}
        </motion.div>
      </div>

      <EventTypeDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        eventType={editingEventType}
        onSuccess={() => {
          setShowDialog(false);
          fetchEventTypes();
        }}
      />
    </div>
  );
}
