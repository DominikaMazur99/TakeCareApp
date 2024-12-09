"use client";

import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"; // Replace with your actual Select component import

interface SelectProps {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    rules?: object;
    className?: string;
    fetchOptions: () => Promise<{ label: string; value: string | number }[]>; // API fetch function
    defaultValue?: string | number; // Default selected value
}

const SelectComponent: React.FC<SelectProps> = ({
    id,
    name,
    label,
    placeholder = "Select an option",
    rules,
    className = "",
    fetchOptions,
    defaultValue,
}) => {
    const { control } = useFormContext();
    const [options, setOptions] = useState<
        { label: string; value: string | number }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchOptions();
                setOptions(data);
            } catch (error) {
                console.error("Error fetching options:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchOptions]);

    return (
        <div className={`flex flex-col gap-1 ${className} `} id={id}>
            {label && (
                <label
                    htmlFor={name}
                    className="text-base text-textLabel font-bold"
                >
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue || options[0]?.value || ""}
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {!loading && options.length === 0 && (
                                <SelectItem value="no-options" disabled>
                                    No options available
                                </SelectItem>
                            )}
                            {loading ? (
                                <SelectItem value="loading" disabled>
                                    Loading...
                                </SelectItem>
                            ) : (
                                options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={String(option.value)}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                )}
            />
            <div className="h-px bg-gray-300"></div>
        </div>
    );
};

export default SelectComponent;
