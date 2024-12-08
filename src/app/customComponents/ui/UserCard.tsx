import React from "react";
import Avatar from "../../icons/sidebar/AvatarIcon.svg";

interface UserCardProps {
    name: string;
    job: string;
    email: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, job, email }) => {
    return (
        <div className="flex flex-col gap-1">
            <Avatar />
            <p className="text-hight text-header text-[#1A3F7A]">{name}</p>
            <div className="flex flex-col gap-0">
                <span className="font-base font-small text-textHover leading-6">
                    {job}
                </span>
                <span className="font-base font-small text-textHover leading-6">
                    {email}
                </span>
            </div>
        </div>
    );
};

export default UserCard;
