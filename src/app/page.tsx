import NavbarComponent from "./customComponents/bars/NavbarComonent";
import SideBarComponent from "./customComponents/bars/SideBarComponent";

export default function Home() {
    return (
        <div className="w-screen h-screen overflow-hidden grid grid-rows-[auto,1fr]">
            <NavbarComponent />
            <div className="grid grid-cols-[20%,60%,20%] p-8 bg-[#E4E5E7]">
                <SideBarComponent />
                <div>strona glowna</div>
                <div>3</div>
            </div>
        </div>
    );
}
