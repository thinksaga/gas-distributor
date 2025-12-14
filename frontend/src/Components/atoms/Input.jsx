import React from 'react';
import './Input.module.css';

/**
 * Reusable Input Component
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} error - Error message
 * @param {boolean} required - Mark as required
 * @param {ReactNode} leftIcon - Icon before input
 * @param {ReactNode} rightIcon - Icon after input
 * @param {string} helpText - Helper text below input
 */
const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  required,
  leftIcon,
  rightIcon,
  helpText,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className={`input-container ${error ? 'input-error' : ''}`}>
        {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
        <input
          type={type}
          className={`input-field ${leftIcon ? 'input-has-left-icon' : ''} ${rightIcon ? 'input-has-right-icon' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
      </div>
      {error && <span className="input-error-message">{error}</span>}
      {helpText && !error && <span className="input-help-text">{helpText}</span>}
    </div>
  );
};

export default Input;
