"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    name: string;
    label?: string;
    placeholder?: string;
    rules?: object;
    className?: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
    name,
    label,
    placeholder = "Wybierz datę",
    rules,
    className = "",
}) => {
    const { control } = useFormContext();

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="text-base text-textLabel font-hight"
                >
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"calendar"}
                                className={cn(
                                    "w-full justify-start text-left text-textHover] p-0 placeholder:text-textHover",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                    format(new Date(field.value), "yyyy-MM-dd")
                                ) : (
                                    <span className="text-textHover">
                                        {placeholder}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={
                                    field.value
                                        ? new Date(field.value)
                                        : undefined
                                }
                                onSelect={(selectedDate) => {
                                    field.onChange(selectedDate);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                        {fieldState.error && (
                            <span className="text-sm text-red-500">
                                {fieldState.error.message}
                            </span>
                        )}
                    </Popover>
                )}
            />
        </div>
    );
};

export default DatePickerComponent;
