"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import VisitForm from "./formParts/VisitForm";
import PacientForm from "./formParts/PacientForm";
import { ChevronRight, X } from "lucide-react";
import { createFormSchema } from "../helpers/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSidebar } from "@/hooks/SidebarContext";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../ui/LoadingComponent";
import AlertComponent from "../ui/AlertComponent";

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
    const { t } = useTranslation();
    const { selectedSection } = useSidebar();
    const [formsLoaded, setFormsLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const formSchema = createFormSchema(t);

    const methods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            numberOfIssue: "",
            visitType: "",
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

    const { control, handleSubmit, setValue } = methods;
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
            setShowAlert(true);
        }
    };

    useEffect(() => {
        const visitType =
            selectedSection === "home"
                ? "Wizyta domowa"
                : selectedSection === "online"
                ? "Wizyta online"
                : "Wizyta stacjonarna";

        setValue("visitType", visitType);
    }, [selectedSection, setValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormsLoaded(true);
        }, 300);
        return () => clearTimeout(timeout);
    }, [fields]);

    return (
        <>
            <FormProvider {...methods}>
                {formsLoaded ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border border-gray-300 rounded-md p-10 gap-6 flex flex-col bg-white w-full h-full relative"
                    >
                        <Suspense fallback={<LoadingComponent />}>
                            <VisitForm />
                        </Suspense>
                        <Suspense fallback={<LoadingComponent />}>
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

                        {formsLoaded && (
                            <>
                                <button
                                    type="button"
                                    onClick={handleAddPacient}
                                    className="text-blue-500 bg-white border-blue-500 border-[1px] px-4 py-2 rounded-md"
                                >
                                    {t("btn.patient")}
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center bg-blue-500 border-blue-500 border-[1px] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
                                >
                                    <span className="mr-2">
                                        {t("btn.next")}
                                    </span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}
                    </form>
                ) : (
                    <LoadingComponent />
                )}
            </FormProvider>
            <AlertComponent
                message={t("alert.patient")}
                type="error"
                duration={3000}
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
            />
        </>
    );
};

export default HomeVisitForm;
