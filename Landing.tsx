import React, { useState } from 'react';

interface LandingProps {
    onVerify: (code: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onVerify }) => {
    const [auditCode, setAuditCode] = useState('');
    const [error, setError] = useState('');

    const handleVerifyClick = () => {
        if (auditCode.toLowerCase().trim() === 'souza') {
            onVerify(auditCode);
        } else {
            setError('Código de auditoria inválido. Tente novamente.');
            setAuditCode('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleVerifyClick();
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center font-sans bg-black">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="https://dsec.vercel.app/video/mainVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
            
            {/* Glassmorphism Container */}
            <div className="relative z-20 w-full max-w-md m-4 p-8 bg-black/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl">
                <div className="text-center">
                    {/* Logo */}
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-wider" style={{ textShadow: '0 0 25px rgba(34, 211, 238, 0.6)' }}>
                        <span className="text-cyan-400">D</span>Shield
                    </h1>
                    
                    {/* Tagline */}
                    <p className="text-gray-300 text-lg mb-8 tracking-widest">
                        Fortificando sua Presença Digital
                    </p>
                    
                    {/* Input and Button */}
                    <div className="flex flex-col items-center justify-center gap-4 w-full">
                        <input
                            type="text"
                            value={auditCode}
                            onChange={(e) => {
                                setAuditCode(e.target.value);
                                setError('');
                            }}
                            onKeyPress={handleKeyPress}
                            placeholder="Insira o código da auditoria"
                            className="w-full bg-gray-900/50 border-2 border-gray-600 rounded-lg px-4 py-3 text-white text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                        />
                        <button
                            onClick={handleVerifyClick}
                            className="w-full bg-cyan-500/80 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)]"
                        >
                            Verifique sua auditoria
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Landing;