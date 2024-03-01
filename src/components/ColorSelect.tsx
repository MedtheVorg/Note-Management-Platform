'use client';
import { cn } from '@/lib/utils';
import { ColorSelectProps } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';

export default function ColorSelect({
    selectedColor,
    setSelectedColor,
}: ColorSelectProps) {
    const { colors } = useSelector((state: RootState) => state.colors);

    return (
        <Select
            onValueChange={setSelectedColor}
            value={selectedColor}
        >
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Color' />
            </SelectTrigger>
            <SelectContent>
                {colors.length > 0 ? (
                    colors.map((color) => (
                        <SelectItem
                            value={color._id}
                            key={color._id}
                        >
                            <div
                                className={cn(
                                    'inline-flex h-5 w-[120px] items-center justify-center rounded-md   '
                                )}
                                style={{ backgroundColor: color.hex }}
                            ></div>
                        </SelectItem>
                    ))
                ) : (
                    <SelectItem value='null'>its gray in here</SelectItem>
                )}
            </SelectContent>
        </Select>
    );
}
