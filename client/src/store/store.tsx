import { configureStore } from "@reduxjs/toolkit";
import {testApi} from './test-api'



export const store = configureStore({
    reducer: {
        [testApi.reducerPath]: testApi.reducer
    },
    middleware: (getDM) => getDM().concat(testApi.middleware)
})


