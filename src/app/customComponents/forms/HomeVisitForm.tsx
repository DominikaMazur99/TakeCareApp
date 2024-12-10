"use client";

import React, { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import VisitForm from "./formParts/VisitForm";
import PacientForm from "./formParts/PacientForm";
import { X } from "lucide-react";

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
    pacients: Pacient[]; // Tablica pacjentów
}

const HomeVisitForm: React.FC = () => {
    const methods = useForm<FormData>({
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

    const { control, handleSubmit, watch } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "pacients",
    });

    const onSubmit = (data: FormData) => {
        console.log("Submit data:", data);
    };

    const handleAddPacient = () => {
        if (fields.length < 6) {
            append({
                id: fields.length + 1,
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
        } else {
            alert("Możesz dodać maksymalnie 6 pacjentów.");
        }
    };

    const handleRemovePacient = (index: number) => {
        remove(index);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-gray-300 rounded-md p-10 gap-6 flex flex-col bg-white w-full h-full relative"
            >
                <VisitForm />

                {/* Dynamiczne renderowanie PacientForm */}
                {fields.map((field, index) => (
                    <div key={field.id} className="relative ">
                        <PacientForm index={index} />
                        {fields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemovePacient(index)}
                                className="absolute top-2 right-2"
                            >
                                <X color="red" />
                            </button>
                        )}
                    </div>
                ))}

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
