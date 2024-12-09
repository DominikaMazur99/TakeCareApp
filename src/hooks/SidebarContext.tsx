"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextProps {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
}

const SidebarContext = createContext<SidebarContextProps>({
    selectedSection: "",
    setSelectedSection: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();
    const [selectedSection, setSelectedSection] = useState("");

    useEffect(() => {
        // Synchronizuj `selectedSection` z URL-em
        if (pathname) {
            const sectionFromPath = pathname.split("/").pop() || "home"; // Domyślnie "home"
            setSelectedSection(sectionFromPath);
        }
    }, [pathname]);

    return (
        <SidebarContext.Provider
            value={{ selectedSection, setSelectedSection }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
