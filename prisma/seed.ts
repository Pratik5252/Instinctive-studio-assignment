import { prisma, IncidentType } from './config/prismaClient';

/*  Generates and return random startTime(tsStart) */
const randomDateInPastDays = (days: number) => {
    const now = new Date();
    const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return new Date(
        past.getTime() + Math.random() * (now.getTime() - past.getTime())
    );
};

/* seed main function */
async function main() {
    /* dummy camera data*/
    const cameraData = [
        { name: 'Camera 01', location: 'Shop Floor 1' },
        { name: 'Camera 02', location: 'Valut' },
        { name: 'Camera 03', location: 'Entrance' },
    ];
    await prisma.camera.createMany({ data: cameraData });

    const cameras = await prisma.camera.findMany();

    const images = [
        './public/thumbnails/Thumbnail-01.jpg',
        './public/thumbnails/Thumbnail-02.jpg',
        './public/thumbnails/Thumbnail-03.jpg',
        './public/thumbnails/Thumbnail-04.jpg',
        './public/thumbnails/Thumbnail-05.jpg',
    ];

    const incidentTypes = [
        IncidentType.UNAUTHORISED_ACCESS,
        IncidentType.GUN_THREAT,
        IncidentType.FACE_RECOGNISED,
        IncidentType.TRAFFIC_CONGESTION,
    ];

    /* Randomly generate data to seed*/
    const incidents = Array.from({ length: 20 }).map((_, i) => {
        const camera = cameras[Math.floor(Math.random() * cameras.length)];
        const type =
            incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
        const thumbnailUrl = images[Math.floor(Math.random() * images.length)];
        const tsStart = randomDateInPastDays(1);
        const tsEnd = new Date(
            tsStart.getTime() + (5 + Math.floor(Math.random() * 20)) * 60 * 1000
        );
        const date = new Date(
            tsStart.getFullYear(),
            tsStart.getMonth(),
            tsStart.getDate()
        );

        return {
            cameraId: camera.id,
            type,
            date,
            tsStart,
            tsEnd,
            thumbnailUrl,
            resolved: i % 5 === 0,
        };
    });

    await prisma.incident.createMany({ data: incidents });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
