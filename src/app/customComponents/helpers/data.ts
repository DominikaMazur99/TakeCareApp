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

export const baseFields = [
    {
        sectionId: "visit-section",
        sectionTitle: "Wizyta",
        fields: [
            { fieldId: "number-of-issue", fieldLabel: "Numer zgłoszenia" },
            { fieldId: "visit-type", fieldLabel: "Rodzaj wizyty" },
            { fieldId: "specialization", fieldLabel: "Specjalizacja" },
            { fieldId: "visit-date", fieldLabel: "Data wizyty" },
            { fieldId: "topic", fieldLabel: "Temat" },
            { fieldId: "additional", fieldLabel: "Dodatkowe informacje" },
        ],
    },
];

export const patientFields = [
    { fieldId: "country", fieldLabel: "Kraj" },
    { fieldId: "age", fieldLabel: "Wiek pacjenta" },
    { fieldId: "pacient", fieldLabel: "Dane pacjenta" },
    { fieldId: "symptoms", fieldLabel: "Objawy" },
    { fieldId: "adress", fieldLabel: "Dane adresowe" },
];
