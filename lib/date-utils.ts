import { addDays, startOfWeek, format, parse, isSameDay } from "date-fns";

export function getWeekDays(startDate: Date): Date[] {
  const weekStart = startOfWeek(startDate, { weekStartsOn: 1 }); // Lundi
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatTime(date: Date): string {
  return format(date, "HH:mm");
}

export function formatDateTime(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export function parseTime(time: string): { hours: number; minutes: number } {
  const [hours, minutes] = time.split(":").map(Number);
  return { hours, minutes };
}

interface Break {
  startTime: string;
  endTime: string;
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  breaks: Break[] = []
): string[] {
  const slots: string[] = [];
  const { hours: startHour, minutes: startMin } = parseTime(startTime);
  const { hours: endHour, minutes: endMin } = parseTime(endTime);

  // Convertir les pauses en minutes pour faciliter la vérification
  const breakRanges = breaks.map((b) => ({
    start: parseTime(b.startTime).hours * 60 + parseTime(b.startTime).minutes,
    end: parseTime(b.endTime).hours * 60 + parseTime(b.endTime).minutes,
  }));

  let currentHour = startHour;
  let currentMin = startMin;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMin < endMin)
  ) {
    const currentMinutes = currentHour * 60 + currentMin;
    
    // Vérifier si le créneau est dans une pause
    const isInBreak = breakRanges.some(
      (b) => currentMinutes >= b.start && currentMinutes < b.end
    );

    if (!isInBreak) {
      const timeStr = `${String(currentHour).padStart(2, "0")}:${String(
        currentMin
      ).padStart(2, "0")}`;
      slots.push(timeStr);
    }

    currentMin += duration;
    if (currentMin >= 60) {
      currentHour += Math.floor(currentMin / 60);
      currentMin = currentMin % 60;
    }
  }

  return slots;
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}
