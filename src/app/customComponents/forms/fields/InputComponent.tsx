"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface InputProps {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    rules?: object;
    className?: string;
}

const InputComponent: React.FC<InputProps> = ({
    name,
    label,
    placeholder,
    type = "text",
    rules,
    className = "",
}) => {
    const { control } = useFormContext();

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="text-base text-textLabel font-hight"
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
                        <input
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            type={type}
                            className={` py-2 w-full text-textHover placeholder:text-base placeholder:text-textHover placeholder:font-small focus:outline-none  ${
                                fieldState.error
                                    ? "border-red-500"
                                    : "border-gray-300"
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
            <div className=" h-px bg-gray-300"></div>
        </div>
    );
};

export default InputComponent;