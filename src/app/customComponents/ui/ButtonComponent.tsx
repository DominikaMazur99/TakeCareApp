import React from "react";
import { Button } from "@/components/ui/button";

interface ButtonComponentProps {
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | null
        | undefined
        | "error"
        | "basic"
        | "calendar";
    name: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    variant,
    name,
    icon,
    onClick,
}) => {
    return (
        <Button
            onClick={onClick}
            variant={variant}
            icon={icon}
            className="break-words min-w-[100px] max-w-full text-center"
        >
            {name}
        </Button>
    );
};

export default ButtonComponent;
