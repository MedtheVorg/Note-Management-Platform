'use client';
import { PaintBucket, Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { FormEvent, useState } from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { useDispatch } from 'react-redux';
import { createColor, getColors } from '@/app/Redux/slices/colorSlice';

export default function ColorPalette() {
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);
    const [color, setColor] = useColor('#561ecb');
    const dispatch = useDispatch();

    const addColor = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //@ts-ignore
        dispatch(createColor(color.hex));
        setIsPaletteOpen(false);
    };

    return (
        <Dialog open={isPaletteOpen}>
            <DialogTrigger asChild>
                <Button
                    className='p-2 w-full'
                    onClick={() => setIsPaletteOpen(true)}
                >
                    <Plus size={20} />
                    <PaintBucket size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new color.</DialogTitle>
                </DialogHeader>
                <form onSubmit={addColor}>
                    <div className='my-6'>
                        <ColorPicker
                            color={color}
                            onChange={setColor}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            className='p-2 w-full'
                            type='submit'
                        >
                            add
                        </Button>
                        <Button
                            className='p-2 w-full'
                            type='button'
                            onClick={() => setIsPaletteOpen(false)}
                        >
                            close
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
