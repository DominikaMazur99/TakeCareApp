import { IconName } from "../../icons/sidebar/index";
import { useTranslation } from "react-i18next";

export const useMenuItems = () => {
    const { t } = useTranslation();

    const menuItems: { name: string; icon: IconName; path: string }[] = [
        { name: t("menu.home"), icon: "HomeIcon", path: "/" },
        {
            name: t("menu.online"),
            icon: "HeadphonesIcon",
            path: "/section/online",
        },
        {
            name: t("menu.homeVisits"),
            icon: "HospitalIcon",
            path: "/section/home",
        },
        {
            name: t("menu.stationary"),
            icon: "BagIcon",
            path: "/section/stacionary",
        },
        {
            name: t("menu.secondOpinion"),
            icon: "OpinionIcon",
            path: "/section/second",
        },
        {
            name: t("menu.activityLog"),
            icon: "NoteIcon",
            path: "/section/activities",
        },
        {
            name: t("menu.specialistCalendar"),
            icon: "CalenderIcon",
            path: "/section/calendar",
        },
        {
            name: t("menu.reports"),
            icon: "RaportIcon",
            path: "/section/raports",
        },
    ];

    const settingsItems: { name: string; icon: IconName; path: string }[] = [
        {
            name: t("menu.settings"),
            icon: "SettingsIcon",
            path: "/section/settings",
        },
        { name: t("menu.faq"), icon: "FaqIcon", path: "/section/faq" },
    ];

    const logoutItems: { name: string; icon: IconName; path: string }[] = [
        { name: t("menu.logout"), icon: "LogoutIcon", path: "/section/logout" },
    ];

    return { menuItems, settingsItems, logoutItems };
};

export const useFields = () => {
    const { t } = useTranslation();

    const baseFields = [
        {
            sectionId: "visit-section",
            sectionTitle: t("visit.section"),
            fields: [
                { fieldId: "number-of-issue", fieldLabel: t("visit.number") },
                { fieldId: "visit-type", fieldLabel: t("visit.type") },
                {
                    fieldId: "specialization",
                    fieldLabel: t("visit.specialization"),
                },
                { fieldId: "visit-date", fieldLabel: t("visit.date") },
                { fieldId: "topic", fieldLabel: t("visit.topic") },
                {
                    fieldId: "additional",
                    fieldLabel: t("visit.additionalInfo"),
                },
            ],
        },
    ];

    const patientFields = [
        { fieldId: "country", fieldLabel: "patient.country" },
        { fieldId: "age", fieldLabel: "patient.age" },
        { fieldId: "pacient", fieldLabel: "patient.details" },
        { fieldId: "symptoms", fieldLabel: "patient.symptoms" },
        { fieldId: "adress", fieldLabel: "patient.address" },
    ];

    return { baseFields, patientFields };
};
