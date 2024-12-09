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

const RadioButtonsComponent: React.FC<RadioGroupProps> = ({
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
                    <div className="flex gap-4 w-full">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className={cn(
                                    "flex-1 cursor-pointer rounded-md border px-4 py-3 text-center text-sm font-medium",
                                    field.value === option.value
                                        ? " text-white border-[#09162A] bg-[#112950]"
                                        : "bg-white text-[#09162A] border-[#09162A]"
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

export default RadioButtonsComponent;
