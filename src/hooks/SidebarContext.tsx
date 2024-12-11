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
    selectedLanguage: string;
    setLanguage: (lang: string) => void;
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
    selectedLanguage: "pl",
    setLanguage: () => {},
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
    const [selectedLanguage, setSelectedLanguage] = useState("PL"); // Domyślny język

    const setLanguage = (lang: string) => {
        setSelectedLanguage(lang);
    };

    useEffect(() => {
        if (pathname) {
            const sectionFromPath = pathname.split("/").pop() || "home";
            setSelectedSection(sectionFromPath);
        }
    }, [pathname]);

    useEffect(() => {
        let isMounted = true; // Ensure cleanup to avoid state updates on unmounted components

        const fetchOptions = async () => {
            try {
                if (isMounted) setLoading(true);

                const response = await fetch(
                    `/api/homeform-select-options?lng=${selectedLanguage.toLowerCase()}`
                );
                const data = await response.json();

                if (data && isMounted) {
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
                if (isMounted) setLoading(false);
            }
        };

        fetchOptions();

        return () => {
            isMounted = false; // Cleanup function to prevent state updates if unmounted
        };
    }, [selectedLanguage]); // Re-run when the language changes

    return (
        <SidebarContext.Provider
            value={{
                selectedSection,
                setSelectedSection,
                options,
                loading,
                selectedLanguage,
                setLanguage,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
