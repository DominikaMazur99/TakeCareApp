"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [selectedSection, setSelectedSection] = useState("Strona główna");

    return (
        <SidebarContext.Provider
            value={{ selectedSection, setSelectedSection }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
};
