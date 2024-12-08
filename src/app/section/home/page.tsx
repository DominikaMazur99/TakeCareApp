import HomeVisitForm from "@/app/customComponents/forms/HomeVisitForm";
import Breadcrumbs from "@/app/customComponents/ui/Breadcrubms";
import React from "react";

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <h1 className="text-[#112950] text-[40px] font-[300]">
                    Umawianie wizyty
                </h1>
            </div>

            <HomeVisitForm />
        </div>
    );
};

export default HomePage;
