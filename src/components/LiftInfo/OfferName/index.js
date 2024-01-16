"use client"
import ElexiaInput from '@/components/Input';
import React from 'react';
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { setOfferName } from '@/lib/features/packageAppFeatures/liftInfoSlice';


export default function OfferName() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  const handleOfferName = (event) => {
      dispatch(
      setOfferName(event.target.value)); // Eğer input alanında göstermek istiyorsanız, state'i güncelleyin
  };
  return (
    <div  className={styles.projectName} >
      <ElexiaInput  
      labelName="Project Name" 
      inputPlaceholder="Write Project Name Here !"
      value={liftInfo.offerName} // Input alanına değeri atamak için state'i kullanın
     handleChange={handleOfferName}
      ></ElexiaInput>

 </div>
  );
}
