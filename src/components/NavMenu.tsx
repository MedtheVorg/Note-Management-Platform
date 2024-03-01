import Link from 'next/link';
import FilterByColor from './FilterByColor';
import { FilterByDate } from './FilterByDate';

export default function NavMenu() {
    return (
        <nav>
            <ul className='flex items-center gap-x-4'>
                <li>
                    <Link
                        className='hover:text-blue-500 transition-colors duration-400 ease-in-out font-semibold'
                        href={'/'}
                    >
                        Home
                    </Link>
                </li>

                <li>
                    <Link
                        className='hover:text-blue-500 transition-colors duration-400 ease-in-out font-semibold'
                        href={'/archive'}
                    >
                        Archive
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
