import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setOfferName } from '@/lib/features/packageAppFeatures/liftInfoSlice';
import { Input, Label } from 'semantic-ui-react';
import styles from "./styles.module.css"

// Yup ile şema tanımı
const validationSchema = Yup.object().shape({
  offerName: Yup.string()
    .min(3, 'Minimum 3 karakter girmelisiniz')
    .max(15, 'Maksimum 15 karakter girebilirsiniz')
    .required('Bu alan boş bırakılamaz'),
});

const OfferName = () => {
  const dispatch = useDispatch();
  const liftInfo = useSelector((state) => state.lift);

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(setOfferName(values.offerName));
    setSubmitting(false);
  };

  return (
    <div className={styles.projectName}>
      <Formik
        initialValues={{ offerName: liftInfo.offerName || '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Label htmlFor="offerName">Project Name</Label>
              <Field
                as={Input}
                type="text"
                name="offerName"
                id="offerName"
                placeholder="Enter project name"
              />
              <ErrorMessage name="offerName" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OfferName;
