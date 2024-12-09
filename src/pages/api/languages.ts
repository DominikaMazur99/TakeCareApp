export default function handler(req: any, res: any) {
    if (req.method === "GET") {
        res.status(200).json([
            { id: "1", name: "polski" },
            { id: "2", name: "niemiecki" },
            { id: "3", name: "angielski" },
        ]);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}