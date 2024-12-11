import { z } from "zod";

export const peselSchema = z
    .string()
    .regex(/^[0-9]{11}$/, {
        message: "Numer PESEL musi składać się z 11 cyfr.",
    })
    .refine(
        (value) => {
            const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            const sum = weights.reduce(
                (acc, weight, index) => acc + weight * parseInt(value[index]),
                0
            );
            const checksum = (10 - (sum % 10)) % 10;
            return checksum === parseInt(value[10]);
        },
        { message: "Numer PESEL ma nieprawidłową sumę kontrolną." }
    );

export const idCardSchema = z
    .string()
    .regex(/^[A-Z]{3}[0-9]{6}$/, {
        message:
            "Numer dowodu musi mieć format 3 litery + 6 cyfr (np. ABC123456).",
    })
    .refine(
        (value) => {
            const weights = [7, 3, 1, 7, 3, 1, 7, 3, 1];
            const characters = value.split("");
            const sum = characters.reduce((acc, char, index) => {
                const charValue =
                    index < 3
                        ? char.charCodeAt(0) - 55 // A=10, ..., Z=35
                        : parseInt(char, 10); // Cyfry
                return acc + weights[index] * charValue;
            }, 0);
            return sum % 10 === 0;
        },
        { message: "Numer dowodu osobistego ma nieprawidłową sumę kontrolną." }
    );

export const pacientSchema = z.object({
    id: z.number(),
    age: z.enum(["adult", "child"], { message: "Wybór jest wymagany." }),
    name: z.string().min(1, { message: "Imię jest wymagane." }),
    surname: z.string().min(1, { message: "Nazwisko jest wymagane." }),
    document: z.enum(["pesel", "passport"], {
        message: "Dokument jest wymagany.",
    }),
    pesel: peselSchema.optional(),
    passport: idCardSchema.optional(),
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
                message:
                    "Data urodzenia musi być poprawna i nie może być z przyszłości.",
            }
        ),
    country: z.string().min(1, { message: "Kraj jest wymagany." }),
    street: z.string().optional(),
    local: z.string().optional(),
    symptoms: z.array(z.string()).optional(),
    difadress: z.boolean(),
    secondCountry: z.string().optional(),
    secondStreet: z.string().optional(),
    secondLocal: z.string().optional(),
});

export const formSchema = z
    .object({
        numberOfIssue: z.string().min(1, { message: "Pole wymagane." }),
        visitType: z.string().min(1, { message: "Pole wymagane." }),
        specialization: z.string().min(1, { message: "Pole wymagane." }),
        visitDate: z.string().refine(
            (date) => {
                if (!date) return false; // Required validation
                const today = new Date();
                const parsedDate = new Date(date);
                const maxDate = new Date();
                maxDate.setDate(today.getDate() + 3);

                // Validate that the date is within the allowed range
                return parsedDate >= today && parsedDate <= maxDate;
            },
            { message: "Wybierz datę w zakresie od dzisiaj do 3 dni." }
        ),
        hoursrange: z.boolean().optional(),
        from: z.string().optional(), // `from` field
        to: z.string().optional(), // `to` field
        topic: z.string().optional(),
        additionalInformation: z.string().optional(),
        language: z.string().min(1, { message: "Język wizyty jest wymagany." }),
        pacients: z
            .array(pacientSchema)
            .min(1, { message: "Dodaj co najmniej jednego pacjenta." }),
    })
    .superRefine((data, ctx) => {
        const from = data.from;
        const to = data.to;

        if (from && to) {
            const [fromHour] = from.split(":").map(Number);
            const [toHour] = to.split(":").map(Number);

            if (toHour <= fromHour) {
                ctx.addIssue({
                    code: "custom", // Add the required "code" field
                    path: ["to"], // Target the "to" field
                    message: "Godzina 'Do' musi być późniejsza niż 'Od'.",
                });
            }
        }
    });
