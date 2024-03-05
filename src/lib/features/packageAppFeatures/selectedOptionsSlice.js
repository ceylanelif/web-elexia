import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  DoorDimension: null,
  Capacity: null,
  CabinDoor: {amount:1,cabinDoor:null},
  LandingDoor: {amount:null,landingDoor:null},
  OtherLandingDoor: {amount:null,otherLandingDoor:null},
  CabinSize: {width:null,depth:null},
  Motor: null,
  CommandBox: null,
  Cop: null,
  Lop: null,
  Cabin: null,
  Floor:null,
  Ceiling:null,  
};

const selectedOptionsSlice = createSlice({
  name: 'selectedOptions',
  initialState,
  reducers: {
    setDoorDimension: (state, action) => {
      state.DoorDimension = action.payload;
    },
    setCapacity: (state, action) => {
      state.Capacity = action.payload;
    },
    setCabinDoor: (state, action) => {
      state.CabinDoor.cabinDoor = action.payload;
    },
    setCabinDoorAmount: (state, action) => {
      state.CabinDoor.amount = action.payload;
    },
    setLandingDoor: (state, action) => {
      state.LandingDoor.landingDoor = action.payload;
    },
    setLandingAmount: (state, action) => {
      state.LandingDoor.amount = action.payload;
    },
    setOtherLandingDoor: (state, action) => {
      state.OtherLandingDoor.otherLandingDoor = action.payload;
    },
    setOtherLandingAmount: (state, action) => {
      state.OtherLandingDoor.amount = action.payload;
    },
    setCabinWidth: (state, action) => {
      state.CabinSize.width = action.payload;
    },
    setCabinDepth: (state, action) => {
      state.CabinSize.depth = action.payload;
    },
    setMotor: (state, action) => {
      state.Motor = action.payload;
    },
    setCommanBox: (state, action) => {
      state.CommandBox = action.payload;
    },
    setCop: (state, action) => {
      state.Cop = action.payload;
    },
    setLop: (state, action) => {
      state.Lop = action.payload;
    },
    setCabin: (state, action) => {
      state.Cabin = action.payload;
    },
    setFloor: (state, action) => {
      state.Floor = action.payload;
    },
    setCeiling: (state, action) => {
      state.Ceiling = action.payload;
    },
  },
});

export const {
  setDoorDimension,
  setCapacity,
  setDoor,
  setLandingDoor,
  setLandingAmount,
  setOtherLandingDoor,
  setOtherLandingAmount,
  setCabinDoorAmount,
  setCabinDoor,
  setCabinWidth,
  setCabinDepth,
  setMotor,
  setCommanBox,
  setCop,
  setLop,
  setCabin,
  setCeiling,
  setFloor
} = selectedOptionsSlice.actions;
export default selectedOptionsSlice.reducer;
