import React from 'react';
import './Badge.css';

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    pill = false,
    className = '',
}) => {
    const badgeClasses = [
        'badge',
        `badge-${variant}`,
        `badge-${size}`,
        pill ? 'badge-pill' : '',
        className
    ].filter(Boolean).join(' ');

    return <span className={badgeClasses}>{children}</span>;
};

export default Badge;
