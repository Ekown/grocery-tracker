import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from '../reducers/loadingSlice'

export default configureStore({
    reducer: {
        loading: loadingSlice,
    },
})