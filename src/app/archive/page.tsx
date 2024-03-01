import Logo from '@/components/Logo';
import NotesGrid from '@/components/NotesGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Archive | Notes Management Platform',
};

export default async function ArchivePage() {
    return (
        <main className='overflow-auto'>
            <NotesGrid
                archivedNotes={true}
                message='Delete a note and come back.'
            />
        </main>
    );
}
