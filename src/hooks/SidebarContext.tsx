"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Option {
    id: string;
    name: string;
}

interface Data {
    symptoms: Option[];
    countries: Option[];
    hours: Option[];
    languages: Option[];
    specializations: Option[];
    topics: Option[];
    visits: Option[];
}

interface SidebarContextProps {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
    options: Data;
    loading: boolean;
}

const SidebarContext = createContext<SidebarContextProps>({
    selectedSection: "",
    setSelectedSection: () => {},
    options: {
        symptoms: [],
        countries: [],
        hours: [],
        languages: [],
        specializations: [],
        topics: [],
        visits: [],
    },
    loading: true,
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();
    const [selectedSection, setSelectedSection] = useState("");
    const [options, setOptions] = useState<any>({
        symptoms: [],
        countries: [],
        hours: [],
        languages: [],
        specializations: [],
        topics: [],
        visits: [],
    });

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
                console.log(data);

                if (data) {
                    const transformedData = {
                        symptoms: data.symptoms.map((item: any) => ({
                            label: item.name,
                            value: item.id,
                        })),
                        countries: data.countries.map((item: any) => ({
                            label: item.name,
                            value: item.id,
                        })),
                        hours: data.hours.map((item: any) => ({
                            label: item.name,
                            value: item.id,
                        })),
                        languages: data.languages.map((item: any) => ({
                            label: item.name,
                            value: item.id,
                        })),
                        specializations: data.specializations.map(
                            (item: any) => ({
                                label: item.name,
                                value: item.id,
                            })
                        ),
                        topics: data.topics.map((item: any) => ({
                            label: item.name,
                            value: item.id,
                        })),
                        visits: data.visits.map((item: any) => ({
                            label: item.name,
                            value: item.id,
                        })),
                    };
                    setOptions(transformedData);
                }
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
