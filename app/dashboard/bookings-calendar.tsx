"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  attendeeName: string;
  attendeeEmail: string;
  startTime: string;
  endTime: string;
  notes: string | null;
  eventType: {
    id: string;
    name: string;
    duration: number;
    color: string;
  };
}

interface BookingsCalendarProps {
  bookings: Booking[];
  loading: boolean;
}

export function BookingsCalendar({ bookings, loading }: BookingsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getBookingsForDay = (date: Date): Booking[] => {
    return bookings.filter((booking) => {
      const bookingDate = parseISO(booking.startTime);
      return isSameDay(bookingDate, date);
    });
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const dayBookings = selectedDate ? getBookingsForDay(selectedDate) : [];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500">Chargement du calendrier...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
            {format(currentDate, "MMMM yyyy", { locale: fr })}
          </h2>
          <p className="text-gray-600 font-light capitalize">
            {format(currentDate, "EEEE", { locale: fr })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={previousMonth}
            className="h-9 w-9 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
            className="px-4 h-9 text-sm"
          >
            Aujourd&apos;hui
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="h-9 w-9 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-yellow-50 to-blue-50 border-b border-gray-200">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dayBookings = getBookingsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <motion.button
                key={day.toString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => setSelectedDate(day)}
                className={`
                  min-h-[80px] sm:min-h-[100px] p-2 border-r border-b border-gray-100
                  transition-all duration-200 relative group
                  ${!isCurrentMonth ? "bg-gray-50/50" : "bg-white hover:bg-blue-50/50"}
                  ${isToday ? "bg-gradient-to-br from-yellow-50 to-blue-50" : ""}
                  ${isSelected ? "ring-2 ring-blue-500 ring-inset bg-blue-50" : ""}
                `}
              >
                <div className="flex flex-col h-full">
                  <span
                    className={`
                      text-sm font-semibold mb-1
                      ${!isCurrentMonth ? "text-gray-400" : "text-gray-900"}
                      ${isToday ? "text-blue-600" : ""}
                    `}
                  >
                    {format(day, "d")}
                  </span>
                  <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                    {dayBookings.slice(0, 2).map((booking) => {
                      const startTime = parseISO(booking.startTime);
                      const timeStr = format(startTime, "HH:mm");
                      return (
                        <div
                          key={booking.id}
                          className="text-xs px-1.5 py-0.5 rounded bg-gradient-to-r from-yellow-400 via-blue-500 to-cyan-500 text-white font-medium truncate"
                          title={`${booking.eventType.name} - ${booking.attendeeName} - ${timeStr}`}
                        >
                          {timeStr} - {booking.attendeeName}
                        </div>
                      );
                    })}
                    {dayBookings.length > 2 && (
                      <div className="text-xs text-gray-500 font-medium px-1.5">
                        +{dayBookings.length - 2} autre{dayBookings.length - 2 > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Bookings Details */}
      {selectedDate && dayBookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDate(null)}
              className="h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>
          <div className="space-y-3">
            {dayBookings.map((booking) => {
              const startTime = parseISO(booking.startTime);
              const endTime = parseISO(booking.endTime);
              const formattedStartTime = format(startTime, "HH:mm");
              const formattedEndTime = format(endTime, "HH:mm");

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all bg-gradient-to-br from-white to-gray-50/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-yellow-500/25">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {booking.eventType.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formattedStartTime} - {formattedEndTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-13 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Client :</span>
                      <span className="font-medium text-gray-900">
                        {booking.attendeeName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{booking.attendeeEmail}</span>
                    </div>
                    {booking.notes && (
                      <div className="text-sm pt-2 border-t border-gray-100">
                        <span className="text-gray-500">Notes :</span>
                        <p className="mt-1 text-gray-700">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {selectedDate && dayBookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-yellow-50/50 to-blue-50/50 rounded-2xl border-2 border-dashed border-yellow-200 p-8 text-center"
        >
          <p className="text-gray-600">
            Aucun rendez-vous le {format(selectedDate, "d MMMM yyyy", { locale: fr })}
          </p>
        </motion.div>
      )}
    </div>
  );
}
