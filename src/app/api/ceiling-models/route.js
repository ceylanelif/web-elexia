import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const models = await prisma.ceilingModel.findMany({
      where: { active: true },
      orderBy: { id: "asc" },
    });
    return NextResponse.json(models);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
