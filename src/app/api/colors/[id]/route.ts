import { Color } from '@/models/Color';
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
                { message: 'note not found' },
                { status: 400 }
            );
        }
        const color = await Color.findById({ _id: id });
        if (!color) {
            return NextResponse.json(
                { message: 'color not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ color }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

// Delete color by id
export async function DELETE(
    req: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    await connectDb();
    try {
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { message: 'note not found' },
                { status: 400 }
            );
        }
        const color = await Color.findByIdAndDelete({ _id: id });
        if (!color) {
            return NextResponse.json(
                { message: 'color not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
