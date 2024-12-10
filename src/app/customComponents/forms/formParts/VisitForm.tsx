import React, { useEffect, useState } from "react";
import InputComponent from "../fields/InputComponent";
import { fetchOptionsFromAPI } from "@/app/helpers/api";
import TextareaComponent from "../fields/TextareaComponent";
import DatePickerComponent from "../fields/DatePickerComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import dynamic from "next/dynamic";
import { useSidebar } from "@/hooks/SidebarContext";
import SelectComponent from "../fields/SelectComponent";

const VisitForm: React.FC = () => {
    const { options, loading } = useSidebar();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ustaw flagę po załadowaniu klienta
    }, []);

    if (!isClient) return null; // Zatrzymaj renderowanie na serwerze

    return (
        <div id="visit-section" className="flex flex-col gap-6">
            <h3 className="text-[24px] text-textLabel font-small">Wizyta</h3>
            <InputComponent
                id="number-of-issue"
                name="numberOfIssue"
                label="Numer zgłoszenia"
                placeholder="Wpisz numer zgłoszenia"
                rules={{ required: "Pole wymagane." }}
            />
            {isClient && (
                <>
                    <SelectComponent
                        key="visit-type"
                        id="visit-type"
                        name="Visit Type"
                        label="Rodzaj wizyty"
                        rules={{ required: "Pole wymagane." }}
                        options={options.visits || []}
                    />
                    <SelectComponent
                        key="specialization"
                        id="specialization"
                        name="Specialization"
                        label="Specjalizacja"
                        placeholder="Wybierz z listy"
                        rules={{ required: "Pole wymagane." }}
                        options={options.specializations || []}
                    />
                </>
            )}

            <DatePickerComponent
                name="Visit Date"
                label="Data wizyty"
                placeholder="Data wizyty"
                rules={{ required: "Pole wymagane." }}
            />
            <CheckboxComponent
                name="hoursrange"
                label="Wybierz konkretny przedział godzinowy"
            />
            <div>
                <label className="text-base text-textLabel font-hight">
                    Godzina
                </label>
                <div className="flex items-center gap-4 w-full">
                    {isClient && (
                        <>
                            <div className="w-1/2">
                                <SelectComponent
                                    key="from"
                                    id="from"
                                    name="From"
                                    placeholder="Od"
                                    options={options.hours || []}
                                />
                            </div>
                            <div className="w-1/2">
                                <SelectComponent
                                    key="to"
                                    id="to"
                                    name="To"
                                    placeholder="Do"
                                    options={options.hours || []}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            {isClient && (
                <SelectComponent
                    key="topic"
                    id="topic"
                    name="Topic"
                    label="Temat"
                    placeholder="Wybierz z listy"
                    options={options.topics || []}
                />
            )}
            <TextareaComponent
                id="additional"
                name="Additional Information"
                label="Dodatkowe informacje (opcjonalnie)"
                placeholder="Opisz problem"
            />
            {isClient && (
                <SelectComponent
                    key="language"
                    id="language"
                    name="Language"
                    label="Język wizyty"
                    placeholder="Wybierz z listy"
                    rules={{ required: "Pole wymagane." }}
                    options={options.languages || []}
                />
            )}
        </div>
    );
};

export default VisitForm;
