"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Save } from "lucide-react";

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  enabled: boolean;
}

interface AvailabilityManagerProps {
  userId: string;
}

const DAYS = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export function AvailabilityManager({
  userId,
}: AvailabilityManagerProps) {
  const [availabilities, setAvailabilities] = useState<
    Record<number, Availability>
  >({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch("/api/availability");
      if (response.ok) {
        const data: Availability[] = await response.json();
        const mapped: Record<number, Availability> = {};
        data.forEach((av) => {
          mapped[av.dayOfWeek] = av;
        });
        setAvailabilities(mapped);
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAvailability = (dayOfWeek: number, field: string, value: any) => {
    setAvailabilities((prev) => ({
      ...prev,
      [dayOfWeek]: {
        ...(prev[dayOfWeek] || {
          id: "",
          dayOfWeek,
          startTime: "09:00",
          endTime: "17:00",
          enabled: true,
        }),
        [field]: value,
      },
    }));
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const promises = Object.values(availabilities).map((av) =>
        fetch("/api/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(av),
        })
      );

      await Promise.all(promises);
      alert("Disponibilités sauvegardées avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Disponibilités</h2>
          <p className="text-gray-600 mt-2">
            Définissez vos heures de disponibilité pour chaque jour de la semaine
          </p>
        </div>
        <Button
          onClick={saveAll}
          disabled={saving}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Sauvegarde..." : "Enregistrer"}
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 divide-y">
        {DAYS.map((day, index) => {
          const av = availabilities[index] || {
            dayOfWeek: index,
            startTime: "09:00",
            endTime: "17:00",
            enabled: false,
          };

          return (
            <div
              key={index}
              className="p-6 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-32">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={av.enabled}
                      onChange={(e) =>
                        updateAvailability(index, "enabled", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-medium">{day}</span>
                  </label>
                </div>

                {av.enabled && (
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <Input
                        type="time"
                        value={av.startTime}
                        onChange={(e) =>
                          updateAvailability(index, "startTime", e.target.value)
                        }
                        className="w-32"
                      />
                      <span className="text-gray-500">à</span>
                      <Input
                        type="time"
                        value={av.endTime}
                        onChange={(e) =>
                          updateAvailability(index, "endTime", e.target.value)
                        }
                        className="w-32"
                      />
                    </div>
                  </div>
                )}

                {!av.enabled && (
                  <span className="text-gray-400 text-sm">Non disponible</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
