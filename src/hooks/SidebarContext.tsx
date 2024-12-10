"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextProps {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
    options: Record<string, any>;
    loading: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({
    selectedSection: "",
    setSelectedSection: () => {},
    options: {},
    loading: true,
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();
    const [selectedSection, setSelectedSection] = useState("");
    const [options, setOptions] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (pathname) {
            const sectionFromPath = pathname.split("/").pop() || "home";
            setSelectedSection(sectionFromPath);
        }
    }, [pathname]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/homeform-select-options");
                const data = await response.json();
                setOptions(data);
            } catch (error) {
                console.error("Error fetching options:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    return (
        <SidebarContext.Provider
            value={{ selectedSection, setSelectedSection, options, loading }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
