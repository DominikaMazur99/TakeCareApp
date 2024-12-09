export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "Polska" },
            { id: "2", name: "Anglia" },
            { id: "3", name: "Niemcy" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
