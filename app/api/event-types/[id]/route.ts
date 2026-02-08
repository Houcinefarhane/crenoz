import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export const runtime = "nodejs";

const updateEventTypeSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  duration: z.number().min(15).max(480).optional(),
  color: z.string().optional(),
  active: z.boolean().optional(),
});

// PUT - Mettre à jour un type de RDV
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const data = updateEventTypeSchema.parse(body);

    // Vérifier que le type de RDV appartient à l'utilisateur
    const eventType = await prisma.eventType.findUnique({
      where: { id: params.id },
    });

    if (!eventType || eventType.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Type de RDV non trouvé" },
        { status: 404 }
      );
    }

    const updated = await prisma.eventType.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un type de RDV
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Vérifier que le type de RDV appartient à l'utilisateur
    const eventType = await prisma.eventType.findUnique({
      where: { id: params.id },
    });

    if (!eventType || eventType.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Type de RDV non trouvé" },
        { status: 404 }
      );
    }

    await prisma.eventType.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
