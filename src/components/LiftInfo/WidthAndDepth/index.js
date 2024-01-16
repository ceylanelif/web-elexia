"use client"
import InputSpan from '@/components/InputSpan';
import { setShaftDepth, setShaftWidth } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function WidthAndDepth() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  const handleDepth = (event) => {
      dispatch(
      setShaftDepth(event.target.value)); // Eğer input alanında göstermek istiyorsanız, state'i güncelleyin
  };

  const handleWidth = (event) => {
    dispatch(
    setShaftWidth(event.target.value)); // Eğer input alanında göstermek istiyorsanız, state'i güncelleyin
};

  return (
    <div className="widthDepth">
    <InputSpan value={liftInfo.shaftWidth} handleChange={handleWidth} placeholder="Shaft Width" labelName="Shaft Width" spanPlaceholder="mm"></InputSpan>
    <InputSpan value={liftInfo.setShaftDepth} handleChange={handleDepth} placeholder="Shaft Depth" labelName="Shaft Depth" spanPlaceholder="mm"></InputSpan>
     
     </div>
  );
}
