import db from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = new URL(req.url).searchParams;
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

    try {
        const [rows] = await db.query('SELECT * FROM etudiants WHERE id = ?', [id]);
        if (rows.length > 0) {
        return NextResponse.json(rows[0]);
        }
        return NextResponse.json({ error: "Étudiant non trouvé" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
