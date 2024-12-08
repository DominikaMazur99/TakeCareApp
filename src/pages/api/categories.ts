export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "Option 1" },
            { id: "2", name: "Option 2" },
            { id: "3", name: "Option 3" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
