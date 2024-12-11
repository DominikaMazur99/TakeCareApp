"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const LoadingComponent: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-40 z-50">
            <div className="animate-spin inline-block w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full">
                <span className="sr-only">{t("loading.message")}</span>
            </div>
        </div>
    );
};

export default LoadingComponent;
