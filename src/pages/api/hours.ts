export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "12:00" },
            { id: "2", name: "13:00" },
            { id: "3", name: "14:00" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
