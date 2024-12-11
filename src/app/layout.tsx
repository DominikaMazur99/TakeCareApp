"use client";

import { SidebarProvider } from "@/hooks/SidebarContext";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <SidebarProvider>
                    <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
                </SidebarProvider>
            </body>
        </html>
    );
}
