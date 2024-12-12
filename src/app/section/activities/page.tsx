"use client";

import {
    navigateToSection,
    optionsToDialog,
} from "@/app/customComponents/helpers/helpers";
import DialogComponent from "@/app/customComponents/ui/DialogComponent";
import { useSidebar } from "@/hooks/SidebarContext";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";

const ActivitiesPage: React.FC = () => {
    const { bookVisit, handleBookVisit } = useSidebar();
    const router = useRouter();
    const { t } = useTranslation();

    const handleClose = () => handleBookVisit(false);
    return (
        <>
            <div>ActivitiesPage</div>;
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
};

export default ActivitiesPage;
