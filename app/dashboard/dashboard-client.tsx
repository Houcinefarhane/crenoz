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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20">
      {/* Header */}
      <div className="glass-effect border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold gradient-text">
              Crenoz
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user.name || user.email}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Settings Username */}
          <div className="mb-8">
            <UsernameSettings user={user} />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setShowAvailability(false)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                !showAvailability
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              Types de RDV
            </button>
            <button
              onClick={() => setShowAvailability(true)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                showAvailability
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              Disponibilités
            </button>
          </div>

          {!showAvailability ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Types de rendez-vous
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Créez et gérez vos différents types de rendez-vous
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                  onClick={() => {
                    setEditingEventType(null);
                    setShowDialog(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau type de RDV
                </Button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Chargement...</p>
                </div>
              ) : eventTypes.length === 0 ? (
                <div className="text-center py-12 glass-effect rounded-2xl border border-white/20">
                  <Calendar className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4 font-medium">
                    Aucun type de rendez-vous créé
                  </p>
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                    onClick={() => {
                      setEditingEventType(null);
                      setShowDialog(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre premier type de RDV
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventTypes.map((eventType) => (
                <motion.div
                  key={eventType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-effect rounded-2xl border border-white/20 p-6 hover:border-emerald-200/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="h-7 w-7 text-emerald-600" />
                    </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingEventType(eventType);
                              setShowDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(eventType.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {eventType.name}
                      </h3>
                      {eventType.description && (
                        <p className="text-gray-600 text-sm mb-3">
                          {eventType.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(eventType.duration)}</span>
                      </div>
                      {!eventType.active && (
                        <div className="mt-3">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Inactif
                          </span>
                        </div>
                      )}
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
