import React, { useState } from 'react';
import Landing from './Landing';
import Report from './Report';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('landing');

    const handleVerification = (code: string) => {
        // This function is passed to the Landing component
        // to switch the view upon successful verification.
        if (code.toLowerCase().trim() === 'souza') {
            setCurrentPage('report');
        }
    };

    return (
        <>
            {currentPage === 'landing' && <Landing onVerify={handleVerification} />}
            {currentPage === 'report' && <Report />}
        </>
    );
};

export default App;
