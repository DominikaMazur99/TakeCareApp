"use client";

import { ChevronDown, Earth } from "lucide-react";
import React, { useState } from "react";

interface LanguageOption {
    label: string;
    value: string;
}

const LanguageSelect: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>({
        label: "PL",
        value: "pl",
    });
    const [options, setOptions] = useState<LanguageOption[]>([
        { label: "PL", value: "pl" },
        { label: "EN", value: "en" },
        { label: "DE", value: "de" },
    ]);

    const handleLanguageChange = (value: string) => {
        const selected = options.find((option) => option.value === value);
        if (selected) {
            setSelectedLanguage(selected);
        }
    };

    return (
        <div className="relative inline-flex items-center gap-2">
            <span className="text-blue-600">
                <Earth />
            </span>
            <select
                value={selectedLanguage.value}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-transparent text-blue-600 font-medium focus:outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <span className="text-blue-600">
                <ChevronDown />
            </span>
        </div>
    );
};

export default LanguageSelect;
