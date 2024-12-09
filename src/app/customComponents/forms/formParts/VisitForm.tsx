import React from "react";
import SelectComponent from "../fields/SelectComponent";
import InputComponent from "../fields/InputComponent";
import { fetchOptionsFromAPI } from "@/app/helpers/api";
import TextareaComponent from "../fields/TextareaComponent";

const VisitForm: React.FC = () => {
    const fetchCategoryOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/categories",
        });
    };
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
        <>
            <h3 className="text-[24px] text-textLabel font-small">Wizyta</h3>
            <InputComponent
                name="numberOfIssue"
                label="Numer zgłoszenia"
                placeholder="Wpisz numer zgłoszenia"
                rules={{ required: "Pole wymagane." }}
            />
            <SelectComponent
                name="Visit Type"
                label="Rodzaj wizyty"
                rules={{ required: "Pole wymagane." }}
                fetchOptions={fetchVisitsOptions}
                defaultValue={"Wizyta domowa"}
            />
            <SelectComponent
                name="Specialization"
                label="Specjalizacja"
                placeholder="Wybierz z listy"
                rules={{ required: "Pole wymagane." }}
                fetchOptions={fetchSpecializationOptions}
            />
            <SelectComponent
                name="Visit Date"
                label="Data wizyty"
                placeholder="Data wizyty"
                rules={{ required: "Pole wymagane." }}
                fetchOptions={fetchCategoryOptions}
                defaultValue={"Jak najszybciej"}
            />
            <div>
                <label className="text-base text-textLabel font-hight">
                    Godzina
                </label>
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <SelectComponent
                            name="From"
                            placeholder="Od"
                            fetchOptions={fetchHoursOptions}
                        />
                    </div>
                    <div className="w-1/2">
                        <SelectComponent
                            name="To"
                            placeholder="Do"
                            fetchOptions={fetchHoursOptions}
                        />
                    </div>
                </div>
            </div>
            <SelectComponent
                name="Topic"
                label="Temat"
                placeholder="Wybierz z listy"
                fetchOptions={fetchTopicOptions}
            />
            <TextareaComponent
                name="Additional Information"
                label="Dodatkowe informacje (opcjonalnie)"
                placeholder="Opisz problem"
            />
            <SelectComponent
                name="Language"
                label="Język wizyty"
                placeholder="Wybierz z listy"
                rules={{ required: "Pole wymagane." }}
                fetchOptions={fetchLanguagesOptions}
            />
        </>
    );
};

export default VisitForm;
