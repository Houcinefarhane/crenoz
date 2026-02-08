"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay, addWeeks, subWeeks } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTimeSlots } from "@/lib/date-utils";

interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface BookingCalendarProps {
  availability: Availability[];
  duration: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string | null) => void;
}

export function BookingCalendar({
  availability,
  duration,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: BookingCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAvailabilityForDay = (day: Date) => {
    const dayOfWeek = day.getDay();
    return availability.find((av) => av.dayOfWeek === dayOfWeek);
  };

  const getTimeSlotsForDay = (day: Date): string[] => {
    const dayAvailability = getAvailabilityForDay(day);
    if (!dayAvailability) return [];

    // Vérifier que la date n'est pas dans le passé
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (day < today) return [];

    return generateTimeSlots(
      dayAvailability.startTime,
      dayAvailability.endTime,
      duration
    );
  };

  const handleDateClick = (day: Date) => {
    const slots = getTimeSlotsForDay(day);
    if (slots.length > 0) {
      onDateSelect(day);
      onTimeSelect(null);
    }
  };

  return (
    <div>
      {/* Navigation semaine */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">
          {format(weekStart, "d MMMM")} -{" "}
          {format(addDays(weekStart, 6), "d MMMM yyyy")}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Grille calendrier */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day, index) => {
          const slots = getTimeSlotsForDay(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const isPast = day < new Date() && !isToday;

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={slots.length === 0 || isPast}
              className={`
                p-3 rounded-lg border-2 transition-all text-center
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : slots.length > 0 && !isPast
                    ? "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                }
              `}
            >
              <div className="text-xs text-gray-500 mb-1">
                {format(day, "EEE")}
              </div>
              <div
                className={`text-lg font-semibold ${
                  isToday ? "text-blue-600" : "text-gray-900"
                }`}
              >
                {format(day, "d")}
              </div>
              {slots.length > 0 && !isPast && (
                <div className="text-xs text-gray-500 mt-1">
                  {slots.length} créneau{slots.length > 1 ? "x" : ""}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Créneaux horaires */}
      {selectedDate && (
        <div>
          <h4 className="font-semibold mb-3">
            Créneaux disponibles le {format(selectedDate, "d MMMM yyyy")}
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {getTimeSlotsForDay(selectedDate).map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`
                  px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium
                  ${
                    selectedTime === time
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
