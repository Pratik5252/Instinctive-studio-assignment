import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/config/prismaClient";

export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const resolvedParams = nextUrl.searchParams.get("resolve");

  const resolved =
    resolvedParams === "true"
      ? true
      : resolvedParams === "false"
      ? false
      : undefined;

  try {
    const incidents = await prisma.incident.findMany({
      where: { resolved },
      orderBy: { tsStart: "desc" },
      include: { Camera: true },
    });
    return NextResponse.json(incidents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}
