"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { menuItems, logoutItems, settingsItems } from "../helpers/data";

const Breadcrumbs: React.FC = () => {
    const pathname = usePathname();

    const breadcrumbs = pathname
        .split("/")
        .filter(Boolean)
        .map((crumb, index) => ({
            name: crumb,
            path: `/${pathname
                .split("/")
                .slice(1, index + 2)
                .join("/")}`,
        }))
        .filter((el) => el.name !== "section");

    const allOptions = [...menuItems, ...logoutItems, ...settingsItems];
    const selectedOption = allOptions.find(
        (el) => el.path === breadcrumbs[0].path
    );
    console.log(pathname, breadcrumbs, allOptions, selectedOption);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {selectedOption && (
                    <BreadcrumbItem key={selectedOption.path}>
                        <BreadcrumbLink href={selectedOption.path}>
                            {selectedOption.name}
                        </BreadcrumbLink>
                        {/* <BreadcrumbSeparator /> */}
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
