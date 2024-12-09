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

export const fieldsToAccordion = [
    {
        sectionId: "visit-section",
        sectionTitle: "Wizyta",
        fields: [
            {
                fieldId: "number-of-issue",
                fieldLabel: "Numer zgłoszenia",
                fieldType: "text",
            },
            {
                fieldId: "visit-type",
                fieldLabel: "Rodzaj wizyty",
                fieldType: "select",
            },
            {
                fieldId: "specialization",
                fieldLabel: "Specjalizacja",
                fieldType: "select",
            },
            {
                fieldId: "visit-date",
                fieldLabel: "Data wizyty",
                fieldType: "date",
            },

            {
                fieldId: "topic",
                fieldLabel: "Temat",
                fieldType: "select",
            },
            {
                fieldId: "additional",
                fieldLabel: "Dodatkowe informacje",
                fieldType: "textarea",
            },
            {
                fieldId: "code",
                fieldLabel: "Kod rabatowy",
                fieldType: "checkbox",
            },
        ],
    },
    {
        sectionId: "patient-section",
        sectionTitle: "Pacjent",
        fields: [
            {
                fieldId: "country",
                fieldLabel: "Kraj",
                fieldType: "select",
            },
            {
                fieldId: "age",
                fieldLabel: "Wiek pacjenta",
                fieldType: "radio",
            },
            {
                fieldId: "pacient-date",
                fieldLabel: "Dane pacjenta",
                fieldType: "text",
            },
            {
                fieldId: "symptoms",
                fieldLabel: "Objawy",
                fieldType: "select",
            },
            {
                fieldId: "document",
                fieldLabel: "Dokument",
                fieldType: "radio",
            },
            {
                fieldId: "adress-date",
                fieldLabel: "Dane adresowe",
                fieldType: "text",
            },
        ],
    },
];
