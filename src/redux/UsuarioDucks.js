/* import { registerUser } from "../api/User";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: [],
    status: 'idle',
    error: null
  }
export const registrarUsuarioAccion = createAsyncThunk('user/fetchUserRegister', async (data) => {
    const response = await registerUser(data);
    return response;
  })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      // omit existing reducers here
    },
    extraReducers(builder) {
      builder
        .addCase(registrarUsuarioAccion.pending, (store, action) => {
          store.status = 'loading'
        })
        .addCase(registrarUsuarioAccion.fulfilled, (store, action) => {
          store.status = 'succeeded'
          // Add any fetched posts to the array
          store.user.push() = store.user.concat(action.payload)
        })
        .addCase(registrarUsuarioAccion.rejected, (store, action) => {
          store.status = 'failed'
          store.error = action.error.message
        })
    }
  })

  export default userSlice.reducer;

  export const selectAllUser = store => store.user.user; */