"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Breadcrumbs: React.FC = () => {
    const pathname = usePathname(); // Uzyskaj aktualną ścieżkę

    // Tworzenie breadcrumbs na podstawie ścieżki
    const breadcrumbs = pathname
        .split("/")
        .filter(Boolean)
        .map((crumb, index) => ({
            name: crumb,
            path: `/${pathname
                .split("/")
                .slice(1, index + 2)
                .join("/")}`,
        }));

    return (
        <nav aria-label="breadcrumbs">
            <ol className="flex space-x-2">
                {breadcrumbs.map((crumb, index) => (
                    <li key={index}>
                        <a
                            href={crumb.path}
                            className="text-blue-500 hover:underline"
                        >
                            {crumb.name}
                        </a>
                        {index < breadcrumbs.length - 1 && (
                            <span className="px-2">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
