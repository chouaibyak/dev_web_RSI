import { NextResponse } from "next/server";
import db from "../../../../lib/db";



export async function GET(req) {
    try {
        const [ rows ] = await db.query(
            "SELECT nom, longitude, latitude FROM etudiants	"
        );
        if(rows.length > 0){
            return NextResponse.json(rows);
        }
        return NextResponse.json({ error: "Étudiants non trouvé" }, { status: 404 });
    } catch(error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}