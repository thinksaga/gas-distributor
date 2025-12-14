import React from 'react';
import './Text.module.css';

/**
 * Reusable Text Component
 * @param {string} variant - 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption'
 * @param {string} color - Text color
 * @param {boolean} bold - Bold text
 * @param {boolean} italic - Italic text
 * @param {ReactNode} children - Text content
 */
const Text = ({
  variant = 'body',
  color = 'primary',
  bold = false,
  italic = false,
  align = 'left',
  className = '',
  children,
  as: Component = variant.startsWith('h') ? variant : 'p',
  ...props
}) => {
  const styles = `text text-${variant} text-color-${color} ${bold ? 'text-bold' : ''} ${italic ? 'text-italic' : ''} text-align-${align} ${className}`;

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
};

export default Text;
