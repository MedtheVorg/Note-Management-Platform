import { NoteModel } from '@/models/Note';
import connectDb from '@/utils/lib/mongo';
import { isValidObjectId } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Get note by id
export async function GET(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    await connectDb();
    try {
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { message: 'invalid Note ID' },
                { status: 400 }
            );
        }
        const note = await NoteModel.findById({ _id: id });
        if (!note) {
            return NextResponse.json(
                { message: 'Note not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ note }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

//update note by id
export async function PATCH(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    await connectDb();

    try {
        const updateBody = await req.json();

        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { message: 'invalid Note ID' },
                { status: 400 }
            );
        }
        const note = await NoteModel.findByIdAndUpdate(
            { _id: id },
            { ...updateBody },
            { new: true }
        );
        if (!note) {
            return NextResponse.json(
                { message: 'Note not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ updatedNote: note }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

// delete note by id
export async function DELETE(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    await connectDb();
    try {
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { message: 'invalid Note ID' },
                { status: 400 }
            );
        }
        const note = await NoteModel.findByIdAndUpdate(
            { _id: id },
            { isArchived: true }
        );
        if (!note) {
            return NextResponse.json(
                { message: 'Note not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ deletedNote: { id: id }, status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
