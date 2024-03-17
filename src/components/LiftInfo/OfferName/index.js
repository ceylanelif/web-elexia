import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOfferName } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import styles from "./styles.module.css";
import * as Yup from 'yup';
import ElexiaInput from '@/components/Input';

// Yup ile şema tanımı
const validationSchema = Yup.object().shape({
  offerName: Yup.string()
    .min(3, 'Min 3 character limit')
    .max(15, 'Max 15 character limit')
    .required('This field is required'),
});
console.log(validationSchema);
const OfferName = () => {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);

  const handleChange = (e, setFieldValue) => {
    const { value } = e.target;
    setFieldValue('offerName', value);
    dispatch(setOfferName(value));
  };

  const initialValues = {
    offerName: liftInfo.offerName !== null && liftInfo.offerName !== undefined ? liftInfo.offerName : ''
  };
  

  return (
    <div className={styles.projectName}>
      <ElexiaInput
        handleChange={handleChange} 
        labelName={"OfferName"} 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        fieldName={"offerName"} 
        inputPlaceholder={"Offer Name"} 
        type={"text"}
      />
    </div>
  );
};

export default OfferName;
