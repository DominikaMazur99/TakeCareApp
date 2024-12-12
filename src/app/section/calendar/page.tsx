"use client";

import DialogComponent from "@/app/customComponents/ui/DialogComponent";
import { useSidebar } from "@/hooks/SidebarContext";
import React from "react";

const CalendarPage: React.FC = () => {
    const { bookVisit, handleBookVisit } = useSidebar();
    return (
        <>
            <div>Calendar</div>;
            <DialogComponent
                open={bookVisit}
                onClose={() => handleBookVisit(false)}
            />
        </>
    );
};

export default CalendarPage;
