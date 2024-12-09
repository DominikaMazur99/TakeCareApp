import React from "react";
import SelectComponent from "../fields/SelectComponent";
import InputComponent from "../fields/InputComponent";
import { fetchOptionsFromAPI } from "@/app/helpers/api";
import TextareaComponent from "../fields/TextareaComponent";
import DatePickerComponent from "../fields/DatePickerComponent";
import RadioButtonsComponent from "../fields/RadioButtonsComponent";

const PacientForm: React.FC = () => {
    const fetchSymptomsOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/symptoms",
        });
    };
    const fetchCountriesOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/countries",
        });
    };
    return (
        <>
            <h3 className="text-[24px] text-textLabel font-small">Pacjent</h3>
            <RadioButtonsComponent
                name="age"
                label="Wiek pacjenta"
                options={[
                    { label: "Dorosły", value: "adult" },
                    { label: "Dziecko", value: "child" },
                ]}
                rules={{
                    required: "Wybór jest wymagany.",
                }}
            />{" "}
            <div>
                <label
                    htmlFor=""
                    className="block text-base text-textLabel font-hight mb-2"
                >
                    Dane Pacjenta
                </label>
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent name="name" placeholder="Imię" />
                    </div>
                    <div className="w-1/2">
                        <InputComponent name="surname" placeholder="Nazwisko" />
                    </div>
                </div>
            </div>
            <SelectComponent
                name="Symptoms"
                label="Objawy"
                fetchOptions={fetchSymptomsOptions}
            />
            <RadioButtonsComponent
                name="document"
                label="Dokument"
                options={[
                    { label: "PESEL", value: "pesel" },
                    { label: "Passport", value: "passport" },
                ]}
                rules={{
                    required: "Wybór jest wymagany.",
                }}
            />{" "}
            <InputComponent
                name="passport"
                placeholder="Paszport (pamietej zeby to poprawic)"
            />
            <div>
                <label
                    htmlFor=""
                    className="block text-base text-textLabel font-hight mb-2"
                >
                    Dane adresowe
                </label>
                <div>
                    <SelectComponent
                        name="country"
                        placeholder="Kraj"
                        fetchOptions={fetchCountriesOptions}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent name="street" placeholder="Ulica" />
                    </div>
                    <div className="w-1/2">
                        <InputComponent
                            name="local"
                            placeholder="Numer lokalu"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PacientForm;
