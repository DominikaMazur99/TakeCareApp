"use client";

import React from "react";
import Footer from "../../icons/sidebar/FooterIcon.svg";
import ListComponent from "../ui/ListComponent";
import UserCard from "../ui/UserCard";
import { logoutItems, menuItems, settingsItems } from "../helpers/data";

const SideBarComponent: React.FC = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-150px)]">
            <div className="flex-1 flex flex-col justify-between bg-white shadow-md p-6 rounded-md overflow-auto">
                <div>
                    <UserCard
                        name={"Joe Doe"}
                        job={"Operator"}
                        email={"joe@doe.pl"}
                    />
                    <div className="my-4 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={menuItems} />
                    <div className="my-4 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={settingsItems} />
                    <div className="my-4 h-px bg-gray-300"></div>
                </div>
                <div>
                    <ListComponent elements={logoutItems} />
                </div>
            </div>
            <div className="flex-shrink-0 py-4">
                <Footer />
            </div>
        </div>
    );
};

export default SideBarComponent;
