import React, { useEffect, useState } from "react";
import Select from "react-select";

interface MultiSelectProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    options?: any[];
    className?: string;
    onChange?: (selected: { label: string; value: string | number }[]) => void;
    defaultValue?: { label: string; value: string | number }[];
    key: string;
}

const MultiSelectComponent: React.FC<MultiSelectProps> = ({
    id,
    name,
    label,
    placeholder = "Wybierz z listy",
    options,
    className = "",
    onChange,
    defaultValue = [],
    key,
}) => {
    const [selected, setSelected] =
        useState<{ label: string; value: string | number }[]>(defaultValue);

    const handleChange = (selectedOptions: any) => {
        setSelected(selectedOptions);
        if (onChange) {
            onChange(selectedOptions || []);
        }
    };

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
        indicatorSeparator: () => ({
            display: "none",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#e0f2fe" : "white", // Light blue on focus
            color: state.isSelected ? "white" : "#1f2937", // White text when selected
            "&:hover": {
                backgroundColor: "#93c5fd", // Blue on hover
                color: "white",
            },
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: "#dbeafe", // Light blue chip background
            color: "#1f2937", // Dark gray text
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: "#1f2937", // Dark gray text
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: "#1f2937", // Dark gray text for "x"
            "&:hover": {
                backgroundColor: "#93c5fd", // Blue hover for "x"
                color: "white",
            },
        }),
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`} id={id}>
            {label && (
                <label
                    htmlFor={name || id}
                    className="text-base text-textLabel font-hight"
                >
                    {label}
                </label>
            )}
            <Select
                isMulti
                options={options}
                placeholder={placeholder}
                value={selected}
                onChange={handleChange}
                styles={customStyles} // Apply custom styles
                key={key}
            />
        </div>
    );
};

export default MultiSelectComponent;
