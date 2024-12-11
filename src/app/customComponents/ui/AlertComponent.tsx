"use client";

import React, { useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

interface AlertProps {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    duration?: number;
    isOpen: boolean;
    onClose: () => void;
}

const AlertComponent: React.FC<AlertProps> = ({
    message,
    type = "info",
    duration = 2000,
    isOpen,
    onClose,
}) => {
    const typeStyles = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    return (
        <Toast.Provider swipeDirection="right">
            <Toast.Root
                className={cn(
                    "fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg transition-all",
                    typeStyles[type],
                    isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                )}
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open) onClose();
                }}
            >
                <Toast.Description>{message}</Toast.Description>
            </Toast.Root>
            <Toast.Viewport className="fixed bottom-0 right-0 z-50 p-4 flex flex-col space-y-2" />
        </Toast.Provider>
    );
};

export default AlertComponent;
