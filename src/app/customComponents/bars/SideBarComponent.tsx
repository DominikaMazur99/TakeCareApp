"use client";

import React from "react";
import Footer from "../../icons/sidebar/FooterIcon.svg";

// Import ikon
import HomeIcon from "../../icons/sidebar/HomeIcon";
import HeadphonesIcon from "../../icons/sidebar/HeadphonesIcon";
import HospitalIcon from "../../icons/sidebar/HospitalIcon";
import BagIcon from "../../icons/sidebar/BagIcon";
import OpinionIcon from "../../icons/sidebar/OpinionIcon";
import NoteIcon from "../../icons/sidebar/NoteIcon";
import CalendarIcon from "../../icons/sidebar/CalenderIcon";
import RaportIcon from "../../icons/sidebar/RaportIcon";
import SettingsIcon from "../../icons/sidebar/SettingsIcon";
import FaqIcon from "../../icons/sidebar/FaqIcon";
import LogoutIcon from "../../icons/sidebar/LogoutIcon";
import ListComponent from "../ui/ListComponent";
import UserCard from "../ui/UserCard";

const SideBarComponent: React.FC = () => {
    const menuItems = [
        { name: "Strona główna", icon: <HomeIcon />, path: "/" },
        {
            name: "Wizyty online",
            icon: <HeadphonesIcon />,
            path: "/section/online",
        },
        {
            name: "Wizyty domowe",
            icon: <HospitalIcon />,
            path: "/section/home",
        },
        {
            name: "Wizyty stacjonarne",
            icon: <BagIcon />,
            path: "/section/stacionary",
        },
        {
            name: "Druga opinia",
            icon: <OpinionIcon />,
            path: "/section/second",
        },
        {
            name: "Dziennik aktywności",
            icon: <NoteIcon />,
            path: "/section/activities",
        },
        {
            name: "Kalendarz specjalistów",
            icon: <CalendarIcon />,
            path: "/section/calendar",
        },
        { name: "Raporty", icon: <RaportIcon />, path: "/section/raports" },
    ];
    const settingsItems = [
        {
            name: "Ustawienia",
            icon: <SettingsIcon />,
            path: "/section/settings",
        },
        { name: "FAQ", icon: <FaqIcon />, path: "/section/faq" },
    ];
    const logoutItems = [
        { name: "Wyloguj się", icon: <LogoutIcon />, path: "/section/logout" },
    ];

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="w-[16rem] bg-white shadow-md p-6 rounded-md space-y-4">
                <div>
                    <UserCard
                        name={"Joe Doe"}
                        job={"Operator"}
                        email={"joe@doe.pl"}
                    />
                    <div className="my-4 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={menuItems} />
                    <div className="my-4 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={settingsItems} />
                    <div className="my-4 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={logoutItems} />
                </div>
            </div>
            <div className="flex justify-start">
                <Footer />
            </div>
        </div>
    );
};

export default SideBarComponent;
