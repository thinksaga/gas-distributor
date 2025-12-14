import React from 'react';
import { Card, Text } from '../atoms';
import './Alert.module.css';

/**
 * Alert Molecule - Informational message with variant styles
 */
const Alert = ({
  type = 'info', // 'info', 'success', 'error', 'warning'
  title,
  message,
  onClose,
  icon,
  closeable = false,
  className = '',
}) => {
  return (
    <Card className={`alert alert-${type} ${className}`} variant="outlined">
      <div className="alert-content">
        {icon && <span className="alert-icon">{icon}</span>}
        <div className="alert-text">
          {title && <Text variant="h6" className="alert-title">{title}</Text>}
          {message && <Text variant="body" className="alert-message">{message}</Text>}
        </div>
        {closeable && (
          <button className="alert-close" onClick={onClose}>×</button>
        )}
      </div>
    </Card>
  );
};

export default Alert;
