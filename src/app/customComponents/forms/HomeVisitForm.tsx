"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
    useForm,
    FormProvider,
    useFieldArray,
    useWatch,
} from "react-hook-form";
import VisitForm from "./formParts/VisitForm";
import PacientForm from "./formParts/PacientForm";
import { ChevronRight, X } from "lucide-react";
import { createFormSchema } from "../helpers/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSidebar } from "@/hooks/SidebarContext";
import { useTranslation } from "react-i18next";
import LoadingComponent from "../ui/LoadingComponent";
import AlertComponent from "../ui/AlertComponent";
import DialogComponent from "../ui/DialogComponent";
import SummaryComponent from "../ui/SummaryComponent";

interface Pacient {
    id: number;
    age: string;
    name: string;
    surname: string;
    document: string;
    pesel: string;
    passport: string;
    symptoms: any[];
}

interface FormData {
    numberOfIssue: string;
    visitType: string;
    specialization: string;
    visitDate: string;
    pacients: Pacient[];
    country: string;
    street: string;
    local: string;
    difadress: boolean;
    secondCountry?: string;
    secondStreet?: string;
    secondLocal?: string;
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
        mode: "onChange",
        defaultValues: {
            numberOfIssue: "",
            visitType: "",
            specialization: "",
            visitDate: "",
            country: "Polska",
            street: "",
            local: "",
            difadress: false,
            pacients: [
                {
                    id: 1,
                    age: "",
                    name: "",
                    surname: "",
                    document: "pesel",
                    pesel: "",
                    passport: "",
                    symptoms: [],
                },
            ],
        },
    });

    const { control, handleSubmit, setValue, getValues, formState, reset } =
        methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "pacients",
    });

    const isFormValid = formState.isValid;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);
    const [formData, setFormData] = useState({});

    const handleButtonClick = () => {
        const data = getValues();
        console.log(data);
        setFormData(data);
        setIsDialogOpen(true);
    };

    const onSubmit = (data: FormData) => {
        try {
            formSchema.parse(data);
            setIsSubmited(true);
            setIsDialogOpen(false);
            console.log("Validation passed!");
        } catch (error: any) {
            console.error("Validation errors:", error.errors);
        }
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
                symptoms: [],
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
        if (formState.isValid) {
            methods.clearErrors();
        }
    }, [formState.isValid, methods]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormsLoaded(true);
        }, 300);
        return () => clearTimeout(timeout);
    }, [fields]);

    const simulatedSubmit = () => {
        setIsSubmited(true);
        setIsDialogOpen(false);

        reset({
            numberOfIssue: "",
            visitType: "",
            specialization: "",
            visitDate: "",
            country: "Polska",
            street: "",
            local: "",
            difadress: false,
            pacients: [
                {
                    id: 1,
                    age: "",
                    name: "",
                    surname: "",
                    document: "pesel",
                    pesel: "",
                    passport: "",
                    symptoms: [],
                },
            ],
        });
        setValue("difadress", false);
    };

    return (
        <>
            <FormProvider {...methods}>
                {formsLoaded ? (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="border border-gray-300 rounded-md p-10 gap-6 flex flex-col bg-white w-full h-full"
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
                                    type="button"
                                    disabled={!isFormValid} // Użycie isFormValid
                                    onClick={handleButtonClick}
                                    className={`flex items-center justify-center px-6 py-2 rounded-md transition-all ${
                                        isFormValid
                                            ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                                            : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    <span className="mr-2">
                                        {t("btn.next")}
                                    </span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        try {
                                            formSchema.parse(getValues());
                                            console.log("Validation passed!");
                                        } catch (error: any) {
                                            console.error(
                                                "Validation errors:",
                                                error?.errors
                                            );
                                        }
                                    }}
                                >
                                    Test Validation
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
            <AlertComponent
                message={t("form.submitted")}
                type="success"
                duration={3000}
                isOpen={isSubmited}
                onClose={() => setIsSubmited(false)}
            />
            <DialogComponent
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title={t("form.summary")}
                content={
                    <>
                        <SummaryComponent data={formData} />
                        <div className="my-6" />
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={simulatedSubmit}
                                className="flex items-center justify-center bg-blue-500 border-blue-500 border-[1px] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <span className="mr-2">{t("btn.submit")}</span>
                            </button>
                        </div>
                    </>
                }
            />
        </>
    );
};

export default HomeVisitForm;
