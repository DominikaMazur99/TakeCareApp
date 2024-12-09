export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "Stomatolog" },
            { id: "2", name: "Laryngolog" },
            { id: "3", name: "Ginekolog" },
            { id: "4", name: "Pediatra" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
