import { useSidebar } from "@/hooks/SidebarContext";
import React, { ReactElement } from "react";
import Link from "next/link";

interface Element {
    name: string;
    icon: ReactElement<{ selected?: boolean }>; // Dodajemy prop `selected` do typowania ikon
    path: string; // Dodajemy pole `path` do elementu
}

interface ListComponentProps {
    elements: Element[];
}

const ListComponent: React.FC<ListComponentProps> = ({ elements }) => {
    const { selectedSection, setSelectedSection } = useSidebar();

    return (
        <ul className="text-textBase text-base font-medium space-y-4">
            {elements.map((item) => (
                <li key={item.name}>
                    <Link href={item.path}>
                        <div
                            className={`flex items-center gap-2 cursor-pointer rounded-md transition-colors duration-200${
                                selectedSection === item.name
                                    ? "text-[#0068FA]"
                                    : "text-gray-700"
                            }`}
                            onClick={() => setSelectedSection(item.name)}
                        >
                            <span className="w-6 h-6 flex-shrink-0">
                                {React.cloneElement(item.icon, {
                                    selected: selectedSection === item.name,
                                })}
                            </span>
                            <span className="text-sm font-medium">
                                {item.name}
                            </span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ListComponent;
