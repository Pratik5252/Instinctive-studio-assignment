import Image from "next/image";
import React from "react";
import Logo from "../../public/icons/navbar/Icon.svg";
import Avatar from "../../public/icons/navbar/avatar.svg";
import { ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const links = [
    { icon: "mdi:view-dashboard", name: "Dashboard" },
    { icon: "bxs:cctv", name: "Camera" },
    { icon: "material-symbols:settings-applications", name: "Scenes" },
    { icon: "ri:alert-fill", name: "Incidents" },
    { icon: "mdi:users", name: "Users" },
  ];
  return (
    <div className="relative w-full flex px-6 pt-4 pb-3 font-alt justify-between items-center border-b border-white/15">
      {/* //center this */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[725px] h-[108px] rounded-full bg-[rgba(208,167,4,0.35)] blur-[100px] -z-10"></div>
      <div className="flex gap-2 items-center">
        <Image src={Logo} alt="Logo" />
        <div className="flex">
          <p>MANDLAC</p>
          <p className="font-extrabold">X</p>
        </div>
      </div>
      <div className="flex gap-4">
        {links.map((link) => (
          <button
            key={link.name}
            className="group flex items-center gap-2 px-3 py-2.5 cursor-pointer text-xs font-bold text-white transition-colors duration-200 hover:text-foreground-muted"
          >
            <Icon
              icon={link.icon}
              className="w-4 h-4 transition-colors duration-200 group-hover:text-accent"
            />
            <p className="transition-colors duration-200"> {link.name} </p>
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center px-2 py-2">
        <Image src={Avatar} alt="Logo" width={32} height={32} />
        <div className="flex gap-2 items-center">
          <div>
            <p className="font-semibold text-[14px]">Mohammed Ajhas</p>
            <p className="text-xs">ajhas@mandlac.com</p>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
