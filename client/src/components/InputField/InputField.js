import React, { forwardRef } from 'react';
import {
  InputFieldDiv,
  InputFileLabel,
  ContentName,
  InputFileDiv,
  LabelName,
} from './styles.js';

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
    style,
    ...rest
  },
  ref
) => {
  if (type && type === 'file') {
    return (
      <InputFileDiv style={style}>
        <InputFileLabel htmlFor={id}>
          {text ? text : 'Choose file..'}
        </InputFileLabel>
        <input type={type} id={id} onChange={onChange} />
      </InputFileDiv>
    );
  }

  return (
    <InputFieldDiv style={style}>
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
      <LabelName htmlFor={id}>
        <ContentName>{label}</ContentName>
      </LabelName>
    </InputFieldDiv>
  );
};
export default forwardRef(InputField);
