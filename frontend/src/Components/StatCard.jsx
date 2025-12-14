import React from 'react';
import Card from './Card';
import './StatCard.css';

const StatCard = ({
    title,
    value,
    icon,
    trend,
    trendValue,
    color = 'primary',
    className = '',
}) => {
    const getTrendIcon = () => {
        if (!trend) return null;
        return trend === 'up' ? '↑' : '↓';
    };

    const trendClass = trend === 'up' ? 'stat-trend-up' : 'stat-trend-down';

    return (
        <Card className={`stat-card ${className}`} padding="lg">
            <div className="stat-card-content">
                <div className="stat-card-header">
                    <span className="stat-card-title">{title}</span>
                    {icon && (
                        <div className={`stat-card-icon stat-card-icon-${color}`}>
                            {icon}
                        </div>
                    )}
                </div>
                <div className="stat-card-value">{value}</div>
                {trend && (
                    <div className={`stat-card-trend ${trendClass}`}>
                        <span className="stat-trend-icon">{getTrendIcon()}</span>
                        <span className="stat-trend-value">{trendValue}</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatCard;
