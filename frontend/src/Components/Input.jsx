import React from 'react';
import './Input.css';

const Input = ({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    error,
    disabled = false,
    required = false,
    icon,
    iconPosition = 'left',
    className = '',
    ...props
}) => {
    const inputClasses = [
        'input-field',
        error ? 'input-error' : '',
        icon ? `input-with-icon-${iconPosition}` : '',
        disabled ? 'input-disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="input-wrapper">
            {label && (
                <label className="input-label">
                    {label}
                    {required && <span className="input-required">*</span>}
                </label>
            )}
            <div className="input-container">
                {icon && iconPosition === 'left' && (
                    <span className="input-icon input-icon-left">{icon}</span>
                )}
                <input
                    type={type}
                    className={inputClasses}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    {...props}
                />
                {icon && iconPosition === 'right' && (
                    <span className="input-icon input-icon-right">{icon}</span>
                )}
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
};

export default Input;
