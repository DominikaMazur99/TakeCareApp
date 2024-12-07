"use client";

import React from "react";
import { useSidebar } from "@/hooks/SidebarContext";

const MainContentComponent: React.FC = () => {
    const { selectedSection } = useSidebar();

    return (
        <div className="flex-1 p-8">
            {selectedSection === "Strona główna" && (
                <div>To jest strona główna</div>
            )}
            {selectedSection === "Wizyty online" && (
                <div>To są wizyty online</div>
            )}
            {selectedSection === "Wizyty domowe" && (
                <div>To są wizyty domowe</div>
            )}
            {selectedSection === "Wizyty stacjonarne" && (
                <div>To są wizyty stacjonarne</div>
            )}
            {selectedSection === "Druga opinia" && (
                <div>To jest druga opinia</div>
            )}
            {selectedSection === "Dziennik aktywności" && (
                <div>To jest dziennik aktywności</div>
            )}
            {selectedSection === "Kalendarz specjalistów" && (
                <div>To jest kalendarz specjalistów</div>
            )}
            {selectedSection === "Raporty" && <div>To są raporty</div>}
            {selectedSection === "Ustawienia" && <div>To są ustawienia</div>}
            {selectedSection === "FAQ" && <div>To jest FAQ</div>}
            {selectedSection === "Wyloguj się" && <div>Wylogowano</div>}
        </div>
    );
};

export default MainContentComponent;
