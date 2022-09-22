import { getTasks } from "../api/Task";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    task: [],
    status: 'idle',
    error: null
  }
export const obtenerTaskAccion = createAsyncThunk('task/fetchTasks', async () => {
    const response = await getTasks();
    return response.res;
  })

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      // omit existing reducers here
    },
    extraReducers(builder) {
      builder
        .addCase(obtenerTaskAccion.pending, (store, action) => {
          store.status = 'loading'
        })
        .addCase(obtenerTaskAccion.fulfilled, (store, action) => {
          store.status = 'succeeded'
          // Add any fetched posts to the array
          store.task = store.task.concat(action.payload)
        })
        .addCase(obtenerTaskAccion.rejected, (store, action) => {
          store.status = 'failed'
          store.error = action.error.message
        })
    }
  })

  export default taskSlice.reducer;

  export const selectAllTask = store => store.task.task;