import { NoteModel } from '@/models/Note';
import connectDb from '@/utils/lib/mongo';
import { isValidObjectId } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    req: NextRequest,
    { params: { noteId } }: { params: { noteId: string } }
) {
    await connectDb();

    try {
        if (!isValidObjectId(noteId)) {
            return NextResponse.json(
                { message: 'invalid Note ID' },
                { status: 400 }
            );
        }
        const note = await NoteModel.findByIdAndUpdate(
            { _id: noteId },
            { isArchived: false },
            { new: true }
        );
        if (!note) {
            return NextResponse.json(
                { message: 'Note not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ restoredNote: note }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
