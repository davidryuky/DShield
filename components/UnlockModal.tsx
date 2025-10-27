
import React from 'react';

interface UnlockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    password: string;
    setPassword: (password: string) => void;
    error: string;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({ isOpen, onClose, onSubmit, password, setPassword, error }) => {
    if (!isOpen) return null;

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-[#161b22] border border-gray-700 rounded-lg p-8 shadow-2xl w-full max-w-sm m-4 transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Desbloquear Relatório</h3>
                <p className="text-gray-400 mb-6">Use a senha do auditor para visualizar partes sensíveis.</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite a senha..."
                    autoFocus
                    className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        onClick={onClose}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSubmit}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Liberar
                    </button>
                </div>
            </div>
        </div>
    );
};
