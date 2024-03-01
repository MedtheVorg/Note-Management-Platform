import Logo from './Logo';
import { Button } from './ui/button';
import Link from 'next/link';
import { FilePlus} from 'lucide-react';
import ColorPalette from './ColorPalette';

export default function SideBar() {
    return (
        <div className='flex flex-col h-full'>
            <Logo />
            <div className='grow p-2 mt-6 flex flex-col space-y-6'>
                <Link href='/create'>
                    <Button className='p-2 w-full'>
                        <FilePlus size={20} />
                    </Button>
                </Link>
                <ColorPalette />
            </div>
        </div>
    );
}
