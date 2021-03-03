import React, { forwardRef } from 'react';
import './InputField.css';

const InputField = (
  {
    children,
    type,
    onChange,
    value,
    id,
    required,
    label,
    disabled,
    text,
    ...rest
  },
  ref
) => {
  if (type && type === 'file') {
    return (
      <div className="input-file">
        <label htmlFor={id} className="custom-file-upload">
          {text ? text : 'Choose file..'}
        </label>
        <input type={type} id={id} onChange={onChange} />
      </div>
    );
  }
  return (
    <div className="input-field">
      <input
        ref={ref}
        type={type}
        onChange={onChange}
        value={value}
        id={id}
        placeholder=" "
        autoComplete={'on'}
        disabled={disabled}
        {...rest}
      ></input>

      <label htmlFor={id} className="label-name">
        <span className="content-name">{label}</span>
      </label>
    </div>
  );
};

export default forwardRef(InputField);
