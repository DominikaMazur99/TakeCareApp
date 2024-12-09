export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "Wizyta domowa" },
            { id: "2", name: "Wizyta online" },
            { id: "3", name: "Wizyta stacjonarna" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
