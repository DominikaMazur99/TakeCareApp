"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface TextareaProps {
    name: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    rules?: object;
    className?: string;
}

const TextareaComponent: React.FC<TextareaProps> = ({
    name,
    label,
    placeholder,
    rows = 3,
    rules,
    className = "",
}) => {
    const { control } = useFormContext();

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
                render={({ field, fieldState }) => (
                    <div>
                        <textarea
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            rows={rows}
                            className={`w-full p-4 text-sm text-gray-900 bg-gray-100 border border-transarent rounded-lg placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 ${
                                fieldState.error ? "border-red-500" : ""
                            }`}
                        />
                        {fieldState.error && (
                            <span className="text-sm text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default TextareaComponent;
