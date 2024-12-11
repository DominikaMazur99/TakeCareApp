"use client";

import HomeVisitForm from "@/app/customComponents/forms/HomeVisitForm";
import AccordionComponent from "@/app/customComponents/ui/AccordionComponent";
import React, { useState } from "react";

const HomePage: React.FC = () => {
    const baseFields = [
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

    const patientFields = [
        { fieldId: "country", fieldLabel: "Kraj" },
        { fieldId: "age", fieldLabel: "Wiek pacjenta" },
        { fieldId: "pacient", fieldLabel: "Dane pacjenta" },
        { fieldId: "symptoms", fieldLabel: "Objawy" },
        { fieldId: "adress", fieldLabel: "Dane adresowe" },
    ];

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

    const toRoman = (num: string | number): string => {
        const romanMap: [string, number][] = [
            ["M", 1000],
            ["CM", 900],
            ["D", 500],
            ["CD", 400],
            ["C", 100],
            ["XC", 90],
            ["L", 50],
            ["XL", 40],
            ["X", 10],
            ["IX", 9],
            ["V", 5],
            ["IV", 4],
            ["I", 1],
        ];

        // Upewnij się, że `num` jest liczbą
        let number = typeof num === "string" ? parseInt(num, 10) : num;

        let roman = "";
        for (const [letter, value] of romanMap) {
            while (number >= value) {
                // TypeScript teraz jest pewien, że `number` jest liczbą
                roman += letter;
                number -= value;
            }
        }
        return roman;
    };
    // Generowanie danych do Accordion
    const accordionData = [
        ...baseFields.map((section) => ({
            title: section.sectionTitle,
            subItems: section.fields.map((field) => ({
                title: field.fieldLabel,
                targetId: field.fieldId,
            })),
        })),
        ...patients.map((patient, index) => ({
            title: `Pacjent ${toRoman(index + 1)}`,
            subItems: patient.fields
                .filter((field) => !(index > 0 && field.fieldId === "adress")) // Usuwamy "Dane adresowe" dla index > 0
                .map((field) => ({
                    title: field.fieldLabel,
                    targetId: `pacients-${index}-${field.fieldId}`,
                })),
        })),
    ];
    console.log(patients);
    // Funkcja konwertująca liczbę na liczbę rzymską

    return (
        <div className="grid grid-rows-[auto,1fr]">
            <div className="grid grid-cols-[3fr,1fr] gap-4 bg-[#E4E5E7] overflow-hidden h-full">
                <div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#112950] text-[40px] font-[300]">
                            Umawianie wizyty
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
