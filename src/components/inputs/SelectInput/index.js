import cls from "classnames";
import { debounce } from "lodash";
import { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import st from "./select-input.module.scss";

const SelectInput = ({
  onChange,
  value: propValue,
  label,
  options,
  className,
  name
}) => {
  const [value, setValue] = useState(propValue);
  const onChangeDebounce = useRef(debounce(onChange, 300));

  const handleOnChange = ev => {
    setValue(ev.target.value);
  }

  useEffect(() => {
    onChangeDebounce.current(value);
  }, [onChange, value])

  return (
    <div className={cls(st.inputContainer, className)}>
      <label htmlFor={name}>{label}</label>
      <select data-testid="select" onChange={handleOnChange}value={value} id={name} name={name}>
        {options.map((op, index) => <option value={op} key={index}>{op}</option>)}
      </select>
    </div>
  );
};

function areEqual(prevProps, nextProps) {
  return (
    prevProps.value === nextProps.value &&
    prevProps.className === nextProps.className
  );
}

SelectInput.defaultProps = { 
  onChange: () => {},
  value: undefined,
  label: undefined,
  options: [undefined],
  className: undefined,
};

SelectInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
};

export default memo(SelectInput, areEqual);
