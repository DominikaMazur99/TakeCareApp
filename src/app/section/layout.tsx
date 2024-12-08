import NavbarComponent from "../customComponents/bars/NavbarComonent";
import SideBarComponent from "../customComponents/bars/SideBarComponent";

export default function SectionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-screen h-screen overflow-hidden grid grid-rows-[auto,1fr]">
            <NavbarComponent />
            <div className="grid grid-cols-[20%,60%,20%] p-8 bg-[#E4E5E7]">
                <SideBarComponent />
                <div className="w-full px-8 items-center">{children}</div>
                <div>3</div>
            </div>
        </div>
    );
}
