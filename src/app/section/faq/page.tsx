"use client";

import DialogComponent from "@/app/customComponents/ui/DialogComponent";
import { useSidebar } from "@/hooks/SidebarContext";
import React from "react";

const FaqPage: React.FC = () => {
    const { bookVisit, handleBookVisit } = useSidebar();
    return (
        <>
            <div>FaqPage</div>;
            <DialogComponent
                open={bookVisit}
                onClose={() => handleBookVisit(false)}
            />
        </>
    );
};

export default FaqPage;
