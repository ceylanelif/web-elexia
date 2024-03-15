"use client"
import React, { useState } from 'react';
import styles from "./styles.module.css"
import InputSpan from '@/components/InputSpan';
import { useDispatch, useSelector } from 'react-redux';
import { setOverhead, setPit, setTravelDistance } from '@/lib/features/packageAppFeatures/liftInfoSlice';

export default function PitOhTravel() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  const handleOverhead = (event) => {
    dispatch(
      setOverhead(event.target.value));
  };

  const handleTravel = (event) => {
    dispatch(
      setTravelDistance(event.target.value))
    };

    const handlePit = (event) => {
      dispatch(
        setPit(event.target.value));
    };
    return (
      <div className={styles.pitOhTravelWrapper}>

        <div><InputSpan value={liftInfo.overhead} handleChange={handleOverhead} labelName="Overhead" inputPlaceholder="Overhead" spanPlaceholder={"mm"} ></InputSpan></div>
        <div><InputSpan value={liftInfo.travelDistance} handleChange={handleTravel} labelName="Travel Distance" inputPlaceholder="Travel Distance" spanPlaceholder={"mm"} ></InputSpan></div>
        <div><InputSpan value={liftInfo.pit} handleChange={handlePit} labelName="Pit" inputPlaceholder="Pit" spanPlaceholder={"mm"} ></InputSpan></div>

      </div>
    );
  }
