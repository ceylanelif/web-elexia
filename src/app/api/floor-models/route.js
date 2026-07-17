export const dynamic = "force-dynamic"
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const floorType = searchParams.get("floorType") || undefined;

  try {
    const models = await prisma.floorModel.findMany({
      where: {
        active: true,
        ...(floorType && { floorType }),
      },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(models);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
