import { PrismaClient, IncidentType } from "@prisma/client";

const prisma = new PrismaClient();
export { IncidentType, prisma };
