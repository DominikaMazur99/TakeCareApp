"use client";

import DialogComponent from "@/app/customComponents/ui/DialogComponent";
import { useSidebar } from "@/hooks/SidebarContext";
import React from "react";

const StacionaryPage: React.FC = () => {
    const { bookVisit, handleBookVisit } = useSidebar();
    return (
        <>
            <div>StacionaryPage</div>;
            <DialogComponent
                open={bookVisit}
                onClose={() => handleBookVisit(false)}
            />
        </>
    );
};

export default StacionaryPage;
