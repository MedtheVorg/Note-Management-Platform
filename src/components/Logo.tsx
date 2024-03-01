import { cn } from '@/lib/utils';
import { LogoProps } from '@/types';
import { prop } from '@typegoose/typegoose';
import { FaPencilRuler } from 'react-icons/fa';

export default function Logo({ className, ...props }: LogoProps) {
    return (
        <div
            className={cn('flex items-center ', className)}
            {...prop}
        >
            <FaPencilRuler size={40} />
            <span className='font-bold text-xl'>Notes</span>
        </div>
    );
}
