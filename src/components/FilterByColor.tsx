'use client';
import { ChevronDownIcon, CircleIcon } from '@radix-ui/react-icons';

import { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { FaPalette } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { getColors } from '@/app/Redux/slices/colorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';
import { filterNotesByColor } from '@/app/Redux/slices/notesSlice';

export default function FilterByColor() {
    const dispatch = useDispatch();
    const { colors } = useSelector((state: RootState) => state.colors);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        //@ts-ignore
        dispatch(getColors());
    }, []);
    useEffect(() => {
        dispatch(filterNotesByColor(selectedColor));
    }, [selectedColor]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                    <span className='mr-2 flex items-center justify-center gap-x-2  '>
                        <FaPalette /> Filter by Color
                    </span>
                    <ChevronDownIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                >
                    {colors?.length > 0 ? (
                        colors?.map((color) => (
                            <DropdownMenuRadioItem
                                value={color.hex}
                                key={color._id}
                            >
                                <div
                                    className={cn(
                                        'inline-flex h-5 w-5 items-center justify-center rounded-full a text-xs text-gray-600 bg-gray-700'
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                ></div>
                            </DropdownMenuRadioItem>
                        ))
                    ) : (
                        <DropdownMenuItem>its gray in here</DropdownMenuItem>
                    )}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button
                        className='w-full'
                        onClick={() => setSelectedColor(undefined)}
                    >
                        Reset
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
