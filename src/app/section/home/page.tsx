"use client";

import HomeVisitForm from "@/app/customComponents/forms/HomeVisitForm";
import { useFields } from "@/app/customComponents/helpers/data";
import { toRoman } from "@/app/customComponents/helpers/helpers";
import AccordionComponent from "@/app/customComponents/ui/AccordionComponent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const { baseFields, patientFields } = useFields();
    const [patients, setPatients] = useState([
        { id: 0, fields: patientFields },
    ]);

    // Funkcja dodająca nowego pacjenta
    const addNewPatient = () => {
        setPatients((prev) => [
            ...prev,
            {
                id: prev.length,
                fields: patientFields.filter(
                    (field) => field.fieldId !== "adress"
                ),
            },
        ]);
    };

    const accordionData = [
        ...baseFields.map((section) => ({
            title: t(section.sectionTitle),
            subItems: section.fields.map((field) => ({
                title: t(field.fieldLabel),
                targetId: field.fieldId,
            })),
        })),
        ...patients.map((patient, index) => ({
            title: `${t("patient.patient")} ${toRoman(index + 1)}`,
            subItems: patient.fields
                .filter((field) => !(index > 0 && field.fieldId === "adress")) // Usuwamy "Dane adresowe" dla index > 0
                .map((field) => ({
                    title: t(field.fieldLabel),
                    targetId: `pacients-${index}-${field.fieldId}`,
                })),
        })),
    ];

    return (
        <div className="grid grid-rows-[auto,1fr]">
            <div className="grid grid-cols-[3fr,1fr] gap-4 bg-[#E4E5E7] overflow-hidden h-full">
                <div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#112950] text-[40px] font-[300]">
                            {t("form.header.book")}
                        </h1>
                        <HomeVisitForm updateAccordion={addNewPatient} />
                    </div>
                </div>
                <div>
                    <AccordionComponent data={accordionData} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
