import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import React from "react";

interface SelectComponentProps {
    icon?: React.ReactNode;
    borderColor?: string;
    arrowColor?: string;
    value: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
    icon,
    borderColor,
    arrowColor,
    value,
}) => {
    return (
        <Select>
            <SelectTrigger
                icon={icon}
                borderColor={borderColor}
                arrowColor={arrowColor}
            >
                {value}
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="option1">Opcja 1</SelectItem>
                <SelectItem value="option2">Opcja 2</SelectItem>
                <SelectItem value="option3">Opcja 3</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SelectComponent;
