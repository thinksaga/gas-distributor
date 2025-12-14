import React from 'react';
import './Card.module.css';

/**
 * Reusable Card Component
 * @param {ReactNode} children - Card content
 * @param {string} variant - 'elevated', 'outlined', 'filled'
 * @param {boolean} interactive - Show hover effects
 * @param {function} onClick - Click handler
 */
const Card = ({
  children,
  variant = 'elevated',
  interactive = false,
  onClick,
  className = '',
  ...props
}) => {
  const styles = `card card-${variant} ${interactive ? 'card-interactive' : ''} ${className}`;

  return (
    <div className={styles} onClick={onClick} role={onClick ? 'button' : undefined} {...props}>
      {children}
    </div>
  );
};

export default Card;
