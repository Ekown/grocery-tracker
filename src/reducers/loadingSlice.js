import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        value: false,
    },
    reducers: {
        setLoading: (state, action) => {
            console.log('setLoading: ', action.payload);
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer