import cls from "classnames";
import { debounce } from "lodash";
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";

import st from "./basic-input.module.scss";

const BasicInput = forwardRef(({
  onChange,
  value: propValue = "",
  valid: propValid,
  validator,
  label,
  type = "text",
  placeholder,
  className,
  name
}, ref) => {
  //refs
  const compRef = useRef(null);
  const toValidate = useRef(false);
  const onChangeDebounce = useRef(debounce(onChange, 300));

  //state
  const [value, setValue] = useState(propValue);
  const [isValid, setIsValid] = useState(true);
  
  const valid = validator ? isValid : propValid;

  //hooks
  useImperativeHandle(ref, () => ({
    validate: () => {
      let vf = false;
      if (validator) {
        vf = validator(value);
      } else {
        vf = value && value !== "";
      }
      if (vf) {
        setIsValid(true);
        return true;
      }
      toValidate.current = true;
      setIsValid(false);
      return false;
    },
    component: compRef,
  }));

  useEffect(() => {
    if (validator && (!ref || toValidate.current)) {
      const isLValid = validator(value);
      setIsValid(isLValid);
      if (isLValid) toValidate.current = false;
    }
  }, [ref, validator, value]);

  useEffect(() => {
    onChangeDebounce.current(value);
  }, [onChange, value])

  //handlers
  const handleOnChange = ev => {
    setValue(ev.target.value);
  }
  
  //render
  return (
    <div 
      className={cls(st.inputContainer, className, {[st.invalid]: !valid})}>
      <label htmlFor={name}>{label}</label>
      <input 
        ref={compRef}
        onChange={handleOnChange} 
        value={value} 
        type={type} 
        id={name} 
        name={name} 
        placeholder={placeholder} />
    </div>
  );
});

function areEqual(prevProps, nextProps) {
  return (
    prevProps.value === nextProps.value &&
    prevProps.className === nextProps.className
  );
}

BasicInput.defaultProps = { 
  onChange: () => {},
  value: undefined,
  valid: true,
  validator: undefined,
  label: undefined,
  type: undefined,
  placeholder: undefined,
  className: undefined,
};

BasicInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  valid: PropTypes.bool,
  validator: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default memo(BasicInput, areEqual);
