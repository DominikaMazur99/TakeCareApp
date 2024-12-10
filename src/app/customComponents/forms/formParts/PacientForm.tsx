"use client";

import React, { useEffect } from "react";
import InputComponent from "../fields/InputComponent";
import RadioButtonsComponent from "../fields/RadioButtonsComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import RadioButtonsInOne from "../fields/RadioButtonsInOne";
import { useFormContext } from "react-hook-form";
import { useSidebar } from "@/hooks/SidebarContext";
import MultiSelectComponent from "../fields/MultiselectComponent";
import SelectComponent from "../fields/SelectComponent";
import { idCardSchema, peselSchema } from "../../helpers/validators";
import { peselToDate } from "../../helpers/helpers";
import DatePickerComponent from "../fields/DatePickerComponent";
import { format } from "date-fns";

interface PacientFormProps {
    index: number; // Indeks formularza pacjenta w tablicy
}

const PacientForm: React.FC<PacientFormProps> = ({ index }) => {
    const { options, loading } = useSidebar();
    const { watch, setValue } = useFormContext();
    const documentType = watch(`pacients.${index}.document`);
    const peselValue = watch(`pacients.${index}.pesel`);
    const birthDate = watch(`pacients.${index}.birthDate`);
    const secondAddress = watch(`pacients.${index}.difadress`);

    useEffect(() => {
        // Automatically set birth date from PESEL
        if (peselValue && peselSchema.safeParse(peselValue).success) {
            const derivedBirthDate = peselToDate(peselValue);
            setValue(
                `pacients.${index}.birthDate`,
                format(derivedBirthDate, "yyyy-MM-dd")
            );
        }
    }, [peselValue, index, setValue]);

    useEffect(() => {
        // Automatically set age based on birth date
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

    useEffect(() => {
        // Automatically adjust age radio button based on PESEL
        if (peselValue && peselSchema.safeParse(peselValue).success) {
            const derivedBirthDate = peselToDate(peselValue);
            const birthYear = derivedBirthDate.getFullYear();
            const currentYear = new Date().getFullYear();
            const calculatedAge = currentYear - birthYear;
            setValue(
                `pacients.${index}.age`,
                calculatedAge >= 18 ? "adult" : "child"
            );
        }
    }, [peselValue, setValue, index]);

    if (loading) {
        return <p>Ładowanie danych...</p>;
    }

    return (
        <div id={`patient-section-${index}`} className="flex flex-col gap-6">
            <h3 className="text-[24px] text-[#112950] font-[300]">
                {index === 0 ? `Pacjent` : `Pacjent ${index + 1}`}
            </h3>
            <RadioButtonsComponent
                name={`pacients.${index}.age`}
                label="Wiek pacjenta"
                options={[
                    { label: "Dorosły", value: "adult" },
                    { label: "Dziecko", value: "child" },
                ]}
                rules={{
                    required: "Wybór jest wymagany.",
                }}
            />
            <div>
                <label
                    htmlFor={`pacients-${index}-data`}
                    className="block text-base text-textLabel font-hight mb-2"
                >
                    Dane Pacjenta
                </label>
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent
                            id={`pacients-${index}-name`}
                            name={`pacients.${index}.name`}
                            placeholder="Imię"
                        />
                    </div>
                    <div className="w-1/2">
                        <InputComponent
                            id={`pacients-${index}-surname`}
                            name={`pacients.${index}.surname`}
                            placeholder="Nazwisko"
                        />
                    </div>
                </div>
            </div>
            <MultiSelectComponent
                id={`pacients-${index}-symptoms`}
                name={`pacients.${index}.symptoms`}
                label="Objawy"
                options={options.symptoms || []}
            />
            <RadioButtonsInOne
                name={`pacients.${index}.document`}
                label="Dokument"
                options={[
                    { label: "PESEL", value: "pesel" },
                    { label: "Paszport", value: "passport" },
                ]}
                rules={{
                    required: "Wybór jest wymagany.",
                }}
            />
            {documentType === "passport" ? (
                <InputComponent
                    id={`pacients-${index}-passport`}
                    name={`pacients.${index}.passport`}
                    placeholder="Wpisz numer paszportu"
                    rules={{
                        validate: (value: any) => {
                            const validation = idCardSchema.safeParse(value);
                            return (
                                validation.success ||
                                validation.error.errors[0].message
                            );
                        },
                    }}
                />
            ) : (
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent
                            id={`pacients-${index}-pesel`}
                            name={`pacients.${index}.pesel`}
                            placeholder="Wpisz numer PESEL"
                            rules={{
                                validate: (value: any) => {
                                    const validation =
                                        peselSchema.safeParse(value);
                                    return (
                                        validation.success ||
                                        validation.error.errors[0].message
                                    );
                                },
                            }}
                        />
                    </div>
                    <div className="w-1/2">
                        <DatePickerComponent
                            name={`pacients.${index}.birthDate`}
                            placeholder="Data urodzenia"
                        />
                    </div>
                </div>
            )}
            {index === 0 && (
                <>
                    <div>
                        <label
                            htmlFor={`pacients-${index}-address`}
                            className="block text-base text-textLabel font-hight mb-2"
                        >
                            Dane adresowe
                        </label>
                        <div>
                            <SelectComponent
                                id={`pacients-${index}-country`}
                                name={`pacients.${index}.country`}
                                placeholder="Kraj"
                                options={options.countries || []}
                            />
                        </div>
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-1/2">
                                <InputComponent
                                    id={`pacients-${index}-street`}
                                    name={`pacients.${index}.street`}
                                    placeholder="Ulica"
                                />
                            </div>
                            <div className="w-1/2">
                                <InputComponent
                                    id={`pacients-${index}-local`}
                                    name={`pacients.${index}.local`}
                                    placeholder="Numer lokalu"
                                />
                            </div>
                        </div>
                    </div>
                    <CheckboxComponent
                        name={`pacients.${index}.difadress`}
                        label="Wizyta ma się odbyć na inny adres"
                    />
                </>
            )}

            {secondAddress && index === 0 && (
                <div>
                    <label
                        htmlFor={`pacients-${index}-address-2`}
                        className="block text-base text-textLabel font-hight mb-2"
                    >
                        Dane adresowe (2)
                    </label>
                    <div>
                        <SelectComponent
                            id={`pacients-${index}-country-2`}
                            name={`pacients.${index}.secondCountry`}
                            placeholder="Kraj"
                            options={options.countries || []}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-1/2">
                            <InputComponent
                                id={`pacients-${index}-street-2`}
                                name={`pacients.${index}.secondStreet`}
                                placeholder="Ulica"
                            />
                        </div>
                        <div className="w-1/2">
                            <InputComponent
                                id={`pacients-${index}-local-2`}
                                name={`pacients.${index}.secondLocal`}
                                placeholder="Numer lokalu"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PacientForm;
