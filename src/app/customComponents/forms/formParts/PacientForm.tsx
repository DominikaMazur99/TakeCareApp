import React, { useEffect } from "react";
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
import { peselToDate } from "../../helpers/helpers";

interface PacientFormProps {
    index: number;
}

const PacientForm: React.FC<PacientFormProps> = ({ index }) => {
    const { options } = useSidebar();
    const { watch, setValue, trigger } = useFormContext();
    const documentType = watch(`pacients.${index}.document`);
    const peselValue = watch(`pacients.${index}.pesel`);
    const birthDate = watch(`pacients.${index}.birthDate`);
    const secondAddress = watch(`pacients.${index}.difadress`);

    useEffect(() => {
        if (peselValue) {
            try {
                const derivedBirthDate = peselToDate(peselValue);
                setValue(
                    `pacients.${index}.birthDate`,
                    format(derivedBirthDate, "yyyy-MM-dd")
                );
                trigger(`pacients.${index}.birthDate`); // Trigger validation on sync
            } catch {
                setValue(`pacients.${index}.birthDate`, ""); // Clear if invalid
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
            />
            <div>
                <label className="block text-base text-textLabel font-hight mb-2">
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
            />
            {documentType === "passport" ? (
                <InputComponent
                    id={`pacients-${index}-passport`}
                    name={`pacients.${index}.passport`}
                    placeholder="Wpisz numer paszportu"
                />
            ) : (
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent
                            id={`pacients-${index}-pesel`}
                            name={`pacients.${index}.pesel`}
                            placeholder="Wpisz numer PESEL"
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
                        <label className="block text-base text-textLabel font-hight mb-2">
                            Dane adresowe
                        </label>
                        <SelectComponent
                            id={`pacients-${index}-country`}
                            name={`pacients.${index}.country`}
                            placeholder="Kraj"
                            options={options.countries || []}
                        />
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-1/2">
                                <InputComponent
                                    id={`pacients-${index}-street`}
                                    name={`pacients.${index}.street`}
                                    placeholder="Ulica"
                                />
                            </div>
                            <div className="w-1/2">
                                {" "}
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
                    <label className="block text-base text-textLabel font-hight mb-2">
                        Dane adresowe (2)
                    </label>
                    <SelectComponent
                        id={`pacients-${index}-country-2`}
                        name={`pacients.${index}.secondCountry`}
                        placeholder="Kraj"
                        options={options.countries || []}
                    />
                    <div className="flex items-center gap-4 w-full">
                        <InputComponent
                            id={`pacients-${index}-street-2`}
                            name={`pacients.${index}.secondStreet`}
                            placeholder="Ulica"
                        />
                        <InputComponent
                            id={`pacients-${index}-local-2`}
                            name={`pacients.${index}.secondLocal`}
                            placeholder="Numer lokalu"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PacientForm;
