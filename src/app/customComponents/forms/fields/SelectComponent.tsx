"use client";

import React from "react";
import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SelectProps {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    options: any;
    rules?: object;
}

const SelectComponent: React.FC<SelectProps> = ({
    id,
    name,
    label,
    placeholder = "option.placeholder",
    options,
    rules,
}) => {
    const { t } = useTranslation();
    const { control } = useFormContext();

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            border: "none",
            borderBottom: "1px solid #d1d5db",
            borderRadius: "0",
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: "0.25rem 0",
            color: "#6b7280", // textHover color
            ...(state.isFocused && {
                borderBottom: "1px solid #2563eb",
            }),
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: "0", // Usuń padding wewnętrzny
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#6b7280", // textHover color
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#e0f2fe" : "white",
            color: state.isSelected ? "white" : "#6b7280", // textHover color
            "&:hover": {
                backgroundColor: "#93c5fd",
                color: "white",
            },
        }),
    };

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    id={id}
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
                        <Select
                            {...field}
                            inputId={`${id}-input`}
                            options={options || []}
                            placeholder={t(placeholder)}
                            value={
                                options?.find(
                                    (option: any) =>
                                        option.label === field.value
                                ) || null
                            }
                            onChange={(selectedOption) =>
                                field.onChange(
                                    selectedOption ? selectedOption.label : ""
                                )
                            }
                            styles={customStyles}
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

export default SelectComponent;
