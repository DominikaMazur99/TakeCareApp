"use client";

import React from "react";
import Link from "next/link";
import { useSidebar } from "@/hooks/SidebarContext";
import { Icons, IconName } from "../../icons/sidebar";

interface Element {
    name: string;
    icon: IconName;
    path: string;
}

interface ListComponentProps {
    elements: Element[];
}

const ListComponent: React.FC<ListComponentProps> = ({ elements }) => {
    const { selectedSection, setSelectedSection } = useSidebar();

    return (
        <ul className="text-textBase text-base font-medium">
            {elements.map((item) => {
                const isSelected =
                    selectedSection === item.path.split("/").pop();

                return (
                    <li key={item.name}>
                        <Link href={item.path}>
                            <div
                                className={`flex items-center gap-2 cursor-pointer rounded-md transition-colors duration-200 ${
                                    isSelected
                                        ? "text-[#0068FA]"
                                        : "text-gray-700"
                                } p-2`}
                                onClick={() =>
                                    setSelectedSection(
                                        item.path.split("/").pop()!
                                    )
                                }
                            >
                                <span className="w-6 h-6 flex-shrink-0">
                                    {React.createElement(Icons[item.icon], {
                                        selected: isSelected,
                                    })}
                                </span>
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ListComponent;
