import React from 'react';

interface ReportSectionProps {
    title: string;
    children: React.ReactNode;
}

export const ReportSection: React.FC<ReportSectionProps> = ({ title, children }) => {
    return (
        <section className="mb-12">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 pl-4 border-l-4 border-cyan-500/80">
                {title}
            </h3>
            <div className="text-gray-300 leading-relaxed">
                {children}
            </div>
        </section>
    );
};
