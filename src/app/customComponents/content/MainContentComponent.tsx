"use client";

import React from "react";
import { useSidebar } from "@/hooks/SidebarContext";
import Breadcrumbs from "../ui/Breadcrubms";

const MainContentComponent: React.FC = () => {
    const { selectedSection } = useSidebar();

    return (
        <div className="flex-1 p-8">
            <Breadcrumbs />
            <h1 className="text-lg font-bold">
                Aktualna sekcja: {selectedSection}
            </h1>
            <p>Treść sekcji: {selectedSection}</p>
        </div>
    );
};

export default MainContentComponent;
