import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const data = {
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
        };

        res.status(200).json(data);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
