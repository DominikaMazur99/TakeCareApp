"use client";

import React, { Suspense } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import VisitForm from "./formParts/VisitForm";
import PacientForm from "./formParts/PacientForm";
import { X } from "lucide-react";
import { formSchema } from "../helpers/validators";
import { zodResolver } from "@hookform/resolvers/zod";

interface Pacient {
    id: number;
    age: string;
    name: string;
    surname: string;
    document: string;
    pesel: string;
    passport: string;
    country: string;
    street: string;
    local: string;
    symptoms: any[];
    difadress: boolean;
    secondCountry?: string;
    secondStreet?: string;
    secondLocal?: string;
}

interface FormData {
    numberOfIssue: string;
    visitType: string;
    specialization: string;
    visitDate: string;
    pacients: Pacient[];
}

interface HomeVisitFormProps {
    updateAccordion: (index: number) => void;
}

const HomeVisitForm: React.FC<HomeVisitFormProps> = ({ updateAccordion }) => {
    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            numberOfIssue: "",
            visitType: "Wizyta domowa",
            specialization: "",
            visitDate: "",
            pacients: [
                {
                    id: 1,
                    age: "",
                    name: "",
                    surname: "",
                    document: "pesel",
                    pesel: "",
                    passport: "",
                    country: "",
                    street: "",
                    local: "",
                    symptoms: [],
                    difadress: false,
                },
            ],
        },
    });

    const { control, handleSubmit } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "pacients",
    });

    const onSubmit = (data: FormData) => {
        console.log("Submit data:", data);
    };

    const handleAddPacient = () => {
        const newIndex = fields.length;
        if (newIndex < 6) {
            append({
                id: newIndex + 1,
                age: "",
                name: "",
                surname: "",
                document: "pesel",
                pesel: "",
                passport: "",
                country: "",
                street: "",
                local: "",
                symptoms: [],
                difadress: false,
            });

            updateAccordion(newIndex);
        } else {
            alert("Możesz dodać maksymalnie 6 pacjentów.");
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-gray-300 rounded-md p-10 gap-6 flex flex-col bg-white w-full h-full relative"
            >
                <Suspense fallback={<p>Loading VisitForm...</p>}>
                    <VisitForm />
                </Suspense>

                <Suspense fallback={<p>Loading PacientForms...</p>}>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="relative"
                            id={`patients-${index}`}
                        >
                            <PacientForm index={index} />
                            {fields.length > 1 && index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2"
                                >
                                    <X color="red" />
                                </button>
                            )}
                        </div>
                    ))}
                </Suspense>

                <button
                    type="button"
                    onClick={handleAddPacient}
                    className="text-blue-500 bg-white border-blue-500 border-[1px] px-4 py-2 rounded-md"
                >
                    Dodaj pacjenta
                </button>

                <button
                    type="submit"
                    className="bg-blue-500 border-blue-500 border-[1px] text-white px-4 py-2 rounded-md"
                >
                    Dalej &gt;
                </button>
            </form>
        </FormProvider>
    );
};

export default HomeVisitForm;
