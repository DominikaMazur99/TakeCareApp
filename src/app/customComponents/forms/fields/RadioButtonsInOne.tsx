"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RadioOption {
    label: string;
    value: string;
}

interface RadioGroupProps {
    name: string;
    label?: string;
    options: RadioOption[];
    className?: string;
    rules?: object;
}

const RadioButtonsInOne: React.FC<RadioGroupProps> = ({
    name,
    label,
    options,
    className = "",
    rules,
}) => {
    const { control } = useFormContext();

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-base text-textLabel font-hight mb-2"
                >
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <div className="flex w-full border border-[#C5D8F1] rounded-6px bg-[#E5F0FF] p-5px">
                        {options.map((option, index) => (
                            <label
                                key={option.value}
                                className={cn(
                                    "flex-1 cursor-pointer text-center text-sm font-medium py-2 border-[#C5D8F1] transition-all",
                                    index === 0
                                        ? "rounded-l-md" // Left rounded corner for the first button
                                        : index === options.length - 1
                                        ? "rounded-r-md" // Right rounded corner for the last button
                                        : "", // No rounded corners for middle buttons
                                    field.value === option.value
                                        ? "bg-white py-1.5 px-3 rounded-3px text-[#09162A]"
                                        : "bg-[#E5F0FF] text-[#242628]"
                                )}
                            >
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() =>
                                        field.onChange(option.value)
                                    }
                                    className="hidden"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                )}
            />
        </div>
    );
};

export default RadioButtonsInOne;
