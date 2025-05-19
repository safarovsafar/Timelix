import { createSlice } from '@reduxjs/toolkit';

const RoutineSlice = createSlice({
    name: "routineSlice",
    initialState: {
        loading: false,
        routineId: "",
        openTasks: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setRoutineId: (state, action) => {
            state.routineId = action.payload
        },
        setOpenTasks: (state, action) => {
            state.openTasks = action.payload
        }
    },
})

export const { setLoading, setRoutineId, setOpenTasks } = RoutineSlice.actions
const RoutineReducer = RoutineSlice.reducer
export default RoutineReducer