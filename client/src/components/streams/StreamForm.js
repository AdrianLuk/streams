import React, { useRef, useEffect, forwardRef } from "react";
import { Formik, Form, useField, ErrorMessage } from "formik";

const TextField = forwardRef(({ label, ...props }, ref) => {
  const [field, meta] = useField(props);
  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input ref={ref} {...field} {...props} autoComplete="off" />
      <ErrorMessage name={field.name}>
        {msg => (
          <div className="ui error message">
            <div className="header">{msg}</div>
          </div>
        )}
      </ErrorMessage>
    </div>
  );
});
const StreamForm = ({ handleSubmit, initialValues }) => {
  const titleRef = useRef();
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  return (
    <Formik
      onSubmit={(values, actions) => {
        handleSubmit(values);
      }}
      validate={validate}
      initialValues={initialValues || { title: "", description: "" }}
    >
      <Form className={`ui form error`}>
        <TextField
          ref={titleRef}
          name="title"
          type="text"
          label="Enter Title"
        />
        <TextField name="description" type="text" label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </Form>
    </Formik>
  );
};
const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default StreamForm;
