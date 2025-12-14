import React from 'react';
import './Card.css';
import './ModernComponents.css';

const Card = ({
    children,
    className = '',
    hover = false,
    padding = 'md',
    gradient = false,
    glass = false,
    ...props
}) => {
    const cardClasses = [
        'card-modern',
        hover ? 'card-modern-hover' : '',
        `card-modern-padding-${padding}`,
        gradient ? 'card-modern-gradient' : '',
        glass ? 'card-modern-glass' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={cardClasses} {...props}>
            {children}
        </div>
    );
};

export default Card;
