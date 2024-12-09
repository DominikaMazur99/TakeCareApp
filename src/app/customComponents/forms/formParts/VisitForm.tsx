import React from "react";
import SelectComponent from "../fields/SelectComponent";
import InputComponent from "../fields/InputComponent";
import { fetchOptionsFromAPI } from "@/app/helpers/api";
import TextareaComponent from "../fields/TextareaComponent";
import DatePickerComponent from "../fields/DatePickerComponent";
import CheckboxComponent from "../fields/CheckboxComponent";

const VisitForm: React.FC = () => {
    const fetchVisitsOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/visits",
        });
    };
    const fetchSpecializationOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/specializations",
        });
    };
    const fetchTopicOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/topic",
        });
    };
    const fetchHoursOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/hours",
        });
    };
    const fetchLanguagesOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/languages",
        });
    };
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
            <SelectComponent
                id="visit-type"
                name="Visit Type"
                label="Rodzaj wizyty"
                rules={{ required: "Pole wymagane." }}
                fetchOptions={fetchVisitsOptions}
                defaultValue={"Wizyta domowa"}
            />
            <SelectComponent
                id="specialization"
                name="Specialization"
                label="Specjalizacja"
                placeholder="Wybierz z listy"
                rules={{ required: "Pole wymagane." }}
                fetchOptions={fetchSpecializationOptions}
            />

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
                    <div className="w-1/2">
                        <SelectComponent
                            id="from"
                            name="From"
                            placeholder="Od"
                            fetchOptions={fetchHoursOptions}
                        />
                    </div>
                    <div className="w-1/2">
                        <SelectComponent
                            id="to"
                            name="To"
                            placeholder="Do"
                            fetchOptions={fetchHoursOptions}
                        />
                    </div>
                </div>
            </div>
            <SelectComponent
                id="topic"
                name="Topic"
                label="Temat"
                placeholder="Wybierz z listy"
                fetchOptions={fetchTopicOptions}
            />
            <TextareaComponent
                id="additional"
                name="Additional Information"
                label="Dodatkowe informacje (opcjonalnie)"
                placeholder="Opisz problem"
            />
            <SelectComponent
                id="language"
                name="Language"
                label="Język wizyty"
                placeholder="Wybierz z listy"
                rules={{ required: "Pole wymagane." }}
                fetchOptions={fetchLanguagesOptions}
            />
        </div>
    );
};

export default VisitForm;
