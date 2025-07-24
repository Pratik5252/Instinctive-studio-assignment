import { Incident, Camera, Prisma } from "@prisma/client";

export type IncidentWithCamera = Prisma.IncidentGetPayload<{
  include: { Camera: true };
}>;

export const getIncidents = async (): Promise<IncidentWithCamera[]> => {
  const response = await fetch(
    `http://localhost:3000/api/incidents?resolve=false`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }
  return response.json();
};

export const resolveIncident = async (incidentId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/incidents/${incidentId}/resolve`,
    { method: "PATCH" }
  );

  if (!response.ok) {
    throw new Error("Failed to resolve incident");
  }
  return response.json();
};
