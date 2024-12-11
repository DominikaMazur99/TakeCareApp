import { NextApiRequest, NextApiResponse } from "next";

export const translations = {
    en: {
        symptoms: [
            { id: "1", name: "Cough" },
            { id: "2", name: "Runny nose" },
            { id: "3", name: "Headache" },
            { id: "4", name: "Fever" },
        ],
        countries: [
            { id: "1", name: "Poland" },
            { id: "2", name: "England" },
            { id: "3", name: "Germany" },
        ],
        hours: [
            { id: "1", name: "12:00" },
            { id: "2", name: "13:00" },
            { id: "3", name: "14:00" },
        ],
        languages: [
            { id: "1", name: "Polish" },
            { id: "2", name: "German" },
            { id: "3", name: "English" },
        ],
        specializations: [
            { id: "1", name: "Dentist" },
            { id: "2", name: "ENT Specialist" },
            { id: "3", name: "Gynecologist" },
            { id: "4", name: "Pediatrician" },
        ],
        topics: [
            { id: "1", name: "Routine checkup" },
            { id: "2", name: "Results consultation" },
            { id: "3", name: "Emergency injury" },
        ],
        visits: [
            { id: "1", name: "Home visit" },
            { id: "2", name: "Online visit" },
            { id: "3", name: "Stationary visit" },
        ],
    },
    pl: {
        symptoms: [
            { id: "1", name: "Kaszel" },
            { id: "2", name: "Katar" },
            { id: "3", name: "Ból głowy" },
            { id: "4", name: "Gorączka" },
        ],
        countries: [
            { id: "1", name: "Polska" },
            { id: "2", name: "Anglia" },
            { id: "3", name: "Niemcy" },
        ],
        hours: [
            { id: "1", name: "12:00" },
            { id: "2", name: "13:00" },
            { id: "3", name: "14:00" },
        ],
        languages: [
            { id: "1", name: "polski" },
            { id: "2", name: "niemiecki" },
            { id: "3", name: "angielski" },
        ],
        specializations: [
            { id: "1", name: "Stomatolog" },
            { id: "2", name: "Laryngolog" },
            { id: "3", name: "Ginekolog" },
            { id: "4", name: "Pediatra" },
        ],
        topics: [
            { id: "1", name: "Wizyta kontrolna" },
            { id: "2", name: "Konsultacja wyników" },
            { id: "3", name: "Nagły uraz" },
        ],
        visits: [
            { id: "1", name: "Wizyta domowa" },
            { id: "2", name: "Wizyta online" },
            { id: "3", name: "Wizyta stacjonarna" },
        ],
    },
};

type Language = keyof typeof translations; // "en" | "pl"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { lng = "pl" } = req.query;

        if (typeof lng !== "string" || !(lng in translations)) {
            return res.status(400).json({ message: "Invalid language" });
        }

        const data = translations[lng as Language];

        res.status(200).json(data);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
