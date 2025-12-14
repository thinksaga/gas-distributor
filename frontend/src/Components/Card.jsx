import React from 'react';
import './Card.css';

const Card = ({
    children,
    className = '',
    hover = false,
    padding = 'md',
    ...props
}) => {
    const cardClasses = [
        'card',
        hover ? 'card-hover' : '',
        `card-padding-${padding}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={cardClasses} {...props}>
            {children}
        </div>
    );
};

export default Card;
