"use client";

import { useSidebar } from "@/hooks/SidebarContext";
import NavbarComponent from "./customComponents/bars/NavbarComonent";
import SideBarComponent from "./customComponents/bars/SideBarComponent";
import Breadcrumbs from "./customComponents/ui/Breadcrubms";
import DialogComponent from "./customComponents/ui/DialogComponent";

export default function Home() {
    const { bookVisit, handleBookVisit } = useSidebar();

    return (
        <>
            <div className="w-screen h-screen overflow-hidden grid grid-rows-[auto,1fr]">
                <NavbarComponent />
                <div className="grid grid-cols-[1fr,3fr,1fr] gap-4 bg-[#E4E5E7] overflow-hidden h-full">
                    <div className="p-8">
                        <SideBarComponent />
                    </div>
                    <div className="w-full px-8 items-center h-full overflow-auto">
                        <div className="py-8">
                            <Breadcrumbs />
                        </div>
                    </div>
                    <div className="p-8"></div>
                </div>
            </div>
            <DialogComponent
                open={bookVisit}
                onClose={() => handleBookVisit(false)}
            />
        </>
    );
}
