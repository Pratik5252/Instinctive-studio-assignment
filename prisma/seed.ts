import { prisma, IncidentType } from './config/prismaClient';

/*  Generates and return random startTime(tsStart) */
const randomTimeToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const randomMs = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
    return new Date(today.getTime() + randomMs);
};

const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

/* seed main function */
async function main() {
    /*Delete data before seeding */
    await prisma.incident.deleteMany({});
    await prisma.camera.deleteMany({});
    /* dummy camera data*/
    const cameraData = [
        { name: 'Camera 01', location: 'Shop Floor 1' },
        { name: 'Camera 02', location: 'Valut' },
        { name: 'Camera 03', location: 'Entrance' },
    ];
    await prisma.camera.createMany({ data: cameraData });

    const cameras = await prisma.camera.findMany();

    const images = [
        '/thumbnails/Thumbnail-01.jpg',
        '/thumbnails/Thumbnail-02.jpg',
        '/thumbnails/Thumbnail-03.jpg',
        '/thumbnails/Thumbnail-04.jpg',
        '/thumbnails/Thumbnail-05.jpg',
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
        const tsStart = randomTimeToday();
        const tsEnd = new Date(
            tsStart.getTime() + (5 + Math.floor(Math.random() * 20)) * 60 * 1000
        );

        return {
            cameraId: camera.id,
            type,
            date: todayDate,
            tsStart,
            tsEnd,
            thumbnailUrl,
            resolved: i % 3 === 0,
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
