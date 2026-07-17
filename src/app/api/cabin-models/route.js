export const dynamic = "force-dynamic"
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const material = searchParams.get("material") || undefined;

  try {
    const models = await prisma.cabinModel.findMany({
      where: {
        active: true,
        ...(material && { material }),
      },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(models);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
