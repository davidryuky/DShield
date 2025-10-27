import React from 'react';

interface RiskBadgeProps {
    level: 'high' | 'medium' | 'low';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level }) => {
    const levelStyles = {
        high: 'bg-red-500/20 text-red-400 border-red-500/30',
        medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        low: 'bg-green-500/20 text-green-400 border-green-500/30',
    };

    const text = {
        high: 'ALTO',
        medium: 'MÉDIO',
        low: 'BAIXO'
    }

    return (
        <span className={`px-3 py-1 text-sm font-bold rounded-full border ${levelStyles[level]}`}>
            {text[level]}
        </span>
    );
};
