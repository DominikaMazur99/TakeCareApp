"use client";

import React from "react";
import Footer from "../../icons/sidebar/FooterIcon.svg";
import ListComponent from "../ui/ListComponent";
import UserCard from "../ui/UserCard";
import { useMenuItems } from "../helpers/data";

const SideBarComponent: React.FC = () => {
    const { menuItems, settingsItems, logoutItems } = useMenuItems();
    return (
        <div className="grid grid-rows-[80%_20%] h-[calc(100vh-110px)]">
            <div className="bg-white shadow-md p-6 rounded-md overflow-auto">
                <div>
                    <UserCard
                        name={"Joe Doe"}
                        job={"Operator"}
                        email={"joe@doe.pl"}
                    />
                    <div className="my-2 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={menuItems} />
                    <div className="my-2 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={settingsItems} />
                    <div className="my-2 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={logoutItems} />
                </div>
            </div>
            <div className=" py-3 flex items-center justify-center ">
                <Footer />
            </div>
        </div>
    );
};

export default SideBarComponent;
