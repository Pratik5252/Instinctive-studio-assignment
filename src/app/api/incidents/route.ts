import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/config/prismaClient';

export async function GET(request: NextRequest) {
    const nextUrl = request.nextUrl;
    console.log(nextUrl);

    const resolvedParams = nextUrl.searchParams.get('resolve');

    const resolved =
        resolvedParams === 'true'
            ? true
            : resolvedParams === 'false'
            ? false
            : undefined;

    const incidents = await prisma.incident.findMany({
        where: { resolved },
        orderBy: { tsStart: 'desc' },
    });

    return new NextResponse(JSON.stringify(incidents), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
