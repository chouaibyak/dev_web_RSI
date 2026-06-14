import db from "../../../../../lib/db";
import { NextResponse } from "next/server";


export async function POST(req) {
    try{
        const { login, pass } = await req.json();

        if (!login || !pass) {
            return NextResponse.json({ message: "Login et mot de passe requis" }, { status: 400 });
        }

        //requet SQL pour verifier etudiant
        const [rows] = await db.query(
            "SELECT id, login, nom FROM etudiants WHERE login = ? AND pass = ?",
            [login, pass]
        );

        if(rows.length > 0){
            return NextResponse.json({ message: "connecté", user: rows[0]}, {status: 200});
        }else{
            return NextResponse.json({message: "Identifiants incorrects"}, {status:401});
        }


    }catch(error){
        return NextResponse.json({message: "Erreur serveur", error: error.message}, {status:500});
    }
}
