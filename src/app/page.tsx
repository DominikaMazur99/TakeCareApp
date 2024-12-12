"use client";

import { useSidebar } from "@/hooks/SidebarContext";
import NavbarComponent from "./customComponents/bars/NavbarComonent";
import SideBarComponent from "./customComponents/bars/SideBarComponent";
import Breadcrumbs from "./customComponents/ui/Breadcrubms";
import DialogComponent from "./customComponents/ui/DialogComponent";
import {
    navigateToSection,
    optionsToDialog,
} from "./customComponents/helpers/helpers";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { bookVisit, handleBookVisit } = useSidebar();
    const router = useRouter();
    const { t } = useTranslation();

    const handleClose = () => handleBookVisit(false);

    return (
        <>
            <div className="w-screen h-screen overflow-hidden grid grid-rows-[auto,1fr]">
                <NavbarComponent />
                <div className="grid grid-cols-[1fr,3fr,1fr] gap-4 bg-[#E4E5E7] overflow-hidden h-full">
                    <div className="p-8">
                        <SideBarComponent />
                    </div>
                    <div className="w-full px-8 items-center h-full overflow-auto">
                        <div className="py-8">
                            <Breadcrumbs />
                        </div>
                    </div>
                    <div className="p-8"></div>
                </div>
            </div>
            <DialogComponent
                open={bookVisit}
                onClose={handleClose}
                title={`${t("choose.visits")}`}
                content={
                    <ul className="mt-6 space-y-4">
                        {optionsToDialog.map((option) => (
                            <li key={option.path}>
                                <button
                                    onClick={() =>
                                        navigateToSection(
                                            option.path,
                                            router,
                                            handleClose
                                        )
                                    }
                                    className="w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all"
                                >
                                    {t(option.label)}
                                </button>
                            </li>
                        ))}
                    </ul>
                }
            />
        </>
    );
}
