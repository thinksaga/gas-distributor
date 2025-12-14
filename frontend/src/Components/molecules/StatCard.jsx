import React from 'react';
import { Card, Text } from '../atoms';
import './StatCard.module.css';

/**
 * StatCard Molecule - Display a statistic with label, value, and optional change
 */
const StatCard = ({
  icon,
  label,
  value,
  change,
  changeType = 'neutral', // 'positive', 'negative', 'neutral'
  trend,
  onClick,
}) => {
  return (
    <Card
      className="stat-card"
      interactive={!!onClick}
      onClick={onClick}
      variant="elevated"
    >
      {icon && <span className="stat-icon">{icon}</span>}
      <Text variant="caption" className="stat-label">{label}</Text>
      <Text variant="h4" className="stat-value">{value}</Text>
      {change && (
        <div className={`stat-change stat-change-${changeType}`}>
          {trend && <span className="stat-trend">{trend}</span>}
          <Text variant="caption">{change}</Text>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
