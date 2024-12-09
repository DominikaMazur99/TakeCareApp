export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "Wizyta kontrolna" },
            { id: "2", name: "Konsultacja wyników" },
            { id: "3", name: "Nagły uraz" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
