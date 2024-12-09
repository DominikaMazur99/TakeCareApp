"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccordionComponentProps {
    data: Array<{
        title: string;
        subItems?: Array<{
            title: string;
            targetId?: string; // ID of the element to scroll to
        }>; // Subitems representing fields in a section
    }>;
    className?: string;
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({
    data,
    className = "",
}) => {
    const handleScrollTo = (targetId?: string) => {
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    };

    return (
        <AccordionPrimitive.Root
            type="multiple" // Allows multiple sections to be expanded at the same time
            className={cn(
                "w-full min-w-[190px] bg-white rounded-md shadow-md p-1",
                className
            )}
        >
            <AccordionPrimitive.Item
                value="main"
                className="border-b last:border-none"
            >
                <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                        className={cn(
                            "flex flex-1 items-center justify-between py-4 px-4 text-sm font-[500] transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
                            "data-[state=open]:text-blue-600 data-[state=open]:[&>svg]:text-blue-600"
                        )}
                    >
                        Przejdź do
                        <ChevronDown className="h-4 w-4 shrink-0 text-sm text-[#242628] font-[500] transition-transform duration-200" />
                    </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden text-sm text-[#242628] font-[500] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <AccordionPrimitive.Root
                        type="multiple" // Allows multiple subsections to be expanded at the same time
                        className="pl-4"
                    >
                        {data.map((item, index) => (
                            <AccordionPrimitive.Item
                                key={index}
                                value={item.title}
                                className="border-b last:border-none"
                            >
                                <AccordionPrimitive.Header className="flex">
                                    <AccordionPrimitive.Trigger
                                        className={cn(
                                            "flex flex-1 items-center justify-between py-4 px-4 text-sm text-[#242628] font-[500] transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180"
                                        )}
                                    >
                                        {item.title}
                                        <ChevronDown className="h-4 w-4 shrink-0 text-sm text-[#242628] font-[500] transition-transform duration-200" />
                                    </AccordionPrimitive.Trigger>
                                </AccordionPrimitive.Header>
                                {item.subItems && (
                                    <AccordionPrimitive.Content className="overflow-hidden text-sm text-[#242628] font-[500] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                        <ul className="py-1 px-4 text-sm text-[#242628] font-[500] space-y-2">
                                            {item.subItems.map(
                                                (subItem, subIndex) => (
                                                    <li key={subIndex}>
                                                        <button
                                                            className="text-left"
                                                            onClick={() =>
                                                                handleScrollTo(
                                                                    subItem.targetId
                                                                )
                                                            }
                                                        >
                                                            {subItem.title}
                                                        </button>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </AccordionPrimitive.Content>
                                )}
                            </AccordionPrimitive.Item>
                        ))}
                    </AccordionPrimitive.Root>
                </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
        </AccordionPrimitive.Root>
    );
};

export default AccordionComponent;
