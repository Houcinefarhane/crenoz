import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// GET - Récupérer les réservations de l'utilisateur connecté
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
        status: "confirmed",
        startTime: {
          gte: new Date(), // Seulement les réservations futures
        },
      },
      include: {
        eventType: {
          select: {
            id: true,
            name: true,
            duration: true,
            color: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
      take: 10, // Limiter à 10 prochains rendez-vous
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
