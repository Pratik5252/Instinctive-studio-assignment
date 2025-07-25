"use client";

import { Camera } from "@prisma/client";
import { CalendarDays, Disc, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
const IncidentPlayer = ({ camera }: { camera: Camera[] | undefined }) => {
  const [selected, setSelected] = useState(camera?.[0]);

  const cameraImage: Record<string, string> = {
    // Map 3 Image t 3 Camera
    "Camera 01": "/Thumbnail-06.jpg",
    "Camera 02": "/Thumbnail-01.jpg",
    "Camera 03": "/Thumbnail-03.jpg",
  };

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden">
      {selected && (
        <Image
          src={`/thumbnails${cameraImage[selected.name]}`}
          alt={selected.name}
          width={440}
          height={300}
          className="w-full h-full opacity-75"
        />
      )}
      <div className="absolute bg-utility-gray-100 top-0 flex justify-center items-center px-2 py-0.5 mt-2 ml-2 z-20 gap-1 rounded">
        <CalendarDays size={12} className="text-utility-gray-500" />
        <p className="text-xs font-medium text-utility-gray-700">
          11/7/2025 - 03:12:37
        </p>
      </div>
      <div className="absolute bg-background flex justify-between items-center gap-1 bottom-0 ml-2 mb-2 z-20 px-2 py-0.5 rounded border-border">
        <Disc size={12} className="text-camera-alert" />
        <span className="text-sm font-medium">{selected?.name}</span>
      </div>
      <div className="flex justify-center items-start gap-3 absolute bottom-0 right-0 mb-2 mr-2 z-20">
        {camera
          ?.filter((camera) => camera.id !== selected?.id)
          .map((camera) => (
            <div key={camera.id} className="rounded overflow-hidden">
              <div className="bg-background flex justify-between items-center px-1.5 py-1">
                <p className="text-[8px] font-medium text-[#D4D4D4]">
                  {camera.name}
                </p>
                <EllipsisVertical
                  size={10}
                  className="hover:text-foreground-muted cursor-pointer"
                />
              </div>
              <div
                className="border-t border-border cursor-pointer"
                onClick={() => setSelected(camera)}
              >
                <Image
                  src={`/thumbnails${cameraImage[camera.name]}`}
                  alt={camera.name}
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-overlay-light z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-28 shadow-overlay z-10"></div>
    </div>
  );
};

export default IncidentPlayer;
