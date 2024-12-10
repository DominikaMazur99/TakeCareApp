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

export const requiredField = z
    .string()
    .min(1, { message: "Pole jest wymagane." });
