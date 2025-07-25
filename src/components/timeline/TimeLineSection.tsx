"use client";

import React from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import TimeRuler from "./TimelineRuler";
import { Camera } from "@prisma/client";
import { IncidentWithCamera } from "@/lib/api";
import {
  LucideIcon,
  UserSearch,
  UsersRound,
  Siren,
  DoorOpen,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const HOURS = 24;
const PX_PR_HOUR = 72 + 9;
const TIMELINE_WIDTH = HOURS * PX_PR_HOUR;
const VIEWPORT_WIDTH = 1440;

const TimeLine = ({
  camera,
  incident,
}: {
  camera: Camera[] | undefined;
  incident: IncidentWithCamera[] | undefined;
}) => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(
    ({ offset: [xOffset] }) => {
      const maxDrag = 0;
      const minDrag = Math.min(0, VIEWPORT_WIDTH - TIMELINE_WIDTH);

      const clampedX = Math.max(Math.min(xOffset, maxDrag), minDrag);
      console.log(clampedX);

      api.start({ x: clampedX });
    },
    {
      axis: "x",
      from: () => [x.get(), 0],
      pointer: { touch: true },
      rubberband: false,
    }
  );

  const CameraIncidents = camera?.map((camera) => {
    return {
      ...camera,
      incidents: incident?.filter(
        (incident) => incident.Camera.id === camera.id
      ),
    };
  });

  const getPositionAndWidth = (startISO, endISO) => {
    const start = new Date(startISO);
    const end = new Date(endISO);

    const startSeconds =
      start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
    const endSeconds =
      end.getHours() * 3600 + end.getMinutes() * 60 + end.getSeconds();

    const pxPerSecond = 72 / 3600; // 1 hour = 72px
    const left = startSeconds * pxPerSecond;
    const width = (endSeconds - startSeconds) * pxPerSecond;

    return { left, width };
  };

  const incidentIcons: Record<
    string,
    {
      icon: LucideIcon;
      bg: string;
      iconColor: string;
      color: string;
      name: string;
    }
  > = {
    FACE_RECOGNISED: {
      icon: UsersRound,
      bg: "bg-utility-blue-50",
      iconColor: "utility-blue-500",
      color: "text-utility-blue-700",
      name: "Face Recognised",
    },
    GUN_THREAT: {
      icon: Siren,
      bg: "bg-utility-errow-50",
      iconColor: "utility-rose-500",
      color: "text-utility-error-700",
      name: "Gun Threat",
    },
    TRAFFIC_CONGESTION: {
      icon: UserSearch,
      bg: "bg-utility-teal-50",
      iconColor: "utility-teal-500",
      color: "text-utility-teal-700",
      name: "Traffic Congestion",
    },
    UNAUTHORISED_ACCESS: {
      icon: DoorOpen,
      bg: "bg-utility-orange-50",
      iconColor: "utility-orange-500",
      color: "text-utility-orange-700",
      name: "Unathorised Access",
    },
  };

  return (
    <div>
      <div className="flex items-center gap-4 w-full bg-card px-4 py-1 mb-2 rounded-md">
        <SkipBack size={16} />
        <Image src="/icons/back.svg" alt="Back" width={20} height={20} />
        <Icon icon={"mdi:play-circle"} className="w-8 h-8" />
        <Image src="/icons/forward.svg" alt="Forward" width={20} height={20} />
        <SkipForward size={16} />
        <div className="text-sm text-while font-alt font-medium tracking-wide">
          03:12:37(25-July-2025)
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xs">1x</p>
          <Image src="/icons/speed.svg" alt="Forward" width={20} height={20} />
        </div>
      </div>
      <div className="bg-card flex w-full h-full">
        <div className="min-w-[10vw] h-full flex flex-col justify-center items-center">
          <p className="p-4">Camera List</p>
          <div className="w-full flex flex-col justify-center items-center">
            {camera?.map((camera) => (
              <div
                key={camera.id}
                className="w-full flex justify-center items-center gap-1 py-4"
              >
                <Icon icon={"mdi:security-camera"} className="w-4 h-4" />
                <p className="text-xs font-alt ">{camera.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-full h-full grow overflow-hidden py-3.5 px-2">
          <animated.div
            {...bind()}
            style={{ x }}
            className="relative cursor-grab select-none w-max"
          >
            <TimeRuler />
            <div className="relative mt-3.5">
              {CameraIncidents?.map((camera, index) => (
                <div
                  key={camera.id}
                  className="relative"
                  style={{
                    height: "48px", // row height
                  }}
                >
                  {camera.incidents?.map((incident) => {
                    const { left, width } = getPositionAndWidth(
                      incident.tsStart,
                      incident.tsEnd
                    );

                    const config = incidentIcons[incident?.type];
                    const IncidentIcon = config.icon;
                    const incidentBg = config.bg;
                    const iconColor = config.iconColor;
                    const incidentColor = config.color;
                    const incidentName = config.name;

                    return (
                      <div
                        key={incident.id}
                        className={`absolute px-2 py-2 flex justify-center items-center gap-1 h-4 ${incidentBg} ${incidentColor} rounded border-l-2 border-${iconColor}`}
                        style={{
                          left: `${left}px`,
                          // width: `${width}px`,
                          top: `${index * 48 + 16}px`,
                        }}
                        title={`${incident.type}`}
                      >
                        <IncidentIcon
                          className={`text-${iconColor}`}
                          size={12}
                        />
                        <p className="text-xs font-medium">{incidentName}</p>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            {/* <p>Hello</p> */}
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
