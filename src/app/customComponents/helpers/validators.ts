import { z } from "zod";

export const createFormSchema = (t: (key: string) => string) => {
    const peselSchema = z
        .string()
        .regex(/^[0-9]{11}$/, {
            message: t("validation.pesel.length"),
        })
        .refine(
            (value) => {
                const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
                const sum = weights.reduce(
                    (acc, weight, index) =>
                        acc + weight * parseInt(value[index]),
                    0
                );
                const checksum = (10 - (sum % 10)) % 10;
                return checksum === parseInt(value[10]);
            },
            { message: t("validation.pesel.checksum") }
        );

    const idCardSchema = z
        .string()
        .regex(/^[A-Z]{3}[0-9]{6}$/, {
            message: t("validation.idCard.format"),
        })
        .or(z.literal(""))
        .optional();

    const pacientSchema = z
        .object({
            id: z.number(),
            age: z.enum(["adult", "child"], {
                message: t("validation.required"),
            }),
            name: z.string().min(1, { message: t("validation.required") }),
            surname: z.string().min(1, { message: t("validation.required") }),
            document: z.enum(["pesel", "passport"], {
                message: t("validation.required"),
            }),
            pesel: z.union([peselSchema, z.literal("")]).optional(),
            passport: z.union([idCardSchema, z.literal("")]).optional(),
            birthDate: z
                .string()
                .optional()
                .refine(
                    (date) => {
                        if (!date) return true;
                        const parsedDate = new Date(date);
                        return parsedDate <= new Date();
                    },
                    {
                        message: t("validation.birthDate"),
                    }
                ),
            symptoms: z.array(z.string()).optional(),
        })
        .superRefine((data, ctx) => {
            if (data.document === "pesel") {
                if (!data.pesel || data.pesel === "") {
                    ctx.addIssue({
                        code: "custom",
                        path: ["pesel"],
                        message: t("validation.requiredPesel"),
                    });
                }
                if (data.passport && data.passport !== "") {
                    ctx.addIssue({
                        code: "custom",
                        path: ["passport"],
                        message: t("validation.notRequiredPassport"),
                    });
                }
            } else if (data.document === "passport") {
                if (!data.passport || data.passport === "") {
                    ctx.addIssue({
                        code: "custom",
                        path: ["passport"],
                        message: t("validation.requiredPassport"),
                    });
                }
                if (data.pesel && data.pesel !== "") {
                    ctx.addIssue({
                        code: "custom",
                        path: ["pesel"],
                        message: t("validation.notRequiredPesel"),
                    });
                }
            }
        });

    return z
        .object({
            numberOfIssue: z
                .string()
                .min(1, { message: t("validation.required") }),
            visitType: z.string().min(1, { message: t("validation.required") }),
            specialization: z
                .string()
                .min(1, { message: t("validation.required") }),
            visitDate: z.string().refine(
                (date) => {
                    if (!date) return false;
                    const today = new Date();
                    const parsedDate = new Date(date);
                    const maxDate = new Date();
                    maxDate.setDate(today.getDate() + 3);

                    return parsedDate >= today && parsedDate <= maxDate;
                },
                { message: t("validation.visitDateRange") }
            ),
            country: z.string().min(1, { message: t("validation.required") }),
            street: z.string().min(1, { message: t("validation.required") }),
            local: z.string().min(1, { message: t("validation.required") }),
            hoursrange: z.boolean().optional(),
            from: z.string().optional(),
            to: z.string().optional(),
            topic: z.string().optional(),
            additionalInformation: z.string().optional(),
            language: z.string().min(1, { message: t("validation.required") }),
            pacients: z
                .array(pacientSchema)
                .min(1, { message: t("validation.minPacient") }),
        })
        .superRefine((data, ctx) => {
            const from = data.from;
            const to = data.to;

            if (from && to) {
                const [fromHour] = from.split(":").map(Number);
                const [toHour] = to.split(":").map(Number);

                if (toHour <= fromHour) {
                    ctx.addIssue({
                        code: "custom",
                        path: ["to"],
                        message: t("validation.timeRange"),
                    });
                }
            }
        });
};
