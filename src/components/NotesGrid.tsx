'use client';
import { RootState } from '@/app/Redux/store';
import { Note } from '@/types';
import NoteCard from './NoteCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNotes } from '@/app/Redux/slices/notesSlice';
import { isSameDay, isWithinInterval } from 'date-fns';

export default function NotesGrid({
    archivedNotes = false,
    message,
}: {
    archivedNotes?: boolean;
    message: string;
}) {
    const dispatch = useDispatch();
    const {
        notes,
        filterNotesByColor,
        filterNotesByContent,
        filterNotesByDate,
    } = useSelector((state: RootState) => state.notes);

    const filteredNotes = notes
        .filter((note) => note.isArchived == archivedNotes)
        .filter((note) =>
            filterNotesByColor
                ? note.color.hex.includes(filterNotesByColor)
                : true
        )
        .filter((note) =>
            filterNotesByContent
                ? note.content.includes(filterNotesByContent)
                : true
        )
        .filter((note) => {
            return filterNotesByDate.from && filterNotesByDate.to
                ? isWithinInterval(new Date(note.createdAt).getTime(), {
                      start: filterNotesByDate.from,
                      end: filterNotesByDate.to,
                  }) ||
                      isSameDay(
                          new Date(note.createdAt),
                          new Date(filterNotesByDate.from)
                      ) ||
                      isSameDay(
                          new Date(note.createdAt),
                          new Date(filterNotesByDate.to)
                      )
                : true;
        });

    useEffect(() => {
        //@ts-ignore
        dispatch(getNotes());
    }, [dispatch]);
    return (
        <>
            {filteredNotes?.length > 0 ? (
                <div className='grid grid-cols-4 gap-4 p-8 overflow-auto'>
                    {filteredNotes.map((note: Note) => (
                        <NoteCard
                            key={note._id}
                            {...note}
                        />
                    ))}
                </div>
            ) : (
                <div className='flex items-start justify-center h-screen bg-neutral-100'>
                    <p className='mt-8 text-2xl font-bold'>{message}</p>
                </div>
            )}
        </>
    );
}
