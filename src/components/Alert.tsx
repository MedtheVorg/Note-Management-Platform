'use client';
import { X } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '@/app/Redux/slices/notesSlice';

export default function Alert({ noteID }: { noteID: string }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();
    //delete note
    function archiveNote() {
        //@ts-ignore
        dispatch(deleteNote(noteID));
    }
    return (
        <AlertDialog open={isDialogOpen}>
            <AlertDialogTrigger
                asChild
                onClick={() => setIsDialogOpen(true)}
            >
                <X
                    size={25}
                    className='rounded-full p-1 absolute top-1 right-1 cursor-pointer  transition-all duration-500 hover:rotate-45'
                />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the note.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={archiveNote}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
