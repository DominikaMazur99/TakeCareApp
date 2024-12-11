import NavbarComponent from "../customComponents/bars/NavbarComonent";
import SideBarComponent from "../customComponents/bars/SideBarComponent";
import Breadcrumbs from "../customComponents/ui/Breadcrubms";

export default function SectionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-screen h-screen grid grid-rows-[auto,1fr]">
            <NavbarComponent />
            <div className="grid grid-cols-[1fr,4fr] gap-4 bg-[#E4E5E7] overflow-hidden h-full">
                <div className="pl-8 pt-8">
                    <SideBarComponent />
                </div>
                <div className="w-full items-center h-full overflow-auto pr-8">
                    <div className="py-8">
                        <Breadcrumbs />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
