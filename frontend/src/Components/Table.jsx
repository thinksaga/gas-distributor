import React from 'react';
import './Table.css';

const Table = ({
    columns,
    data,
    onRowClick,
    loading = false,
    emptyMessage = 'No data available',
    className = '',
}) => {
    if (loading) {
        return (
            <div className="table-container">
                <div className="table-loading">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="table-container">
                <div className="table-empty">
                    <p>{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`table-container ${className}`}>
            <div className="table-wrapper">
                <table className="table">
                    <thead className="table-header">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="table-header-cell"
                                    style={{ width: column.width }}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`table-row ${onRowClick ? 'table-row-clickable' : ''}`}
                                onClick={() => onRowClick && onRowClick(row)}
                            >
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="table-cell">
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
