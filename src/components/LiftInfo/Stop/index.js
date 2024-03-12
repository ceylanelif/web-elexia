import ElexiaInput from '@/components/Input'
import { setStop } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Stop() {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);
  const handleStop = (event) => {
      dispatch(
      setStop(event.target.value)); // Eğer input alanında göstermek istiyorsanız, state'i güncelleyin
  };
  return (
    <div className='stops'>
      <ElexiaInput 
      type={"number"}
      min={2}
      max={32} 
      required={true}
      value={liftInfo.stop} 
      handleChange={handleStop} 
      labelName="Number of Stops" 
      inputPlaceholder="Stop"></ElexiaInput>
    </div>
    )

}
