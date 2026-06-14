import fs from "fs";
import path from "path";

export async function POST(req) {
    const data = await req.json();

    const filePath = path.join(process.cwd(), "master_rsi2020.txt");

    const line =
        `Nom: ${data.nom} | ` +
        `Prenom: ${data.prenom} | ` +
        `CNE: ${data.cne} | ` +
        `M1: ${data.m1} | ` +
        `M2: ${data.m2} | ` +
        `M3: ${data.m3}\n`;

    fs.appendFileSync(filePath, line);

    return Response.json({ message: "Saved successfully" });
}

export async function GET() {
    const filePath = path.join(process.cwd(), "master_rsi2020.txt");

    if (!fs.existsSync(filePath)) {
        return Response.json({ content: [] });
    }

    const data = fs.readFileSync(filePath, "utf-8");

    const lignes = data.split("\n").filter(line => line.trim() !== "");

    const result = lignes.map(line => {
        const champs = line.split("|");

        let obj = {};

        champs.forEach(champ => {
            const [key, value] = champ.split(":");

            if (key && value) {
                obj[key.trim()] = value.trim();
            }
        });

        return obj;
    });

    return Response.json({ content: result });
}
