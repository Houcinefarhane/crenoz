import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import { DashboardClient } from "./dashboard-client";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const sessionUser = await requireAuth();

  // Récupérer les données complètes de l'utilisateur
  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return <DashboardClient user={user} />;
}
