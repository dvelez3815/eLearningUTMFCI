import { getQuestions } from "../api/Questions";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    questions: [],
    status: 'idle',
    error: null
}
export const obtenerQuestionsAccion = createAsyncThunk('questions/fetchQuestions', async (id) => {
    const response = await getQuestions(id);
    return response;
})

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(obtenerQuestionsAccion.pending, (store, action) => {
                store.status = 'loading'
            })
            .addCase(obtenerQuestionsAccion.fulfilled, (store, action) => {
                store.status = 'succeeded'
                // Add any fetched posts to the array
                store.questions = store.questions.concat(action.payload)
            })
            .addCase(obtenerQuestionsAccion.rejected, (store, action) => {
                store.status = 'failed'
                store.error = action.error.message
            })
    }
})

export default questionsSlice.reducer;

export const selectAllquestion = store => store.question.questions;