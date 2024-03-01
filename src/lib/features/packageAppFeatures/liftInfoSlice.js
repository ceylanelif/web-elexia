import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shaftWidth: 1450,
  shaftDepth: 2100,
  overhead: 3000,
  travelDistance: 16000,
  pit: 1000,
  machineRoom: true,
  ropeType: "2:1",
  speed: 1,
  stop:5,
  offerName:null,
  offerId:null,
};

export const liftInfoSlice = createSlice({
  name: 'lift',
  initialState,
  reducers: {
    setShaftWidth: (state, action) => {
      state.shaftWidth = action.payload;
    },
    setShaftDepth: (state, action) => {
      state.shaftDepth = action.payload;
    },
    setOverhead: (state, action) => {
      state.overhead = action.payload;
    },
    setTravelDistance: (state, action) => {
      state.travelDistance = action.payload;
    },
    setPit: (state, action) => {
      state.pit = action.payload;
    },
    setMachineRoom: (state, action) => {
      state.machineRoom = action.payload;
    },
    setRopeType: (state, action) => {
      state.ropeType = action.payload;
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setStop: (state, action) => {
      state.stop = action.payload;
    },
    setFloor: (state, action) => {
      state.floor = action.payload;
    },
    setOfferName: (state, action) => {
      state.offerName = action.payload;
    },
    setOfferId: (state, action) => {
      state.offerId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShaftWidth,
  setShaftDepth,
  setOverhead,
  setTravelDistance,
  setPit,
  setMachineRoom,
  setRopeType,
  setSpeed,
  setStop,
  setFloor,
  setOfferName,
  setOfferId
} = liftInfoSlice.actions;

export default liftInfoSlice.reducer;