"use client";

import { ChevronDown, Earth } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface LanguageOption {
    label: string;
    value: string;
}

const LanguageSelect: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
        label: "PL",
        value: "pl",
    });
    const [isOpen, setIsOpen] = useState(false); // Stan do kontrolowania widoczności menu
    const dropdownRef = useRef<HTMLDivElement>(null); // Referencja do całego komponentu

    const options: LanguageOption[] = [
        { label: "PL", value: "pl" },
        { label: "EN", value: "en" },
        { label: "DE", value: "de" },
    ];

    const handleLanguageChange = (value: string) => {
        const selected = options.find((option) => option.value === value);
        if (selected) {
            setSelectedLanguage(selected);
            setIsOpen(false); // Zamknij menu po wyborze
        }
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev); // Przełącz stan otwarcia/zamknięcia menu
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false); // Zamknij menu, jeśli kliknięto poza komponentem
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-32">
            <button
                className="flex items-center justify-between w-full px-3 py-2 border-none rounded-md bg-white text-blue-600 font-mediumfocus:outline-none "
                onClick={toggleDropdown}
                type="button"
            >
                <div className="flex items-center gap-2">
                    <Earth className="w-4 h-4" />
                    <span>{selectedLanguage.label}</span>
                </div>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 ${
                                option.value === selectedLanguage.value
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-800"
                            }`}
                            onClick={() => handleLanguageChange(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelect;
