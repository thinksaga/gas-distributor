import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    const buttonClasses = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn-full' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
