import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const runtime = "nodejs";

const bookingSchema = z.object({
  eventTypeId: z.string(),
  attendeeName: z.string().min(1),
  attendeeEmail: z.string().email(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  timezone: z.string().default("Europe/Paris"),
  notes: z.string().optional(),
});

// POST - Créer une réservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    // Vérifier que le type de RDV existe
    const eventType = await prisma.eventType.findUnique({
      where: { id: data.eventTypeId },
      include: { user: true },
    });

    if (!eventType || !eventType.active) {
      return NextResponse.json(
        { error: "Type de rendez-vous non disponible" },
        { status: 400 }
      );
    }

    // Vérifier les conflits de réservation
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        userId: eventType.userId,
        status: "confirmed",
        OR: [
          {
            startTime: { lte: new Date(data.startTime) },
            endTime: { gt: new Date(data.startTime) },
          },
          {
            startTime: { lt: new Date(data.endTime) },
            endTime: { gte: new Date(data.endTime) },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: "Ce créneau est déjà réservé" },
        { status: 400 }
      );
    }

    // Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        eventTypeId: data.eventTypeId,
        userId: eventType.userId,
        attendeeName: data.attendeeName,
        attendeeEmail: data.attendeeEmail,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        timezone: data.timezone,
        notes: data.notes,
        status: "confirmed",
      },
      include: {
        eventType: true,
        user: true,
      },
    });

    // TODO: Envoyer les emails de confirmation (Resend)

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Erreur lors de la création de la réservation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
