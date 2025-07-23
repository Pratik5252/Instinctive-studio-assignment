import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../prisma/config/prismaClient';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const incidentId = await params;

    const incident = await prisma.incident.update({
        where: { id: incidentId.id },
        data: {
            resolved: true,
        },
    });

    return new NextResponse(JSON.stringify(incident), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
