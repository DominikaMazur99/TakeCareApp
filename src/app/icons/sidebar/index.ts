import HomeIcon from "./HomeIcon";
import HeadphonesIcon from "./HeadphonesIcon";
import HospitalIcon from "./HospitalIcon";
import BagIcon from "./BagIcon";
import OpinionIcon from "./OpinionIcon";
import NoteIcon from "./NoteIcon";
import CalenderIcon from "./CalenderIcon";
import RaportIcon from "./RaportIcon";
import SettingsIcon from "./SettingsIcon";
import FaqIcon from "./FaqIcon";
import LogoutIcon from "./LogoutIcon";

export {
    HomeIcon,
    HeadphonesIcon,
    HospitalIcon,
    BagIcon,
    OpinionIcon,
    NoteIcon,
    CalenderIcon,
    RaportIcon,
    SettingsIcon,
    FaqIcon,
    LogoutIcon,
};

export type IconName =
    | "HomeIcon"
    | "HeadphonesIcon"
    | "HospitalIcon"
    | "BagIcon"
    | "OpinionIcon"
    | "NoteIcon"
    | "CalenderIcon"
    | "RaportIcon"
    | "SettingsIcon"
    | "FaqIcon"
    | "LogoutIcon";

export const Icons: Record<IconName, React.FC<{ selected?: boolean }>> = {
    HomeIcon,
    HeadphonesIcon,
    HospitalIcon,
    BagIcon,
    OpinionIcon,
    NoteIcon,
    CalenderIcon,
    RaportIcon,
    SettingsIcon,
    FaqIcon,
    LogoutIcon,
};
