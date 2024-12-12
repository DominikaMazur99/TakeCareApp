"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    content?: React.ReactNode;
}

const DialogComponent: React.FC<DialogProps> = ({
    open,
    onClose,
    title,
    content,
}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="fixed inset-0 flex items-center justify-center z-50 bg-white border border-gray-300 rounded-lg shadow-lg max-w-md w-full p-6"
                style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div className="w-full text-center">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    {content}
                    {/* <ul className="mt-6 space-y-4">
                        {options.map((option) => (
                            <li key={option.path}>
                                <button
                                    onClick={() =>
                                        navigateToSection(option.path)
                                    }
                                    className="w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all"
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogComponent;
