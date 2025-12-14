import React from 'react';
import './Badge.module.css';

/**
 * Reusable Badge Component
 * @param {string} variant - 'primary', 'secondary', 'success', 'error', 'warning', 'info'
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {ReactNode} children - Badge content
 * @param {ReactNode} icon - Icon before text
 */
const Badge = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}) => {
  const styles = `badge badge-${variant} badge-${size} ${className}`;

  return (
    <span className={styles} {...props}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-text">{children}</span>
    </span>
  );
};

export default Badge;
