"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Typy dla kontekstu
interface SidebarContextType {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
}

// Tworzymy kontekst
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider dla kontekstu
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

// Hook do korzystania z kontekstu
export const useSidebar = (): SidebarContextType => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.");
    }
    return context;
};
