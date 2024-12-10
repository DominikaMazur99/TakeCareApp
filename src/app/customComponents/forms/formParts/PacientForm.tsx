import React, { useEffect, useState } from "react";
import InputComponent from "../fields/InputComponent";
import RadioButtonsComponent from "../fields/RadioButtonsComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import RadioButtonsInOne from "../fields/RadioButtonsInOne";
import { useFormContext } from "react-hook-form";
import { useSidebar } from "@/hooks/SidebarContext";
import MultiSelectComponent from "../fields/MultiselectComponent";
import SelectComponent from "../fields/SelectComponent";

const PacientForm: React.FC = () => {
    const { options, loading } = useSidebar();
    const { watch } = useFormContext(); // Używaj useFormContext zamiast useForm
    const documentType = watch("document");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ustaw flagę po załadowaniu klienta
    }, []);

    if (!isClient) return null; // Zatrzymaj renderowanie na serwerze

    if (loading) {
        return <p>Ładowanie danych...</p>;
    }
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
                key="symptoms"
                id="symptoms"
                name="Symptoms"
                label="Objawy"
                options={options.symptoms || []}
            />
            <RadioButtonsInOne
                name="document"
                label="Dokument"
                options={[
                    { label: "PESEL", value: "pesel" },
                    { label: "Paszport", value: "passport" },
                ]}
                rules={{
                    required: "Wybór jest wymagany.",
                }}
            />
            {documentType && documentType === "passport" ? (
                <InputComponent
                    id="passport"
                    name="passport"
                    placeholder="Wpisz numer paszportu"
                />
            ) : (
                <InputComponent
                    id="pesel"
                    name={"pesel".toLowerCase()}
                    placeholder="Wpisz numer PESEL"
                />
            )}
            <div>
                <label
                    htmlFor=""
                    className="block text-base text-textLabel font-hight mb-2"
                >
                    Dane adresowe
                </label>
                <div>
                    {isClient && (
                        <SelectComponent
                            id="country"
                            name="country"
                            placeholder="Kraj"
                            options={options.countries || []}
                        />
                    )}
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
