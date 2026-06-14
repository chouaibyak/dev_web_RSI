import db from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("image");

        if (!file) {
            return NextResponse.json(
                { error: "Image manquante" },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const name = file.name;
        const type = file.type;
        const size = file.size;
        const base64 = buffer.toString("base64");

        const [result] = await db.query(
            `INSERT INTO images (name, type, size, bin_img, data)
             VALUES (?, ?, ?, ?, ?)`,
            [name, type, size, base64, buffer]
        );

        return NextResponse.json({
            message: "Image uploadée",
            id: result.insertId,
        });

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const [rows] = await db.query(
            "SELECT id, name, type, size, bin_img, data FROM images"
        );

        const images = rows.map(img => ({
            id: img.id,
            name: img.name,
            type: img.type,
            size: img.size,
            base64: img.bin_img,
            data: img.data
                ? Buffer.from(img.data).toString("base64")
                : null
        }));

        return NextResponse.json({ images });

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}