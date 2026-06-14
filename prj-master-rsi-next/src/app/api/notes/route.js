import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(req) {
    try {
        const { id, note1, note2 } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "ID manquant" }, { status: 400 });
        }

        const [rows] = await db.query(
            "SELECT note1, note2 FROM etudiants WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: "Etudiant introuvable" }, { status: 404 });
        }

        const newNote1 = note1 !== undefined ? Number(note1) : Number(rows[0].note1 || 0);
        const newNote2 = note2 !== undefined ? Number(note2) : Number(rows[0].note2 || 0);
        const moyenne = (newNote1 + newNote2) / 2;

        await db.query(
            "UPDATE etudiants SET note1 = ?, note2 = ?, moyenne = ? WHERE id = ?",
            [newNote1, newNote2, moyenne, id]
        );

        return NextResponse.json({
            message: "updated",
            note1: newNote1,
            note2: newNote2,
            moyenne,
        });
    } catch (error) {
        return NextResponse.json({ message: "Erreur serveur", error: error.message }, { status: 500 });
    }
}
