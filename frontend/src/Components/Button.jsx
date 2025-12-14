import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
    icon,
    iconPosition = 'left',
    ...props
}) => {
    const buttonClasses = [
        'btn-modern',
        `btn-modern-${variant}`,
        `btn-modern-${size}`,
        fullWidth ? 'btn-modern-full' : '',
        loading ? 'btn-modern-loading' : '',
        disabled ? 'btn-modern-disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && (
                <span className="btn-modern-spinner">
                    <svg className="btn-modern-spinner-icon" viewBox="0 0 24 24">
                        <circle className="btn-modern-spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                </span>
            )}
            {!loading && icon && iconPosition === 'left' && (
                <span className="btn-modern-icon btn-modern-icon-left">{icon}</span>
            )}
            <span className="btn-modern-content">{children}</span>
            {!loading && icon && iconPosition === 'right' && (
                <span className="btn-modern-icon btn-modern-icon-right">{icon}</span>
            )}
        </button>
    );
};

export default Button;
