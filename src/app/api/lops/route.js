import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_BRANDS = ["arkel", "mikel", "mikrolift", "hedefsan", "invt", "konel", "wiserol"];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const panoBrand = searchParams.get("panoBrand");
  const type      = searchParams.get("type"); // "LOP" | "OVERDOOR INDICATOR"

  const where = { active: true };

  if (type) where.type = type;

  if (panoBrand) {
    const field = panoBrand.toLowerCase().replace(/[-\s]/g, "");
    if (VALID_BRANDS.includes(field)) {
      where[field] = true;
    }
  }

  try {
    const models = await prisma.lopModel.findMany({
      where,
      orderBy: { id: "asc" },
    });
    return NextResponse.json(models);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
