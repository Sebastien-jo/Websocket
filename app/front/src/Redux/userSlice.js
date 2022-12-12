import {createSlice} from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            Object.assign(state, action.payload);
        },
        unsetUser: (state) => {
            state.user = null
        }
    }


});

export const {setUser, unsetUser} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;

