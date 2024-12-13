import React from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

interface MultiSelectProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    options: any;
    className?: string;
    value?: string[]; // Teraz będzie to tablica stringów (labeli)
    onChange?: (selected: string[]) => void; // Zwracamy tablicę stringów
}

const MultiSelectComponent: React.FC<MultiSelectProps> = ({
    id,
    name,
    label,
    placeholder = "list.placeholder",
    options,
    className = "",
    value = [],
    onChange,
}) => {
    const { t } = useTranslation();

    const handleChange = (selectedOptions: any) => {
        if (onChange) {
            const selectedLabels = selectedOptions.map(
                (option: { label: string }) => option.label
            );
            onChange(selectedLabels); // Zwracamy tablicę labeli
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
            color: "#6b7280",
            ...(state.isFocused && {
                borderBottom: "1px solid #2563eb",
            }),
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#e0f2fe" : "white",
            color: state.isSelected ? "white" : "#1f2937",
            "&:hover": {
                backgroundColor: "#93c5fd",
                color: "white",
            },
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: "#dbeafe",
            color: "#1f2937",
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: "#1f2937",
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: "#1f2937",
            "&:hover": {
                backgroundColor: "#93c5fd",
                color: "white",
            },
        }),
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`} id={id}>
            {label && (
                <label
                    id={id}
                    htmlFor={name || id}
                    className="text-base text-textLabel font-hight"
                >
                    {label}
                </label>
            )}
            <Select
                inputId={`${id}-input`}
                isMulti
                options={options || []}
                placeholder={t(placeholder)}
                value={
                    options.filter((option: any) =>
                        value.includes(option.label)
                    ) // Dopasowujemy zaznaczone label
                }
                onChange={handleChange} // Obsługa zmiany z mapowaniem na label
                styles={customStyles}
            />
        </div>
    );
};

export default MultiSelectComponent;
