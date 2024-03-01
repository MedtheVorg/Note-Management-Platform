'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NoteInputSchemaType, noteInputSchema } from '@/schemas/note.schema';
import { Textarea } from './ui/textarea';
import ColorPalette from './ColorSelect';
import { Button } from './ui/button';
import { RootState } from '@/app/Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { notFound, useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { updateNote } from '@/app/Redux/slices/notesSlice';

export default function EditForm({ id }: { id: string }) {
    const { notes } = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch();
    const router = useRouter();
    const note = notes.find((note) => {
        return note._id === id;
    });
    const formHandler = useForm<NoteInputSchemaType>({
        resolver: zodResolver(noteInputSchema),
        defaultValues: {
            content: note?.content,
            color: note?.color._id,
        },
    });

    const createNote = (values: NoteInputSchemaType) => {
        dispatch(
            //@ts-ignore
            updateNote({ id, color: values.color, content: values.content })
        );

        router.push('/');
    };

    return !note ? (
        notFound()
    ) : (
        <div>
            <Form {...formHandler}>
                <form
                    onSubmit={formHandler.handleSubmit(createNote)}
                    className='space-y-8 w-[50vw] shadow-xl p-8 rounded-md border-2'
                >
                    <h1 className='text-xl'>Edit note</h1>

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
                    <Button type='submit'>
                        {formHandler.formState.isLoading ? (
                            <Loader />
                        ) : (
                            'update'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
