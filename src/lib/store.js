'use client';
import { configureStore } from '@reduxjs/toolkit';
import liftInfoSlice from './features/packageAppFeatures/liftInfoSlice';
import doorSlice from './features/packageAppFeatures/doorSlice';
import selectedOptionsSlice from './features/packageAppFeatures/selectedOptionsSlice';
import productSlice from './features/packageAppFeatures/productSlice';
import extraGlobalSlice from './features/packageAppFeatures/extraGlobalSlice';
import ctwSlice from './features/packageAppFeatures/ctwSlice';

export const store = configureStore({
    reducer: {
        door:doorSlice,
        lift:liftInfoSlice,
        selectedOptions:selectedOptionsSlice,
        product:productSlice,
        extraGlobal:extraGlobalSlice,
        ctw:ctwSlice,

    }
})
