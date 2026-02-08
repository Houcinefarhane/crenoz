"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay, addWeeks, subWeeks } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTimeSlots } from "@/lib/date-utils";

interface Break {
  startTime: string;
  endTime: string;
}

interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  breaks?: Break[];
}

interface Booking {
  startTime: string; // ISO string
  endTime: string; // ISO string
}

interface BookingCalendarProps {
  availability: Availability[];
  duration: number;
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string | null) => void;
  bookings?: Booking[];
}

export function BookingCalendar({
  availability,
  duration,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  bookings = [],
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

    // Générer tous les créneaux disponibles
    const allSlots = generateTimeSlots(
      dayAvailability.startTime,
      dayAvailability.endTime,
      duration,
      dayAvailability.breaks || []
    );

    // Filtrer les créneaux déjà réservés
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);

    const availableSlots = allSlots.filter((slot) => {
      // Créer la date/heure du créneau
      const [hours, minutes] = slot.split(":").map(Number);
      const slotStart = new Date(day);
      slotStart.setHours(hours, minutes, 0, 0);
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + duration);

      // Vérifier si ce créneau chevauche une réservation existante
      const isReserved = bookings.some((booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);

        // Vérifier si le créneau chevauche la réservation
        return (
          (slotStart >= bookingStart && slotStart < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
          (slotStart <= bookingStart && slotEnd >= bookingEnd)
        );
      });

      return !isReserved;
    });

    return availableSlots;
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
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="border-2 hover:border-emerald-300 hover:bg-emerald-50/50 flex-shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 text-center px-2">
          <span className="hidden sm:inline">
            {format(weekStart, "d MMMM")} -{" "}
            {format(addDays(weekStart, 6), "d MMMM yyyy")}
          </span>
          <span className="sm:hidden">
            {format(weekStart, "d MMM")} - {format(addDays(weekStart, 6), "d MMM")}
          </span>
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="border-2 hover:border-emerald-300 hover:bg-emerald-50/50 flex-shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Grille calendrier - Scroll horizontal sur mobile */}
      <div className="mb-4 sm:mb-6">
        {/* Desktop: Grid normal */}
        <div className="hidden sm:grid sm:grid-cols-7 gap-2">
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
                  p-3 rounded-xl border-2 transition-all text-center font-medium
                  ${
                    isSelected
                      ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg"
                      : slots.length > 0 && !isPast
                      ? "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md"
                      : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                  }
                `}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {format(day, "EEE")}
                </div>
                <div
                  className={`text-lg font-semibold ${
                    isToday ? "text-emerald-600" : "text-gray-900"
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

        {/* Mobile: Grille compacte pour voir toute la semaine */}
        <div className="sm:hidden grid grid-cols-7 gap-1.5">
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
                  p-2 rounded-lg border-2 transition-all text-center font-medium
                  ${
                    isSelected
                      ? "border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg"
                      : slots.length > 0 && !isPast
                      ? "border-gray-200 active:border-emerald-300 active:bg-emerald-50/50"
                      : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                  }
                `}
              >
                <div className="text-[9px] uppercase text-gray-500 mb-0.5 font-medium leading-tight">
                  {format(day, "EEE")}
                </div>
                <div
                  className={`text-base font-bold leading-tight ${
                    isToday ? "text-emerald-600" : "text-gray-900"
                  }`}
                >
                  {format(day, "d")}
                </div>
                {slots.length > 0 && !isPast && (
                  <div className="text-[8px] text-emerald-600 mt-0.5 font-semibold">
                    {slots.length}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Créneaux horaires */}
      {selectedDate && (
        <div>
          <h4 className="font-semibold mb-3 text-sm sm:text-base">
            <span className="hidden sm:inline">
              Créneaux disponibles le {format(selectedDate, "d MMMM yyyy")}
            </span>
            <span className="sm:hidden">
              {format(selectedDate, "EEE d MMM")}
            </span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {getTimeSlotsForDay(selectedDate).map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`
                  px-3 py-2.5 sm:px-4 sm:py-2 rounded-xl border-2 transition-all text-xs sm:text-sm font-semibold
                  ${
                    selectedTime === time
                      ? "border-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "border-gray-200 active:border-emerald-300 active:bg-emerald-50/50 sm:hover:border-emerald-300 sm:hover:bg-emerald-50/50 sm:hover:shadow-md"
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
