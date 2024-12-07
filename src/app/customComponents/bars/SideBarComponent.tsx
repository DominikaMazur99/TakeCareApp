"use client";

import React from "react";
import { useSidebar } from "@/hooks/SidebarContext";

// Import ikon
import HomeIcon from "../../icons/sidebar/HomeIcon.svg";
import HeadphonesIcon from "../../icons/sidebar/HeadphonesIcon.svg";
import HospitalIcon from "../../icons/sidebar/HospitalIcon.svg";
import BagIcon from "../../icons/sidebar/BagIcon.svg";
import OpinionIcon from "../../icons/sidebar/OpinionIcon.svg";
import NoteIcon from "../../icons/sidebar/NoteIcon.svg";
import CalendarIcon from "../../icons/sidebar/CalenderIcon.svg";
import RaportIcon from "../../icons/sidebar/RaportIcon.svg";
import SettingsIcon from "../../icons/sidebar/SettingsIcon.svg";
import FaqIcon from "../../icons/sidebar/FaqIcon.svg";
import LogoutIcon from "../../icons/sidebar/LogoutIcon.svg";

const SideBarComponent: React.FC = () => {
    const { selectedSection, setSelectedSection } = useSidebar();

    const menuItems = [
        { name: "Strona główna", icon: <HomeIcon /> },
        { name: "Wizyty online", icon: <HeadphonesIcon /> },
        { name: "Wizyty domowe", icon: <HospitalIcon /> },
        { name: "Wizyty stacjonarne", icon: <BagIcon /> },
        { name: "Druga opinia", icon: <OpinionIcon /> },
        { name: "Dziennik aktywności", icon: <NoteIcon /> },
        { name: "Kalendarz specjalistów", icon: <CalendarIcon /> },
        { name: "Raporty", icon: <RaportIcon /> },
        { name: "Ustawienia", icon: <SettingsIcon /> },
        { name: "FAQ", icon: <FaqIcon /> },
        { name: "Wyloguj się", icon: <LogoutIcon /> },
    ];

    return (
        <div className="w-[16rem] h-full bg-white shadow-md p-6 rounded-md">
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        className={`flex items-center gap-4 cursor-pointer p-4 rounded-md transition-colors duration-200 ${
                            selectedSection === item.name
                                ? "bg-blue-100 text-blue-500"
                                : "hover:bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => setSelectedSection(item.name)}
                    >
                        <span className="w-6 h-6 flex-shrink-0">
                            {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBarComponent;
