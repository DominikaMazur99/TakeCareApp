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
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    variant,
    name,
    icon,
}) => {
    return (
        <Button
            variant={variant}
            icon={icon}
            className="break-words min-w-[100px] max-w-full text-center"
        >
            {name}
        </Button>
    );
};

export default ButtonComponent;
