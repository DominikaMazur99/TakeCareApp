import React, { useEffect, useState } from "react";
import Select from "react-select";

interface MultiSelectProps {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    fetchOptions: () => Promise<{ label: string; value: string | number }[]>;
    className?: string;
    onChange?: (selected: { label: string; value: string | number }[]) => void;
    defaultValue?: { label: string; value: string | number }[];
}

const MultiSelectComponent: React.FC<MultiSelectProps> = ({
    id,
    name,
    label,
    placeholder = "Wybierz z listy",
    fetchOptions,
    className = "",
    onChange,
    defaultValue = [],
}) => {
    const [options, setOptions] = useState<
        { label: string; value: string | number }[]
    >([]);
    const [selected, setSelected] =
        useState<{ label: string; value: string | number }[]>(defaultValue);
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

    const handleChange = (selectedOptions: any) => {
        setSelected(selectedOptions);
        if (onChange) {
            onChange(selectedOptions || []);
        }
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent", // Light gray background
            borderRadius: "0.375rem", // Rounded corners
            padding: "0.25rem", // Padding inside the control
            "&:hover": {
                borderColor: "#93c5fd", // Blue on hover
            },
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
                isLoading={loading}
                placeholder={placeholder}
                value={selected}
                onChange={handleChange}
                styles={customStyles} // Apply custom styles
            />
            <div className=" h-px bg-gray-300"></div>
        </div>
    );
};

export default MultiSelectComponent;
