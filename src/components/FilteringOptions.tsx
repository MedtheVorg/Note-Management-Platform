import FilterByColor from './FilterByColor';
import { FilterByDate } from './FilterByDate';

export default function FilteringOptions() {
    return (
        <div className='flex items-center gap-x-4'>
            <FilterByColor />
            <FilterByDate />
        </div>
    );
}
