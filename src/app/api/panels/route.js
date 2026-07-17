import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const motorKw   = searchParams.get("motorKw")   ? parseFloat(searchParams.get("motorKw"))   : undefined;
  const motorGear = searchParams.get("motorGear") || undefined;
  const stopCount = searchParams.get("stopCount") ? parseInt(searchParams.get("stopCount"))   : undefined;

  const panelType =
    motorGear === "GEARLESS" ? "SENKRON" :
    motorGear === "GEARED"   ? "ASENKRON" :
    undefined;

  const where = {
    active: true,
    ...(panelType  && { type:    panelType }),
    ...(motorKw    && { power:   { gte: motorKw   } }),
    ...(stopCount  && { maxStop: { gte: stopCount } }),
  };

  try {
    const panels = await prisma.commandBox.findMany({
      where,
      orderBy: { price: "asc" },
    });
    return NextResponse.json(panels);
  } catch (err) {
    console.error("Panels API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
