import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const runtime = "nodejs";

const eventTypeSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  duration: z.number().min(15).max(480), // 15 minutes à 8 heures
  color: z.string().default("blue"),
});

// GET - Récupérer tous les types de RDV de l'utilisateur
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const eventTypes = await prisma.eventType.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(eventTypes);
  } catch (error) {
    console.error("Erreur lors de la récupération des types de RDV:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// POST - Créer un nouveau type de RDV
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, duration, color } = eventTypeSchema.parse(body);

    // Générer un slug unique
    const baseSlug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let slug = baseSlug;
    let counter = 1;
    while (
      await prisma.eventType.findUnique({
        where: { userId_slug: { userId: session.user.id, slug } },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const eventType = await prisma.eventType.create({
      data: {
        userId: session.user.id,
        name,
        slug,
        description,
        duration,
        color: color || "blue",
      },
    });

    return NextResponse.json(eventType, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Erreur lors de la création du type de RDV:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
