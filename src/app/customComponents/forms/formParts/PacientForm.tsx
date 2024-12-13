"use client";

import React, { useEffect, useState } from "react";
import InputComponent from "../fields/InputComponent";
import RadioButtonsComponent from "../fields/RadioButtonsComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import RadioButtonsInOne from "../fields/RadioButtonsInOne";
import { useFormContext } from "react-hook-form";
import { useSidebar } from "@/hooks/SidebarContext";
import MultiSelectComponent from "../fields/MultiselectComponent";
import SelectComponent from "../fields/SelectComponent";
import DatePickerComponent from "../fields/DatePickerComponent";
import { format } from "date-fns";
import { peselToDate, toRoman } from "../../helpers/helpers";
import { useTranslation } from "react-i18next";

interface PacientFormProps {
    index: number;
}

const PacientForm: React.FC<PacientFormProps> = ({ index }) => {
    const { t } = useTranslation();
    const { options } = useSidebar();
    const { watch, setValue, trigger } = useFormContext();
    const documentType = watch(`pacients.${index}.document`);
    const peselValue = watch(`pacients.${index}.pesel`);
    const birthDate = watch(`pacients.${index}.birthDate`);
    const secondAddress = watch(`difadress`);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (peselValue) {
            try {
                const derivedBirthDate = peselToDate(peselValue);
                setValue(
                    `pacients.${index}.birthDate`,
                    format(derivedBirthDate, "yyyy-MM-dd")
                );
                trigger(`pacients.${index}.birthDate`);
            } catch {
                setValue(`pacients.${index}.birthDate`, "");
            }
        }
    }, [peselValue, setValue, index, trigger]);

    useEffect(() => {
        if (birthDate) {
            const birthYear = new Date(birthDate).getFullYear();
            const currentYear = new Date().getFullYear();
            const calculatedAge = currentYear - birthYear;
            setValue(
                `pacients.${index}.age`,
                calculatedAge >= 18 ? "adult" : "child"
            );
        }
    }, [birthDate, setValue, index]);

    if (!isClient) return null;

    return (
        <div id={`patient-section-${index}`} className="flex flex-col gap-6">
            <h3 className="text-[24px] text-[#112950] font-[300]">
                {index === 0
                    ? t("patient.patient")
                    : `${t("patient.patient")} ${toRoman(index + 1)}`}
            </h3>
            <div id={`pacients-${index}-age`}>
                <RadioButtonsComponent
                    name={`pacients.${index}.age`}
                    label={t("patient.age")}
                    options={[
                        { label: t("patient.adult"), value: "adult" },
                        { label: t("patient.child"), value: "child" },
                    ]}
                />
            </div>
            <div>
                <label
                    className="block text-base text-textLabel font-hight mb-2"
                    id={`pacients-${index}-pacient`}
                >
                    {t("patient.details")}
                </label>
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent
                            id={`pacients-${index}-name`}
                            name={`pacients.${index}.name`}
                            placeholder={t("patient.name")}
                        />
                    </div>
                    <div className="w-1/2">
                        <InputComponent
                            id={`pacients-${index}-surname`}
                            name={`pacients.${index}.surname`}
                            placeholder={t("patient.surname")}
                        />
                    </div>
                </div>
            </div>
            {isClient && (
                <MultiSelectComponent
                    id={`pacients-${index}-symptoms`}
                    name={`pacients.${index}.symptoms`}
                    label={t("patient.symptoms.label")}
                    options={options.symptoms || []}
                    value={watch(`pacients.${index}.symptoms`)} // Przypisujemy obecne label
                    onChange={
                        (selectedLabels) =>
                            setValue(
                                `pacients.${index}.symptoms`,
                                selectedLabels
                            ) // Zapisujemy wybrane label
                    }
                />
            )}

            <RadioButtonsInOne
                name={`pacients.${index}.document`}
                label={t("document.type")}
                options={[
                    { label: t("document.pesel"), value: "pesel" },
                    { label: t("document.passport"), value: "passport" },
                ]}
            />
            {documentType === "passport" ? (
                <InputComponent
                    id={`pacients-${index}-passport`}
                    name={`pacients.${index}.passport`}
                    placeholder={t("patient.passport.placeholder")}
                />
            ) : (
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent
                            id={`pacients-${index}-pesel`}
                            name={`pacients.${index}.pesel`}
                            placeholder={t("patient.pesel.placeholder")}
                        />
                    </div>
                    <div className="w-1/2">
                        <DatePickerComponent
                            name={`pacients.${index}.birthDate`}
                            placeholder={t("patient.birthdate.placeholder")}
                        />
                    </div>
                </div>
            )}
            {index === 0 && (
                <>
                    <div>
                        <label
                            className="block text-base text-textLabel font-hight mb-2"
                            id={`pacients-${index}-adress`}
                        >
                            {t("visit.address.label")}
                        </label>
                        {isClient && (
                            <SelectComponent
                                id={`visit-country`}
                                name={`country`}
                                placeholder={t("patient.country")}
                                options={options.countries || []}
                            />
                        )}
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-1/2">
                                <InputComponent
                                    id={`visit-street`}
                                    name={`street`}
                                    placeholder={t(
                                        "patient.street.placeholder"
                                    )}
                                />
                            </div>
                            <div className="w-1/2">
                                <InputComponent
                                    id={`visit-local`}
                                    name={`local`}
                                    placeholder={t("patient.local.placeholder")}
                                />
                            </div>
                        </div>
                    </div>
                    <CheckboxComponent
                        name={`difadress`}
                        label={t("visit.differentAddress.label")}
                    />
                </>
            )}
            {secondAddress && index === 0 && (
                <div>
                    <label className="block text-base text-textLabel font-hight mb-2">
                        {t("visit.address2.label")}
                    </label>
                    {isClient && (
                        <SelectComponent
                            id={`visit-country-2`}
                            name={`visit.secondCountry`}
                            placeholder={t("patient.country")}
                            options={options.countries || []}
                        />
                    )}
                    <div className="flex items-center gap-4 w-full">
                        <InputComponent
                            id={`visit-street-2`}
                            name={`secondStreet`}
                            placeholder={t("patient.street.placeholder")}
                        />
                        <InputComponent
                            id={`visit-local-2`}
                            name={`secondLocal`}
                            placeholder={t("patient.local.placeholder")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PacientForm;
