import { Note } from '@/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface NotesState {
    status: boolean;
    notes: Note[];
    filterNotesByColor: string;
    filterNotesByDate: {
        from?: number;
        to?: number;
    };
    filterNotesByContent: string;
}

const initialState: NotesState = {
    status: false,
    notes: [],
    filterNotesByColor: '',
    filterNotesByDate: {},
    filterNotesByContent: '',
};

export const getNotes = createAsyncThunk('note/getNotes', async () => {
    try {
        const response = await fetch(`/api/notes`);
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        return response.json();
    } catch (error) {
        console.log('🚀 ~ getNotes ~ error:', error);
    }
});

export const createNote = createAsyncThunk(
    'note/createNote',
    async (noteInput: { content: string; color: string }) => {
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                body: JSON.stringify(noteInput),
            });
            if (!response.ok) {
                throw new Error('Failed to create note');
            }
            return response.json();
        } catch (error) {
            console.log('🚀 ~ note/createNote:', error);
        }
    }
);
export const updateNote = createAsyncThunk(
    'note/updateNote',
    async ({
        id,
        content,
        color,
    }: {
        id: string;
        content: string;
        color: string;
    }) => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ content, color }),
            });
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            return response.json();
        } catch (error) {
            console.log('🚀 ~ updateNote ~ error:', error);
        }
    }
);
export const restoreNote = createAsyncThunk(
    'note/restoreNote',
    async (id: string) => {
        try {
            const response = await fetch(`/api/notes/restore/${id}`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Failed to restore note');
            }
            return response.json();
        } catch (error) {
            console.log('🚀 ~ updateNote ~ error:', error);
        }
    }
);

export const deleteNote = createAsyncThunk(
    'note/deleteNote',
    async (id: string) => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete note');
            }
            return response.json();
        } catch (error) {
            console.log('🚀 ~ updateNote ~ error:', error);
        }
    }
);

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        filterNotesByColor(state, action) {
            state.filterNotesByColor = action.payload;
        },
        filterNotesByDate(state, action) {
            state.filterNotesByDate = action.payload;
        },
        filterNotesByContent(state, action) {
            state.filterNotesByContent = action.payload;
        },
    },
    extraReducers: (builder) => {
        // get notes
        builder.addCase(getNotes.pending, (state, action) => {
            state.status = false;
        });
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.notes = action.payload.notes;
        });
        builder.addCase(getNotes.rejected, (state, action) => {
            state.status = false;
        });
        // create note
        builder.addCase(createNote.fulfilled, (state, action) => {
            state.notes.push(action.payload.createdNote);
        });
        // update note
        builder.addCase(updateNote.fulfilled, (state, action) => {
            const updatedNoteIndex = state.notes.findIndex(
                (note) => note._id === action.payload.updatedNote._id
            );
            if (updatedNoteIndex !== -1) {
                state.notes[updatedNoteIndex] = action.payload.updatedNote;
            }
        });
        //delete note (archive)
        builder.addCase(deleteNote.fulfilled, (state, action) => {
            const deletedNoteIndex = state.notes.findIndex(
                (note) => note._id === action.payload.deletedNote.id
            );
            if (deletedNoteIndex !== -1) {
                state.notes[deletedNoteIndex].isArchived = true;
            }
        });
        // restore note (from archive)
        builder.addCase(restoreNote.fulfilled, (state, action) => {
            console.log('🚀 ~ builder.addCase ~ action:', action);
            const restoredNoteIndex = state.notes.findIndex(
                (note) => note._id === action.payload.restoredNote.id
            );
            if (restoredNoteIndex !== -1) {
                state.notes[restoredNoteIndex].isArchived = false;
            }
        });
    },
});

export default notesSlice.reducer;
export const { filterNotesByColor, filterNotesByContent, filterNotesByDate } =
    notesSlice.actions;
