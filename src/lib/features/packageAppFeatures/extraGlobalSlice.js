import { ShaftConstantDatas } from '@/functions/CapacityCalculator/constData';
import { createSlice } from '@reduxjs/toolkit';

const constantData= ShaftConstantDatas;
const extraGlobalSlice = createSlice({
    name: 'extraGlobal',
    initialState: {
    otherGlobalLandingDoor: false,
    constantData: constantData,
    },
    reducers: {
        setGlobalOtherLandingDoor: (state, action) => {
            state.otherLandingDoor = action.payload;
        },    
    },
});

export const { setGlobalOtherLandingDoor } = extraGlobalSlice.actions;
export default extraGlobalSlice.reducer;
