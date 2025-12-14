import React from 'react';
import './Spinner.module.css';

/**
 * Reusable Spinner Component
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {string} color - Spinner color (uses CSS variable)
 */
const Spinner = ({ size = 'md', color = 'primary' }) => {
  return <div className={`spinner spinner-${size} spinner-${color}`} />;
};

export default Spinner;
