import { NoteModel } from '@/models/Note';
import connectDb from '@/utils/lib/mongo';
import { DocumentType } from '@typegoose/typegoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: any) {
    await connectDb();
    try {
        // const body = await req.json()
        // const { page } = body
        // const limit = 2
        // const skip = (page - 1) * limit

        // const notes = await Note.find().skip(skip).limit(limit).populate("color").exec()
        const notes = await NoteModel.find().populate('color').exec();

        return NextResponse.json({ notes });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

// Create new note
export async function POST(req: NextRequest) {
    await connectDb();

    try {
        //parse body payload
        const body = await req.json();
        let newNote: DocumentType<typeof NoteModel> = await NoteModel.create(
            body
        );
        newNote.populate('color');
        return NextResponse.json({ createdNote: newNote }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
