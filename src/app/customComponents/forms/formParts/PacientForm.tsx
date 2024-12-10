"use client";

import React from "react";
import InputComponent from "../fields/InputComponent";
import RadioButtonsComponent from "../fields/RadioButtonsComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import RadioButtonsInOne from "../fields/RadioButtonsInOne";
import { useFormContext } from "react-hook-form";
import { useSidebar } from "@/hooks/SidebarContext";
import MultiSelectComponent from "../fields/MultiselectComponent";
import SelectComponent from "../fields/SelectComponent";

interface PacientFormProps {
    index: number; // Indeks formularza pacjenta w tablicy
}

const PacientForm: React.FC<PacientFormProps> = ({ index }) => {
    const { options, loading } = useSidebar();
    const { watch } = useFormContext();
    const documentType = watch(`pacients.${index}.document`);
    const secondAdress = watch(`pacients.${index}.difadress`);

    if (loading) {
        return <p>Ładowanie danych...</p>;
    }

    return (
        <div id={`patient-section-${index}`} className="flex flex-col gap-6">
            <h3 className="text-[24px] text-[#112950] font-[300]">
                Pacjent {index + 1}
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
                        required: "Numer dowodu osobistego jest wymagany.",
                        pattern: {
                            value: /^[A-Z]{3}[0-9]{6}$/,
                            message:
                                "Numer dowodu osobistego musi składać się z 3 wielkich liter i 6 cyfr (np. ABC123456).",
                        },
                        validate: {
                            checksum: (value: string) => {
                                if (!/^[A-Z]{3}[0-9]{6}$/.test(value)) {
                                    return false; // Jeśli format jest niepoprawny, odrzucamy.
                                }

                                // Walidacja sumy kontrolnej dla dowodu osobistego
                                const weights = [7, 3, 1, 7, 3, 1, 7, 3, 1];
                                const characters = value.split("");

                                const sum = characters.reduce(
                                    (acc, char, index) => {
                                        const charValue =
                                            index < 3 // Pierwsze trzy znaki to litery
                                                ? char.charCodeAt(0) - 55 // Konwertujemy litery na wartości numeryczne (A=10, B=11, ..., Z=35)
                                                : parseInt(char, 10); // Kolejne znaki to cyfry

                                        return acc + weights[index] * charValue;
                                    },
                                    0
                                );

                                return sum % 10 === 0
                                    ? true
                                    : "Numer dowodu osobistego ma nieprawidłową sumę kontrolną.";
                            },
                        },
                    }}
                />
            ) : (
                <InputComponent
                    id={`pacients-${index}-pesel`}
                    name={`pacients.${index}.pesel`}
                    placeholder="Wpisz numer PESEL"
                    rules={{
                        required: "Numer PESEL jest wymagany.",
                        pattern: {
                            value: /^[0-9]{11}$/,
                            message: "Numer PESEL musi składać się z 11 cyfr.",
                        },
                        validate: {
                            checksum: (value: string) => {
                                if (!/^[0-9]{11}$/.test(value)) {
                                    return false;
                                }

                                const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
                                const sum = weights.reduce(
                                    (acc, weight, index) =>
                                        acc + weight * parseInt(value[index]),
                                    0
                                );
                                const checksum = (10 - (sum % 10)) % 10;

                                return checksum === parseInt(value[10])
                                    ? true
                                    : "Numer PESEL ma nieprawidłową sumę kontrolną.";
                            },
                        },
                    }}
                />
            )}
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
            {secondAdress && (
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
