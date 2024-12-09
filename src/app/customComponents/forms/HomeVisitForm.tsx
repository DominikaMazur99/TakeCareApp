"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputComponent from "./fields/InputComponent";
import { fetchOptionsFromAPI } from "@/app/helpers/api";
import SelectComponent from "./fields/SelectComponent";
import VisitForm from "./formParts/VisitForm";
import PacientForm from "./formParts/PacientForm";

interface FormData {
    numberOfIssue: string;
    visitType: string;
    specialization: string;
    visitDate: string;
    age: string;
    name: string;
    surname: string;
    document: string;
    passport: string;
    country: string;
    street: string;
    local: string;
    difadress: boolean;
}

const HomeVisitForm: React.FC = () => {
    const methods = useForm<FormData>({
        defaultValues: {
            numberOfIssue: "",
            visitType: "Wizyta domowa",
            specialization: "",
            visitDate: "",
            age: "",
            name: "",
            surname: "",
            document: "",
            passport: "PESEL",
            country: "",
            street: "",
            local: "",
            difadress: false,
        },
    });

    const onSubmit = (data: FormData) => {
        console.log("Submit data:", data);
    };

    const getAllValues = () => {
        const allValues = methods.getValues(); // Pobieranie danych z obu formularzy
        console.log("Wszystkie wartości formularza:", allValues);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="border border-gray-300 rounded-md p-10 gap-6 flex flex-col bg-white w-full h-full relative"
            >
                <VisitForm />
                <PacientForm />
                <button
                    type="button"
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
