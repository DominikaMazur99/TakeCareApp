import { IconName } from "../../icons/sidebar/index";

export const menuItems: { name: string; icon: IconName; path: string }[] = [
    { name: "Strona główna", icon: "HomeIcon", path: "/" },
    { name: "Wizyty online", icon: "HeadphonesIcon", path: "/section/online" },
    { name: "Wizyty domowe", icon: "HospitalIcon", path: "/section/home" },
    {
        name: "Wizyty stacjonarne",
        icon: "BagIcon",
        path: "/section/stacionary",
    },
    { name: "Druga opinia", icon: "OpinionIcon", path: "/section/second" },
    {
        name: "Dziennik aktywności",
        icon: "NoteIcon",
        path: "/section/activities",
    },
    {
        name: "Kalendarz specjalistów",
        icon: "CalenderIcon",
        path: "/section/calendar",
    },
    { name: "Raporty", icon: "RaportIcon", path: "/section/raports" },
];

export const settingsItems: { name: string; icon: IconName; path: string }[] = [
    { name: "Ustawienia", icon: "SettingsIcon", path: "/section/settings" },
    { name: "FAQ", icon: "FaqIcon", path: "/section/faq" },
];

export const logoutItems: { name: string; icon: IconName; path: string }[] = [
    { name: "Wyloguj się", icon: "LogoutIcon", path: "/section/logout" },
];
