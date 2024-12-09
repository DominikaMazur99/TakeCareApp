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
            <div className="grid grid-cols-[1fr,3fr,1fr] gap-4 bg-[#E4E5E7] overflow-hidden h-full">
                <div className="p-8">
                    <SideBarComponent />
                </div>
                <div className="w-full px-8 items-center h-full overflow-auto">
                    <div className="py-8">
                        <Breadcrumbs />
                        {children}
                    </div>
                </div>
                <div>3</div>
            </div>
        </div>
    );
}
