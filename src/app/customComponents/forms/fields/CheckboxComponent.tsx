"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckboxProps {
    name: string;
    label?: string;
    rules?: object;
    className?: string;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({
    name,
    label,
    rules,
    className = "",
}) => {
    const { control } = useFormContext();

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <CheckboxPrimitive.Root
                        ref={field.ref}
                        checked={field.value}
                        onCheckedChange={(checked) => {
                            field.onChange(checked);
                        }}
                        className={cn(
                            "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                            className
                        )}
                    >
                        <CheckboxPrimitive.Indicator
                            className={cn(
                                "flex items-center justify-center text-current"
                            )}
                        >
                            <Check className="h-4 w-4" />
                        </CheckboxPrimitive.Indicator>
                    </CheckboxPrimitive.Root>
                )}
            />
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default CheckboxComponent;
