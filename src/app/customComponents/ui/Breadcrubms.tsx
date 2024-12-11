"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useMenuItems } from "../helpers/data";

const Breadcrumbs: React.FC = () => {
    const { menuItems, settingsItems, logoutItems } = useMenuItems();
    const pathname = usePathname();

    const breadcrumbs =
        pathname &&
        pathname
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
    const selectedOption =
        breadcrumbs &&
        breadcrumbs[0]?.path &&
        allOptions.find((el) => el.path === breadcrumbs[0].path);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {selectedOption && (
                    <BreadcrumbItem key={selectedOption.path}>
                        <BreadcrumbLink href={selectedOption.path}>
                            {selectedOption.name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
