"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputComponent from "./fields/InputComponent";
import { fetchOptionsFromAPI } from "@/app/helpers/api";
import SelectComponent from "./fields/SelectComponent";

interface FormData {
    numberOfIssue: string;
    category: string;
    lastName: string;
    email: string;
}

const HomeVisitForm: React.FC = () => {
    const methods = useForm<FormData>({
        defaultValues: {
            numberOfIssue: "",
            category: "",
            lastName: "",
            email: "",
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const fetchCategoryOptions = async () => {
        return await fetchOptionsFromAPI({
            url: "/api/categories",
        });
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="border border-gray-300 rounded-md p-10 gap-6 flex flex-col bg-white w-full"
            >
                <InputComponent
                    name="numberOfIssue"
                    label="Numer zgłoszenia"
                    placeholder="Wpisz numer zgłoszenia"
                    rules={{ required: "Pole wymagane." }}
                />
                <SelectComponent
                    name="Visit Type"
                    label="Rodzaj wizyty"
                    placeholder="Wizyta domowa"
                    rules={{ required: "Pole wymagane." }}
                    fetchOptions={fetchCategoryOptions}
                    defaultValue={"Wizyta domowa"}
                />

                <InputComponent
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    }}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    );
};

export default HomeVisitForm;
