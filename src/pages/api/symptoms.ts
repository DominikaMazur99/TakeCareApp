export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "Kaszel" },
            { id: "2", name: "Katar" },
            { id: "3", name: "Ból głowy" },
            { id: "4", name: "Gorączka" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
