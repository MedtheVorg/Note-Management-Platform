import { Color } from '@/models/Color';
import connectDb from '@/utils/lib/mongo';
import { NextRequest, NextResponse } from 'next/server';

// Get all colors
export async function GET(req: NextRequest) {
    await connectDb();
    try {
        const colors = await Color.find().exec();
        return NextResponse.json({ colors });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}



// Create new Color
export async function POST(req: NextRequest) {
    await connectDb();

    try {
        const body = await req.json();
        const newColor = await Color.create(body);
        return NextResponse.json({ createdColor: newColor }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
