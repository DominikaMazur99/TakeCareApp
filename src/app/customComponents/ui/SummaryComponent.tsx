import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const SummaryComponent = (data: any) => {
    const {
        pacients,
        visitDate,
        specialization,
        visitType,
        numberOfIssue,
        street,
        local,
        country,
        from,
        to,
        secondLocal,
        secondStreet,
    } = data.data;
    const { t } = useTranslation();
    const formattedDate =
        visitDate && !isNaN(new Date(visitDate).getTime())
            ? format(new Date(visitDate), "dd-MM-yyyy")
            : "-";

    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg  underline">{t("visit.section")}</h3>
            <div>
                <strong>{t("visit.number")}:</strong> {numberOfIssue || "-"}
            </div>
            <div>
                <strong>{t("visit.type")}:</strong> {visitType || "-"}
            </div>
            <div>
                <strong>{t("visit.date")}:</strong> {formattedDate}
            </div>
            <div>
                <strong>{t("date.range")}:</strong>{" "}
                {from && to ? `${from} - ${to}` : "-"}
            </div>
            <div>
                <strong>{t("visit.specialization")}:</strong>{" "}
                {specialization || "-"}
            </div>
            <div>
                <strong>{t("visit.address.label")}:</strong> {street || "-"}{" "}
                {local || "-"}
            </div>
            <div>
                <strong>{t("patient.country")}:</strong> {country || "-"}
            </div>
            {secondLocal && secondStreet && (
                <div>
                    <strong>{t("visit.address.label")} (2):</strong>{" "}
                    {`${secondStreet} ${secondLocal}`}
                </div>
            )}

            <h3 className="text-lg  underline">
                {t("pacients.section.label")}
            </h3>
            {pacients?.map((patient: any, index: number) => (
                <div key={index} className="">
                    <div>
                        <strong>{t("name.and.surname")}:</strong>{" "}
                        {patient.name || "-"} {patient.surname || "-"}
                    </div>
                    <div>
                        <strong>{t("patient.symptoms")}:</strong>{" "}
                        {patient.symptoms ? patient.symptoms.join(", ") : "-"}
                    </div>
                    <div>
                        <strong>{t("patient.birthdate.placeholder")}:</strong>{" "}
                        {patient.birthDate || "-"}
                    </div>

                    <div>
                        {patient.pesel ? (
                            <>
                                <strong>PESEL:</strong> {patient.pesel}
                            </>
                        ) : (
                            <>
                                <strong>{t("document.passport")}:</strong>{" "}
                                {patient.passport || "-"}
                            </>
                        )}
                    </div>

                    {pacients.length > 1 && (
                        <div className="h-[1px] w-full bg-gray-300"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SummaryComponent;
