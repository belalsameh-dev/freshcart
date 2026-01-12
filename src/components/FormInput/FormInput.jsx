import "./FormInput.css";

function FormInput({formik, inputName, inputType, labelText, children}) {
  const {values, touched, errors, handleBlur, handleChange} = formik;
  return (
    <>
      <div className="form-group">
        <input 
          value={values[inputName]} 
          onBlur={handleBlur}
          onChange={handleChange} 
          id={inputName}
          name={inputName}
          type={inputType}
          className={`form-control ${touched[inputName] && errors[inputName] && "border-danger"}`} 
          placeholder=" "
        />
        <label htmlFor={inputName} className={touched[inputName] && errors[inputName] && "text-danger"}>{labelText}</label>
        {children}
      </div>
      { touched[inputName] && errors[inputName] && <div className="error-msg text-danger">{ errors[inputName] }</div> }
    </>
  );
}

export default FormInput;
