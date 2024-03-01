import FilteringOptions from './FilteringOptions';
import Logo from './Logo';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <header className='flex items-center justify-between px-16 p-4 border-b shadow-lg '>
            <SearchBar />
            <NavMenu />
            <FilteringOptions />
        </header>
    );
}
