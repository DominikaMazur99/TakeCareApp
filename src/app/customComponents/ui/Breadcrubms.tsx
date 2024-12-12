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
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";

const Breadcrumbs: React.FC = () => {
    const { t } = useTranslation();
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
                            {breadcrumbs[0].name ===
                            ("home" || "online" || "stacionary") ? (
                                <>
                                    {selectedOption.name}
                                    <ChevronRight className="mx-1 h-4 w-4 text-gray-400 inline-block" />
                                    {t("form.header.book")}
                                </>
                            ) : (
                                selectedOption.name
                            )}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
