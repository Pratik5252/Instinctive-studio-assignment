import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/config/prismaClient";

export async function GET(request: NextRequest) {
  try {
    const cameras = await prisma.camera.findMany({});
    return NextResponse.json(cameras, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Camera" },
      { status: 500 }
    );
  }
}
