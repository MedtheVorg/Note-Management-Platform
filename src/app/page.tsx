import NotesGrid from '@/components/NotesGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home | Notes Management Platform',
};
export default function Home() {
    return (
        <main className='overflow-auto'>
            <NotesGrid message='No notes found.' />
        </main>
    );
}
