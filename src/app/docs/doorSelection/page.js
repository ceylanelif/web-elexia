"use client"
import React, { useEffect } from 'react'
import DoorSelectionContainer from '@/containers/doorSelectionContainer'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDimensions } from '@/lib/features/packageAppFeatures/doorSlice';

export default function DoorSelectionPage() {
  
  const dispatch = useDispatch();

  const liftInfo = useSelector((state) => state.lift);
  const shaftWidthAsNumber = parseInt(liftInfo.shaftWidth);
  const workingSpace = 99; //kapı için şaft genişliğinden çalışma boşluğunun düşülmesi
  const shaftWidthWithWorkingSpace = shaftWidthAsNumber - workingSpace; // Database den talep edilen ölçü
  useEffect(() => {
    dispatch(fetchDimensions(shaftWidthWithWorkingSpace));
    
  }, [dispatch, shaftWidthWithWorkingSpace]);
  
  return (
    <div className='doorPage'>
      <DoorSelectionContainer/>
    </div>
  )
}
