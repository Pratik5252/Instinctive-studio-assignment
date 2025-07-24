import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/config/prismaClient";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const incidentId = await params;

  if (!incidentId) {
    return NextResponse.json({ error: "Invalid incident ID" }, { status: 400 });
  }

  try {
    const incident = await prisma.incident.update({
      where: { id: incidentId.id },
      data: {
        resolved: true,
      },
    });
    return NextResponse.json(
      `Incident Resolved of ${
        incident.type
      } for ${incident.date.toLocaleDateString()}`,
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update incident` },
      { status: 500 }
    );
  }
}
