import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

// GET - Récupérer les types de RDV publics d'un utilisateur par son username
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: params.username },
      include: {
        eventTypes: {
          where: { active: true },
          orderBy: { createdAt: "desc" },
        },
        availability: {
          where: { enabled: true },
          orderBy: { dayOfWeek: "asc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Parser les breaks JSON
    const availabilityWithBreaks = user.availability.map((av) => ({
      ...av,
      breaks: av.breaks ? JSON.parse(av.breaks) : [],
    }));

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      eventTypes: user.eventTypes,
      availability: availabilityWithBreaks,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
