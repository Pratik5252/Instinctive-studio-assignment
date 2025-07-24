"use client";

import { IncidentWithCamera, resolveIncident } from "@/lib/api";
import { IncidentType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Icon } from "@iconify/react";
import React from "react";
import {
  LucideIcon,
  UserSearch,
  UsersRound,
  Siren,
  DoorOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
type Props = {
  incident: IncidentWithCamera;
};

const IncidentList = ({ incident }: Props) => {
  const queryClient = useQueryClient();

  function getTimeDate(date: Date, start: Date, end: Date) {
    date = new Date(date);
    start = new Date(start);
    end = new Date(end);

    const incidentTime = `${start.getHours()}:${start.getMinutes()}-${end.getHours()}:${end.getMinutes()} on ${date.getDate()}-${date.toLocaleString(
      "en-US",
      { month: "short" }
    )}-${date.getFullYear()}`;
    return incidentTime;
  }

  const mutation = useMutation({
    mutationFn: () => resolveIncident(incident.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });

  const incidentIcons: Record<
    string,
    { icon: LucideIcon; color: string; name: string }
  > = {
    FACE_RECOGNISED: {
      icon: UsersRound,
      color: "text-utility-blue-500",
      name: "Face Recognised",
    },
    GUN_THREAT: {
      icon: Siren,
      color: "text-utility-rose-500",
      name: "Gun Threat",
    },
    TRAFFIC_CONGESTION: {
      icon: UserSearch,
      color: "text-utility-teal-500",
      name: "Traffic Congestion",
    },
    UNAUTHORISED_ACCESS: {
      icon: DoorOpen,
      color: "text-utility-orange-500",
      name: "Unathorised Access",
    },
  };

  const config = incidentIcons[incident.type];
  const IncidentIcon = config.icon;
  const incidentColor = config.color;
  const incidentName = config.name;

  return (
    <div className="w-full h-full flex gap-4 justify-between items-center p-1 pr-3">
      <div className="w-fit h-[68px] rounded-md overflow-hidden border border-white/25">
        <Image
          src={incident.thumbnailUrl}
          alt={incident.type}
          width={120}
          height={80}
          className="aspect-auto"
        />
      </div>
      <div className="h-full flex flex-col grow justify-between">
        <div className="flex items-center gap-1">
          <div>
            <IncidentIcon className={incidentColor} size={12} />
          </div>
          <p className="text-xs font-bold">{incidentName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-start items-center gap-1">
            <Icon icon={"bxs:cctv"} className="w-3 h-3" />
            <p className="text-[10px]">
              {incident.Camera.location} {incident.Camera.name}
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <Clock size={10} />
            <p className="font-bold text-[10px]">
              {getTimeDate(incident.date, incident.tsStart, incident.tsEnd)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => mutation.mutate()}
          className="flex justify-center items-center gap-1 font-alt font-bold text-[10px] text-accent cursor-pointer"
        >
          Resolve <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default IncidentList;
