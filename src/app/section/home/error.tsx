"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    const { t } = useTranslation();

    useEffect(() => {
        console.error("Błąd renderowania:", error);
    }, [error]);

    return (
        <div className="flex flex-col h-screen items-center justify-start">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    {t("wrong.header")}
                </h1>
                <p className="text-gray-700 text-sm mb-6">{t("wrong.span")}</p>
                <button
                    onClick={reset}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    {t("wrong.refresh")}
                </button>
            </div>
        </div>
    );
}
