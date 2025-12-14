import React from 'react';
import './Button.module.css';

/**
 * Reusable Button Component
 * @param {string} variant - 'primary', 'secondary', 'outline', 'ghost', 'danger'
 * @param {string} size - 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {boolean} fullWidth - Make button take full width
 * @param {boolean} disabled - Disable the button
 * @param {boolean} loading - Show loading state
 * @param {ReactNode} children - Button content
 * @param {ReactNode} leftIcon - Icon before text
 * @param {ReactNode} rightIcon - Icon after text
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  children,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const styles = {
    root: `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''} ${disabled ? 'btn-disabled' : ''} ${loading ? 'btn-loading' : ''} ${className}`,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={styles.root}
      {...props}
    >
      {loading && <span className="btn-spinner" />}
      {!loading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      <span className="btn-content">{children}</span>
      {!loading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
