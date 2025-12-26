import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'lib', 'database.json');

async function readDb() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Could not read database file:", error);
        return { teamMembers: [], aboutUsImage: {} };
    }
}

async function writeDb(data: any) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, id, url, name, quote } = body;

        const db = await readDb();

        if (type === 'teamMember') {
            if (!id) {
                return NextResponse.json({ message: 'ID anggota tim diperlukan' }, { status: 400 });
            }
            const memberIndex = db.teamMembers.findIndex((m: any) => m.id === id);
            if (memberIndex === -1) {
                return NextResponse.json({ message: 'Anggota tim tidak ditemukan' }, { status: 404 });
            }
            
            // Only update fields if they are provided in the request
            if (name) {
                db.teamMembers[memberIndex].name = name;
            }
            if (quote) {
                db.teamMembers[memberIndex].quote = quote;
            }
            if (url) {
                db.teamMembers[memberIndex].image = url;
            }

        } else if (type === 'aboutUsImage') {
            if (!url) {
                return NextResponse.json({ message: 'URL gambar diperlukan' }, { status: 400 });
            }
            db.aboutUsImage.url = url;
        } else {
             return NextResponse.json({ message: 'Tipe konten tidak valid' }, { status: 400 });
        }

        await writeDb(db);

        return NextResponse.json({ message: 'Konten berhasil diperbarui' });

    } catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({ message: 'Terjadi kesalahan internal server' }, { status: 500 });
    }
}
