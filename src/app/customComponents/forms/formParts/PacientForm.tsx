import React from "react";
import SelectComponent from "../fields/SelectComponent";
import InputComponent from "../fields/InputComponent";
import { fetchOptionsFromAPI } from "@/app/helpers/api";
import TextareaComponent from "../fields/TextareaComponent";
import DatePickerComponent from "../fields/DatePickerComponent";
import RadioButtonsComponent from "../fields/RadioButtonsComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import dynamic from "next/dynamic";

const PacientForm: React.FC = () => {
    const fetchSymptomsOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/symptoms",
        });
    };
    const MultiSelectComponent = dynamic(
        () => import("../fields/MultiselectComponent"),
        {
            ssr: false,
        }
    );
    const fetchCountriesOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/countries",
        });
    };
    return (
        <div id="patient-section" className="flex flex-col gap-6">
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
                        <InputComponent
                            id="pacient-name"
                            name="name"
                            placeholder="Imię"
                        />
                    </div>
                    <div className="w-1/2">
                        <InputComponent
                            id="pacient-surname"
                            name="surname"
                            placeholder="Nazwisko"
                        />
                    </div>
                </div>
            </div>
            <MultiSelectComponent
                id="symptoms"
                name="Symptoms"
                label="Objawy"
                fetchOptions={fetchSymptomsOptions}
                onChange={() => {
                    console.log("aa");
                }}
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
                id="passport"
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
                        id="country"
                        name="country"
                        placeholder="Kraj"
                        fetchOptions={fetchCountriesOptions}
                    />
                </div>
                <div className="flex items-center gap-4 w-full">
                    <div className="w-1/2">
                        <InputComponent
                            id="street"
                            name="street"
                            placeholder="Ulica"
                        />
                    </div>
                    <div className="w-1/2">
                        <InputComponent
                            id="local-number"
                            name="local"
                            placeholder="Numer lokalu"
                        />
                    </div>
                </div>
            </div>
            <CheckboxComponent
                name="difadress"
                label="Wizyta ma się odbyć na inny adres"
            />
        </div>
    );
};

export default PacientForm;
