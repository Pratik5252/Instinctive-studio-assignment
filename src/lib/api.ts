import { Incident, Camera, Prisma } from "@prisma/client";

const APP_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type IncidentWithCamera = Prisma.IncidentGetPayload<{
  include: { Camera: true };
}>;

export const getCameras = async (): Promise<Camera[]> => {
  const response = await fetch(`${APP_URL}/api/camera`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cameras");
  }
  return response.json();
};

export const getIncidents = async (): Promise<IncidentWithCamera[]> => {
  const response = await fetch(`${APP_URL}/api/incidents?resolve=false`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }
  return response.json();
};

export const resolveIncident = async (incidentId: string) => {
  const response = await fetch(
    `${APP_URL}/api/incidents/${incidentId}/resolve`,
    { method: "PATCH" }
  );

  if (!response.ok) {
    throw new Error("Failed to resolve incident");
  }
  return response.json();
};
