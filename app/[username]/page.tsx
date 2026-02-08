"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingCalendar } from "./booking-calendar";

interface EventType {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  color: string;
}

interface UserData {
  user: {
    id: string;
    name: string | null;
    username: string | null;
  };
  eventTypes: EventType[];
  availability: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }>;
  bookings: Array<{
    startTime: string;
    endTime: string;
  }>;
}

export default function BookingPage() {
  const params = useParams();
  const username = params.username as string;
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/users/${username}`);
      if (response.ok) {
        const userData = await response.json();
        setData(userData);
        if (userData.eventTypes.length > 0) {
          setSelectedEventType(userData.eventTypes[0]);
        }
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventType || !selectedDate || !selectedTime) {
      return;
    }

    setSubmitting(true);

    try {
      const startTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      startTime.setHours(hours, minutes, 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + selectedEventType.duration);

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTypeId: selectedEventType.id,
          attendeeName,
          attendeeEmail,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          notes: notes || undefined,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setSelectedDate(null);
        setSelectedTime(null);
        setAttendeeName("");
        setAttendeeEmail("");
        setNotes("");
        // Recharger les données pour mettre à jour les créneaux disponibles
        await fetchUserData();
      } else {
        const error = await response.json();
        alert(error.error || "Erreur lors de la réservation");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la réservation");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h${mins}min` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!data || data.eventTypes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Aucun type de rendez-vous disponible</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md text-center relative"
        >
          {/* Bouton fermer (croix) */}
          <button
            onClick={() => {
              setSuccess(false);
              setSelectedDate(null);
              setSelectedTime(null);
            }}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>

          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            <span className="gradient-text">Réservation confirmée !</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Vous recevrez un email de confirmation sous peu.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-amber-800">
              <strong>💡 Astuce :</strong> Vérifiez votre dossier <strong>spam</strong> si vous ne recevez pas l&apos;email dans les prochaines minutes.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Réservez</span> un rendez-vous
              <br />
              <span className="text-gray-900">avec {data.user.name || username}</span>
            </h1>
            <p className="text-gray-600 text-lg font-light">
              Sélectionnez un type de rendez-vous et un créneau disponible
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche : Types de RDV */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl shadow-xl border border-white/20 p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Type de rendez-vous</h2>
                <div className="space-y-3">
                  {data.eventTypes.map((eventType) => (
                    <button
                      key={eventType.id}
                      onClick={() => {
                        setSelectedEventType(eventType);
                        setSelectedDate(null);
                        setSelectedTime(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        selectedEventType?.id === eventType.id
                          ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {eventType.name}
                          </h3>
                          {eventType.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {eventType.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{formatDuration(eventType.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : Calendrier et formulaire */}
            <div className="lg:col-span-2">
              {selectedEventType && (
                <div className="space-y-6">
                  {/* Calendrier */}
                  <div className="glass-effect rounded-2xl shadow-xl border border-white/20 p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Sélectionnez une date et une heure
                    </h2>
                <BookingCalendar
                  availability={data.availability}
                  duration={selectedEventType.duration}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={setSelectedDate}
                  onTimeSelect={setSelectedTime}
                  bookings={data.bookings || []}
                />
                  </div>

                  {/* Formulaire */}
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-effect rounded-2xl shadow-xl border border-white/20 p-6"
                    >
                      <h2 className="text-xl font-semibold mb-4">
                        Vos informations
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom complet *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              value={attendeeName}
                              onChange={(e) => setAttendeeName(e.target.value)}
                              className="pl-10"
                              placeholder="Votre nom"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              type="email"
                              value={attendeeEmail}
                              onChange={(e) => setAttendeeEmail(e.target.value)}
                              className="pl-10"
                              placeholder="votre@email.com"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes (optionnel)
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Ajoutez des informations supplémentaires..."
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 font-semibold"
                          disabled={submitting}
                        >
                          {submitting ? "Réservation en cours..." : "Confirmer la réservation"}
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
