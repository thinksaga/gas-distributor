import React from 'react';
import './Input.css';
import './ModernComponents.css';

const Input = ({
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    error,
    success,
    disabled = false,
    required = false,
    icon,
    iconPosition = 'left',
    helperText,
    className = '',
    ...props
}) => {
    const inputClasses = [
        'input-modern',
        error ? 'input-modern-error' : '',
        success ? 'input-modern-success' : '',
        icon ? 'with-icon' : '',
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
            {helperText && !error && <span className="input-helper-text">{helperText}</span>}
        </div>
    );
};

export default Input;
