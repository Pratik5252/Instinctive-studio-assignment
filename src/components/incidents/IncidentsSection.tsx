"use client";

import { getCameras, getIncidents, IncidentWithCamera } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import IncidentList from "./IncidentList";
import IncidentPlayer from "./IncidentPlayer";
import {
  TriangleAlert,
  DoorOpen,
  Plus,
  UserSearch,
  CheckCheck,
} from "lucide-react";
import { Camera } from "@prisma/client";
import TimeLine from "../timeline/TimeLineSection";

const Incidents = () => {
  const { data }: { data: IncidentWithCamera[] | undefined } = useQuery({
    queryKey: ["incidents"],
    queryFn: () => getIncidents(),
  });

  const { data: camera } = useQuery<Camera[] | undefined>({
    queryKey: ["cameras"],
    queryFn: () => getCameras(),
  });

  return (
    <div className="flex flex-col w-full h-full p-6 gap-6">
      <div className="flex w-full h-[55vh] gap-6">
        <div className="flex w-[55vw]">
          <IncidentPlayer camera={camera} />
        </div>

        <div className="bg-card flex flex-col grow rounded-md overflow-hidden">
          <div className="flex justify-between items-center w-full p-4 gap-2">
            <div className="bg-[#7F1D1D] rounded-full w-6 h-6 flex items-center justify-center border-2 border-utility-error-50 ">
              <TriangleAlert className="text-utility-rose-500" size={12} />
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="font-alt font-semibold text-lg text-[#fafafa]">
                {data?.length} Unresolved Incidents
              </p>
              <div className="flex gap-1 justify-end items-center">
                <div className="flex -space-x-1">
                  <div className="incident-tag bg-utility-orange-50">
                    <DoorOpen size={12} className="text-utility-orange-500" />
                  </div>
                  <div className="incident-tag bg-utility-error-50">
                    <Plus size={12} className="text-utility-error-500" />
                  </div>
                  <div className="incident-tag bg-utility-blue-50">
                    <UserSearch size={12} className="text-utility-blue-500" />
                  </div>
                </div>
                <div className="bg-black flex justify-center items-center gap-1 border border-border rounded-full w-fit px-2 py-0.5">
                  <CheckCheck size={12} className="text-success" />
                  <p className="text-xs text-[#D4D4D4]">4 resolved incidents</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4 pt-0 gap-4 scroller">
            {data?.map((incident) => (
              <div
                key={incident.id}
                className="transition-all translate duration-200 "
              >
                <IncidentList incident={incident} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-full rounded-md">
        <TimeLine camera={camera} incident={data} />
      </div>
    </div>
  );
};

export default Incidents;
