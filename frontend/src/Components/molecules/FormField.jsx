import React from 'react';
import { Input, Text } from '../atoms';
import './FormField.module.css';

/**
 * FormField Molecule - Combines label, input, error, and help text
 */
const FormField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  helpText,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  return (
    <div className="form-field">
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        required={required}
        helpText={helpText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default FormField;
