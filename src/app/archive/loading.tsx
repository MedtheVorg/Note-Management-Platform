import Logo from '@/components/Logo';
import { Loader } from 'lucide-react';

export default function loading() {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Logo className='  animate-bounce border-none ' />
        </div>
    );
}
