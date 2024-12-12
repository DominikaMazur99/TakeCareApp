"use client";

import DialogComponent from "@/app/customComponents/ui/DialogComponent";
import { useSidebar } from "@/hooks/SidebarContext";
import React from "react";

const OnlinePage: React.FC = () => {
    const { bookVisit, handleBookVisit } = useSidebar();
    return (
        <>
            <div>OnlinePage</div>;
            <DialogComponent
                open={bookVisit}
                onClose={() => handleBookVisit(false)}
            />
        </>
    );
};

export default OnlinePage;
