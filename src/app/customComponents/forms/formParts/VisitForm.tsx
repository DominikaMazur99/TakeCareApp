"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import InputComponent from "../fields/InputComponent";
import SelectComponent from "../fields/SelectComponent";
import TextareaComponent from "../fields/TextareaComponent";
import DatePickerComponent from "../fields/DatePickerComponent";
import CheckboxComponent from "../fields/CheckboxComponent";
import { useSidebar } from "@/hooks/SidebarContext";
import { useTranslation } from "react-i18next";

const VisitForm: React.FC = () => {
    const { t } = useTranslation();
    const { options } = useSidebar();
    const [isClient, setIsClient] = useState(false);
    const { watch } = useFormContext();
    const showHoursRange = watch("hoursrange");
    const visitDate = watch("visitDate");
    const fromTime = watch("From");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const generateFromOptions = () => {
        const currentDate = new Date();
        if (visitDate) {
            const selectedDate = new Date(visitDate);
            if (selectedDate.toDateString() === currentDate.toDateString()) {
                const currentHour = Math.ceil(
                    currentDate.getHours() + currentDate.getMinutes() / 60
                );
                const startHour = Math.min(currentHour + 2, 22);
                return Array.from({ length: 22 - startHour + 1 }, (_, i) => ({
                    label: `${startHour + i}:00`,
                    value: `${startHour + i}:00`,
                }));
            }
        }
        return Array.from({ length: 23 }, (_, i) => ({
            label: `${i}:00`,
            value: `${i}:00`,
        }));
    };

    const generateToOptions = () => {
        const fromHour = fromTime ? parseInt(fromTime.split(":")[0]) + 1 : 0;
        return Array.from({ length: 24 - fromHour }, (_, i) => ({
            label: `${fromHour + i}:00`,
            value: `${fromHour + i}:00`,
        }));
    };

    if (!isClient) return null;

    return (
        <div id="visit-section" className="flex flex-col gap-6">
            <h3 className="text-[24px] text-[#112950] font-[300]">
                {t("visit.section")}
            </h3>
            <InputComponent
                id="number-of-issue"
                name="numberOfIssue"
                label={t("visit.number")}
                placeholder={t("visit.number.placeholder")}
                rules={{ required: t("field.required") }}
            />
            {isClient && (
                <>
                    <SelectComponent
                        key="visit-type"
                        id="visit-type"
                        name="visitType"
                        label={t("visit.type")}
                        rules={{ required: t("field.required") }}
                        options={options.visits || []}
                    />
                    <SelectComponent
                        key="specialization"
                        id="specialization"
                        name="specialization"
                        label={t("visit.specialization")}
                        placeholder={t("visit.specialization.placeholder")}
                        rules={{ required: t("field.required") }}
                        options={options.specializations || []}
                    />
                </>
            )}
            <div id={`visit-date`}>
                <DatePickerComponent
                    name="visitDate"
                    label={t("visit.date")}
                    placeholder={t("visit.date.placeholder")}
                />
            </div>
            <CheckboxComponent
                name="hoursrange"
                label={t("visit.hoursRange.label")}
            />
            {showHoursRange && (
                <div>
                    <label className="text-base text-textLabel font-hight">
                        {t("visit.hours")}
                    </label>
                    <div className="flex items-center gap-4 w-full">
                        {isClient && (
                            <>
                                <div className="w-1/2">
                                    <SelectComponent
                                        key="from"
                                        id="from"
                                        name="from"
                                        placeholder={t("visit.hours.from")}
                                        options={generateFromOptions()}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <SelectComponent
                                        key="to"
                                        id="to"
                                        name="to"
                                        placeholder={t("visit.hours.to")}
                                        options={generateToOptions()}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            {isClient && (
                <SelectComponent
                    key="topic"
                    id="topic"
                    name="topic"
                    label={t("visit.topic")}
                    placeholder={t("visit.topic.placeholder")}
                    options={options.topics || []}
                />
            )}
            <TextareaComponent
                id="additional"
                name="additionalInformation"
                label={t("visit.additionalInfo")}
                placeholder={t("visit.additionalInfo.placeholder")}
            />
            {isClient && (
                <SelectComponent
                    key="language"
                    id="language"
                    name="language"
                    label={t("visit.language")}
                    placeholder={t("list.placeholder")}
                    options={options.languages || []}
                />
            )}
        </div>
    );
};

export default VisitForm;
