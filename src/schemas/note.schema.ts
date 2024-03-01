import { string, object, TypeOf } from 'zod';
export const noteInputSchema = object({
    content: string({ required_error: 'content cannot be empty' }).min(
        1,
        'content cannot be empty'
    ),
    color: string({ required_error: 'please choose a color' }),
});

export type NoteInputSchemaType = TypeOf<typeof noteInputSchema>;
