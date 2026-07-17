import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/**
 * GET /api/products
 *
 * Query params:
 *   productType  CAR_DOOR | LANDING_DOOR
 *   width        opening width in mm
 *   height       opening height in mm
 *   brand        optional filter
 *   material     optional filter
 *   fireResistance  "true" | "false"
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    const productType    = searchParams.get("productType")
    const width          = searchParams.get("width")      ? parseInt(searchParams.get("width"))  : undefined
    const height         = searchParams.get("height")     ? parseInt(searchParams.get("height")) : undefined
    const brand          = searchParams.get("brand")      || undefined
    const material       = searchParams.get("material")   || undefined
    const fireResistance = searchParams.get("fireResistance") !== null
      ? searchParams.get("fireResistance") === "true"
      : undefined

    const where = {
      active: true,
      ...(productType && { productType }),
      ...(brand       && { brand }),
      ...(material    && { material }),
      ...(fireResistance !== undefined && { fireResistance }),
      ...(width || height
        ? {
            doorDimension: {
              ...(width  && { openingWidth:  width  }),
              ...(height && { openingHeight: height }),
            },
          }
        : {}),
    }

    const products = await prisma.product.findMany({
      where,
      include: { doorDimension: true },
      orderBy: { price: "asc" },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("[GET /api/products]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
