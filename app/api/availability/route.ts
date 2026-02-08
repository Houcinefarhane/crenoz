import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const runtime = "nodejs";

const breakSchema = z.object({
  startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
});

const availabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6), // 0 = dimanche, 6 = samedi
  startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  breaks: z.array(breakSchema).optional().default([]),
  enabled: z.boolean().default(true),
});

// GET - Récupérer les disponibilités de l'utilisateur
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const availabilities = await prisma.availability.findMany({
      where: { userId: session.user.id },
      orderBy: { dayOfWeek: "asc" },
    });

    // Parser les breaks JSON
    const availabilitiesWithBreaks = availabilities.map((av) => ({
      ...av,
      breaks: av.breaks ? JSON.parse(av.breaks) : [],
    }));

    return NextResponse.json(availabilitiesWithBreaks);
  } catch (error) {
    console.error("Erreur lors de la récupération des disponibilités:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer ou mettre à jour une disponibilité
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { dayOfWeek, startTime, endTime, breaks = [], enabled } =
      availabilitySchema.parse(body);

    // Vérifier que startTime < endTime
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (startMinutes >= endMinutes) {
      return NextResponse.json(
        { error: "L'heure de fin doit être après l'heure de début" },
        { status: 400 }
      );
    }

    // Upsert (créer ou mettre à jour)
    const availability = await prisma.availability.upsert({
      where: {
        userId_dayOfWeek: {
          userId: session.user.id,
          dayOfWeek,
        },
      },
      update: {
        startTime,
        endTime,
        breaks: breaks.length > 0 ? JSON.stringify(breaks) : null,
        enabled,
      },
      create: {
        userId: session.user.id,
        dayOfWeek,
        startTime,
        endTime,
        breaks: breaks.length > 0 ? JSON.stringify(breaks) : null,
        enabled,
      },
    });

    return NextResponse.json(availability, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Erreur lors de la sauvegarde:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
