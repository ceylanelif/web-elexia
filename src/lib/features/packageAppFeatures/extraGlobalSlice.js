import { createSlice } from '@reduxjs/toolkit';

const extraGlobalSlice = createSlice({
    name: 'extraGlobal',
    initialState: {
    otherGlobalLandingDoor: false,


    },
    reducers: {
        setGlobalOtherLandingDoor: (state, action) => {
            state.otherLandingDoor = action.payload;
        },    
    },
});

export const { setGlobalOtherLandingDoor } = extraGlobalSlice.actions;
export default extraGlobalSlice.reducer;
