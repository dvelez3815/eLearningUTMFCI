import { getProgress} from "../api/Progress";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
    progress: [],
    status: 'idle',
    error: null
  }


export const obtenerProgresoAccion = createAsyncThunk('progress/fetchProgress', async (id) => {
    const response = await getProgress(id);
    return response;
})


const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
      // omit existing reducers here
    },
    extraReducers(builder) {
      builder
        .addCase(obtenerProgresoAccion.pending, (store, action) => {
          store.status = 'loading'
        })
        .addCase(obtenerProgresoAccion.fulfilled, (store, action) => {
          store.status = 'succeeded'
          // Add any fetched posts to the array
          store.progress = store.progress.concat(action.payload)
        })
        .addCase(obtenerProgresoAccion.rejected, (store, action) => {
          store.status = 'failed'
          store.error = action.error.message
        });
    }
  })

  export default progressSlice.reducer;

  export const selectAllProgress = store => store.progress.progress;