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

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number
): string[] {
  const slots: string[] = [];
  const { hours: startHour, minutes: startMin } = parseTime(startTime);
  const { hours: endHour, minutes: endMin } = parseTime(endTime);

  let currentHour = startHour;
  let currentMin = startMin;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMin < endMin)
  ) {
    const timeStr = `${String(currentHour).padStart(2, "0")}:${String(
      currentMin
    ).padStart(2, "0")}`;
    slots.push(timeStr);

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
