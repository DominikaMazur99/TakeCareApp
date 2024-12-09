import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import React from "react";

interface SelectComponentProps {
    value: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ value }) => {
    return (
        <Select>
            <SelectTrigger>{value}</SelectTrigger>
            <SelectContent>
                <SelectItem value="option1">Opcja 1</SelectItem>
                <SelectItem value="option2">Opcja 2</SelectItem>
                <SelectItem value="option3">Opcja 3</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SelectComponent;
