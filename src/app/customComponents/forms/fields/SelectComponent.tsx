"use client";

import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface SelectProps {
    name: string;
    label?: string;
    placeholder?: string;
    rules?: object;
    className?: string;
    fetchOptions: () => Promise<{ label: string; value: string | number }[]>; // Ensure fetchOptions matches this signature
    defaultValue?: string | number; // Add defaultValue prop
}

const SelectComponent: React.FC<SelectProps> = ({
    name,
    label,
    placeholder = "Select an option",
    rules,
    className = "",
    fetchOptions,
    defaultValue = "", // Default to empty string if no value is provided
}) => {
    const { control } = useFormContext();
    const [options, setOptions] = useState<
        { label: string; value: string | number }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state

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
        <div className={`flex flex-col gap-1 ${className}`}>
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
                defaultValue={defaultValue} // Set the default value for the select
                render={({ field, fieldState }) => (
                    <div>
                        <select
                            {...field}
                            id={name}
                            disabled={loading || options.length === 0} // Disable while loading
                            className={`py-2 w-full placeholder:text-base placeholder:text-textHover placeholder:font-small focus:outline-none ${
                                fieldState.error
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        >
                            <option value="" disabled>
                                {loading ? "Opcje ładują się..." : placeholder}
                            </option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {fieldState.error && (
                            <span className="text-sm text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </div>
                )}
            />
            <div className="h-px bg-gray-300"></div>
        </div>
    );
};

export default SelectComponent;
