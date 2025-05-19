import RoutineReducer from "@/features/routine-slice/routine-slice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        routine: RoutineReducer
    }
})