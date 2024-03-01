'use client';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteInputSchemaType, noteInputSchema } from '@/schemas/note.schema';
import { Textarea } from './ui/textarea';
import ColorPalette from './ColorSelect';
import { useDispatch } from 'react-redux';
import { createNote } from '@/app/Redux/slices/notesSlice';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const formHandler = useForm<NoteInputSchemaType>({
        resolver: zodResolver(noteInputSchema),
    });
    const addNote = (noteInput: NoteInputSchemaType) => {
        //@ts-ignore
        dispatch(createNote({ ...noteInput, isArchived: false }));
        router.push('/');
    };
    return (
        <Form {...formHandler}>
            <form
                onSubmit={formHandler.handleSubmit(addNote)}
                className='space-y-8 w-[50vw] shadow-xl p-8 rounded-md border-2'
            >
                <h1 className='text-xl'>Create note</h1>

                <FormField
                    control={formHandler.control}
                    name='content'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder='write your note content here...'
                                    {...field}
                                    rows={40}
                                    className='max-h-40'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formHandler.control}
                    name='color'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ColorPalette
                                    selectedColor={field.value}
                                    setSelectedColor={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    disabled={formHandler.formState.isLoading}
                >
                    submit
                </Button>
            </form>
        </Form>
    );
}
