import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputComponent from "../fields/InputComponent";
import SelectComponent from "../fields/SelectComponent";
import TextareaComponent from "../fields/TextareaComponent";
import DatePickerComponent from "../fields/DatePickerComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import { useSidebar } from "@/hooks/SidebarContext";

const VisitForm: React.FC = () => {
    const { options } = useSidebar();
    const [isClient, setIsClient] = useState(false);
    const { watch, setValue } = useFormContext(); // Additional hooks for validation
    const showHoursRange = watch("hoursrange");
    const visitDate = watch("visitDate");
    const fromTime = watch("From");

    useEffect(() => {
        setIsClient(true); // Flag after client load
    }, []);

    // Dynamic hours for "From" and "To"
    const generateFromOptions = () => {
        const currentDate = new Date();
        if (visitDate) {
            const selectedDate = new Date(visitDate);
            if (selectedDate.toDateString() === currentDate.toDateString()) {
                const currentHour = Math.ceil(
                    currentDate.getHours() + currentDate.getMinutes() / 60
                );
                const startHour = Math.min(currentHour + 2, 22);
                return Array.from({ length: 22 - startHour + 1 }, (_, i) => ({
                    label: `${startHour + i}:00`,
                    value: `${startHour + i}:00`,
                }));
            }
        }
        return Array.from({ length: 23 }, (_, i) => ({
            label: `${i}:00`,
            value: `${i}:00`,
        }));
    };

    const generateToOptions = () => {
        const fromHour = fromTime ? parseInt(fromTime.split(":")[0]) + 1 : 0;
        return Array.from({ length: 24 - fromHour }, (_, i) => ({
            label: `${fromHour + i}:00`,
            value: `${fromHour + i}:00`,
        }));
    };

    if (!isClient) return null; // Prevent server rendering

    return (
        <div id="visit-section" className="flex flex-col gap-6">
            <h3 className="text-[24px] text-[#112950] font-[300]">Wizyta</h3>
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
                name="visitDate"
                label="Data wizyty"
                placeholder="Data wizyty"
            />
            <CheckboxComponent
                name="hoursrange"
                label="Wybierz konkretny przedział godzinowy"
            />
            {showHoursRange && (
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
                                        options={generateFromOptions()}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <SelectComponent
                                        key="to"
                                        id="to"
                                        name="To"
                                        placeholder="Do"
                                        options={generateToOptions()}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
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
                    options={options.languages || []}
                />
            )}
        </div>
    );
};

export default VisitForm;
