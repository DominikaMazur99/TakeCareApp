"use client";

import React, { useTransition } from "react";
import Logo from "../../icons/appIcon.svg";
import ButtonComponent from "../ui/ButtonComponent";
import Calender from "../../icons/CalenderIcon.svg";
import Spider from "../../icons/SpiderIcon.svg";
import LanguageSelect from "./ui/LanguageSelect";
import { useTranslation } from "react-i18next";
import { useSidebar } from "@/hooks/SidebarContext";
// import SelectComponent from "../ui/SelectComponent";
// import World from "../../icons/WorldIcon.svg";

const NavbarComponent: React.FC = () => {
    const { t } = useTranslation();
    const { handleBookVisit } = useSidebar();
    return (
        <div className="top-0 w-full h-[96px] border-b-[1px] border-customGrey px-12 py-6">
            <div className="grid grid-cols-[60%,40%] items-end">
                <div>
                    <Logo />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <ButtonComponent
                        variant="error"
                        name={t("button.problem")}
                        icon={<Spider />}
                    />
                    <ButtonComponent
                        variant="basic"
                        name={t("button.appointment")}
                        icon={<Calender className="text-white" />}
                        onClick={() => handleBookVisit(true)}
                    />
                    <LanguageSelect />
                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
