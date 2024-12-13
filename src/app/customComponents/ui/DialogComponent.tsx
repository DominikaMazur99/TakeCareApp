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
    title: string;
    content: React.ReactNode;
}

const DialogComponent: React.FC<DialogProps> = ({
    open,
    onClose,
    title,
    content,
}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[600px] max-h-[80vh] overflow-auto rounded-lg p-6 bg-white shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4">{content}</div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogComponent;
