import React, { useState, useRef } from 'react';
import { ReportSection } from './components/ReportSection';
import { RiskBadge } from './components/RiskBadge';
import { DownloadIcon, FileTerminalIcon, ShieldWarningIcon, LockOpenIcon } from './components/IconComponents';
import { UnlockModal } from './components/UnlockModal';

// Data for the injected links
const infectedLinks = [
    { text: 'Ong777', url: 'https://www.ong777.win/' },
    { text: 'Rich888', url: 'https://www.rich888.link/' },
    { text: 'Slot Gacor Hari Ini', url: 'https://www.asiagenting.com/' },
    { text: 'Mega888', url: 'https://www.altwheels.com/' },
    { text: 'Online Casino Malaysia', url: 'https://www.iamzappacosta.com/' },
    { text: 'Link Slot 2023', url: 'https://www.9999mebeli.com/' },
    { text: 'Situs Bola Terpercaya', url: 'http://www.edl.gov.lb/admin1964/validator/unit-test/situs-bola-terpercaya/' },
    { text: 'Situs Togel Terpercaya', url: 'http://www.edl.gov.lb/admin1964/validator/unit-test/situs-togel-terpercaya-2023/' },
    { text: 'Slot Gacor', url: 'http://www.edl.gov.lb/admin1964/validator/unit-test/slot-gacor/' },
    { text: 'Slot Zeus Gacor', url: 'http://www.edl.gov.lb/admin1964/validator/unit-test/slot-zeus-gacor/' },
    { text: 'jacquelinedupre.net', url: 'https://www.jacquelinedupre.net/' },
    { text: 'downloadvideos-convert.com', url: 'https://www.downloadvideos-convert.com/' },
    { text: '3dvirtualight.com', url: 'https://www.3dvirtualight.com/' },
    { text: 'lianosdospalmas.com', url: 'https://www.lianosdospalmas.com/' },
    { text: 'taylorho.com', url: 'https://www.taylorho.com/' },
    { text: 'hoteldelamontagne.com', url: 'https://www.hoteldelamontagne.com/' },
    { text: 'asafeplacenh.org', url: 'https://www.asafeplacenh.org/' },
    { text: 'pghfolkfest.org', url: 'https://www.pghfolkfest.org/' },
    { text: 'nwwda.org', url: 'https://www.nwwda.org/' },
    { text: 'congressiefiere.com', url: 'https://www.congressiefiere.com/' },
    { text: 'lato99ku.xyz', url: 'https://lato99ku.xyz/' },
    { text: 'lato99.xyz', url: 'https://www.lato99.xyz/' },
    { text: 'lato99.one', url: 'https://www.lato99.one/' },
    { text: 'lato99.online', url: 'https://www.lato99.online/' },
    { text: 'lato99slot.xyz', url: 'https://www.lato99slot.xyz/' },
    { text: 'lato99maxwin.xyz', url: 'https://lato99maxwin.xyz/' },
    { text: 'asiagenting.info', url: 'https://www.asiagenting.info/' },
    { text: 'asiagentingqu.xyz', url: 'https://www.asiagentingqu.xyz/' },
    { text: 'asiagenting.win', url: 'https://www.asiagenting.win/' },
];

// Data for the locked state
const lockedCveData = [
    { id: 'CVE-2024-6484', description: 'Para detalhes sobre este risco, contate o auditor que enviou o relatório.', risk: 'high' },
    { id: 'CVE-2019-8331', description: 'Para detalhes sobre este risco, contate o auditor que enviou o relatório.', risk: 'medium' },
    { id: 'CVE-2018-20677', description: 'Para detalhes sobre este risco, contate o auditor que enviou o relatório.', risk: 'high' },
    { id: 'CVE-2018-20676', description: 'Para detalhes sobre este risco, contate o auditor que enviou o relatório.', risk: 'high' },
    { id: 'CVE-2018-14042', description: 'Para detalhes sobre este risco, contate o auditor que enviou o relatório.', risk: 'high' }
];

// Original, sensitive data for the unlocked state
const originalData = {
    summaryPhrase1: "um Plugin/Tema desatualizado",
    summaryPhrase2: "remover o conteúdo injetado e auditar todas as instalações de software (CMS, temas e plugins)",
    analysisPhrase1: "(plugins/temas de CMS desatualizados).",
    cveFooterPhrase1: "tema ou qualquer plugin estiver desatualizado",
    mitigation: {
        removal: ["Limpeza da Base de Dados: Identificar e remover todos os links e textos de cassino do banco de dados.", "Limpeza de Arquivos: Auditar os arquivos do tema (especialmente footer.php) e remover qualquer código malicioso."],
        hardening: ["Atualização Imediata: Atualizar o CMS, o Tema principal e TODOS os Plugins para suas versões mais recentes.", "Auditoria de Plugins: Desinstalar ou desativar plugins desnecessários ou que não são mais mantidos.", "Backup: Realizar um backup limpo do site e do banco de dados após a limpeza."],
        preventive: ["Implementar um WAF (Web Application Firewall) para bloquear tentativas de injeção futuras.", "Configurar a política de segurança de conteúdo (CSP) no cabeçalho do servidor.", "Fortalecer as credenciais de acesso (senhas fortes, 2FA para administradores)."]
    },
    cveData: [
        { id: 'CVE-2024-6484', description: 'Exemplo de risco recente e de Alta Severidade que falhas no CMS podem apresentar, exigindo ação imediata.', risk: 'high' },
        { id: 'CVE-2019-8331', description: 'Exemplo de XSS/Injeção em Componentes: CVEs semelhantes são comumente exploradas para injeções.', risk: 'medium' },
        { id: 'CVE-2018-20677', description: 'Exemplo de Injeção de Código em Plugins: Representa a vulnerabilidade típica em plugins que permitem injeção.', risk: 'high' },
        { id: 'CVE-2018-20676', description: 'Exemplo de Falha de Controle de Acesso: Permite que usuários não autorizados modifiquem o banco de dados.', risk: 'high' },
        { id: 'CVE-2018-14042', description: 'Exemplo de Injeção em Campos Não Filtrados: Relacionada a falhas onde a entrada do usuário não é sanitizada.', risk: 'high' }
    ]
};

const Report: React.FC = () => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [modalError, setModalError] = useState('');

    const handleUnlockAttempt = () => {
        if (passwordInput === '5550123') {
            setIsUnlocked(true);
            setIsModalOpen(false);
            setPasswordInput('');
            setModalError('');
        } else {
            setModalError('Senha incorreta. Tente novamente.');
            setPasswordInput('');
        }
    };

    const handleDownloadPdf = () => {
        const reportElement = reportRef.current;
        if (!reportElement) return;
        const elementToPrint = reportElement.cloneNode(true) as HTMLElement;
        const printContainer = document.createElement('div');
        printContainer.style.position = 'absolute';
        printContainer.style.left = '-9999px';
        printContainer.style.top = '0';
        printContainer.style.width = `${reportElement.offsetWidth}px`;
        printContainer.appendChild(elementToPrint);
        document.body.appendChild(printContainer);
        const pdfWidth = elementToPrint.scrollWidth;
        const pdfHeight = elementToPrint.scrollHeight;
        const opt = {
            margin: 0,
            filename: 'Relatorio_Pentest_Souza_Bombas.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, backgroundColor: '#161b22', useCORS: true, width: pdfWidth, height: pdfHeight },
            jsPDF: { unit: 'px', format: [pdfWidth, pdfHeight], orientation: 'portrait' }
        };
        // @ts-ignore
        html2pdf().from(elementToPrint).set(opt).save().finally(() => {
            document.body.removeChild(printContainer);
        });
    };
    
    const cveDataToDisplay = isUnlocked ? originalData.cveData : lockedCveData;

    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-300 font-mono p-4 sm:p-8">
            <UnlockModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setPasswordInput(''); setModalError(''); }}
                onSubmit={handleUnlockAttempt}
                password={passwordInput}
                setPassword={setPasswordInput}
                error={modalError}
            />
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-5 gap-4">
                    <div className="flex items-center space-x-3">
                        <FileTerminalIcon className="w-10 h-10 text-cyan-400" />
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400">Relatório de Segurança</h1>
                            <p className="text-sm text-gray-400">Teste de Intrusão & Análise de Vulnerabilidades</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center space-x-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(252,163,17,0.3)] hover:shadow-[0_0_15px_rgba(252,163,17,0.5)]"
                        >
                            <LockOpenIcon className="w-5 h-5" />
                            <span>Liberar Auditoria</span>
                        </button>
                        <button
                            onClick={handleDownloadPdf}
                            className="flex items-center space-x-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            <span>Salvar em PDF</span>
                        </button>
                    </div>
                </header>
                
                <div ref={reportRef}>
                    <main className="bg-[#161b22] border border-gray-700 rounded-lg p-6 sm:p-10 shadow-lg">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white">Análise de Injeção de Conteúdo Malicioso</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-gray-700 py-6 mb-12">
                            <div><p className="text-gray-400">Cliente:</p><p className="text-lg text-white font-semibold">Cliente Souza Bombas</p></div>
                            <div><p className="text-gray-400">Alvo Principal:</p><code className="text-lg text-green-400 bg-gray-700/50 px-2 py-1 rounded inline-block">https://souzabombas.com.br/</code></div>
                            <div><p className="text-gray-400">Data de Emissão:</p><p className="text-lg text-white">27 de Outubro de 2025</p></div>
                            <div><p className="text-gray-400">ID do Relatório:</p><p className="text-lg text-white">SPT-2025-XSS-001</p></div>
                            <div className="sm:col-span-2 flex items-center space-x-2"><p className="text-gray-400">Criticidade Geral:</p><RiskBadge level="high" /></div>
                        </div>

                        <ReportSection title="1. Sumário Executivo">
                            <p className="mb-4">
                                Este relatório detalha as descobertas de uma análise de segurança focada no site <code className="bg-gray-700 text-green-400 px-2 py-1 rounded inline-block">https://souzabombas.com.br/</code>. Foi detectada uma grave vulnerabilidade de Injeção de Conteúdo, que permitiu que terceiros mal-intencionados inserissem uma grande quantidade de links e termos de pesquisa relacionados a jogos de azar e cassinos online.
                            </p>
                            <p className="mb-4 bg-red-900/20 border border-red-500/30 p-4 rounded-lg flex items-start space-x-3">
                               <ShieldWarningIcon className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                               <span>Esta situação representa um <strong className="text-red-400">risco de Alta Criticidade</strong> que afeta a credibilidade, a experiência do usuário e a saúde do domínio perante mecanismos de busca (SEO). A vulnerabilidade subjacente é provavelmente uma falha de Cross-Site Scripting (XSS) Persistente ou uma falha de injeção de código em <span className={!isUnlocked ? "blur-sm select-none" : ""}>{isUnlocked ? originalData.summaryPhrase1 : "contate o auditor para detalhes"}</span>, o que pode levar a um comprometimento total do sistema.</span>
                            </p>
                            <p>
                                <strong className="text-cyan-400">Ação Imediata Recomendada:</strong> Isolar o vetor de ataque, <span className={!isUnlocked ? "blur-sm select-none" : ""}>{isUnlocked ? originalData.summaryPhrase2 : "contate o auditor para o plano de ação e detalhes técnicos"}</span> em busca de vulnerabilidades conhecidas.
                            </p>
                        </ReportSection>

                        <ReportSection title="2. Escopo do Teste">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[500px] text-left border-collapse">
                                    <thead className="border-b border-gray-600">
                                        <tr>
                                            <th className="p-3 text-cyan-400 w-1/3">Item</th>
                                            <th className="p-3 text-cyan-400">Detalhe</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-700">
                                            <td className="p-3 font-semibold">Tipo de Teste</td>
                                            <td className="p-3">Análise Estática e Dinâmica (Caixa-Preta)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-semibold">Objetivo</td>
                                            <td className="p-3">Confirmar a presença de links inadequados (cassino/spam) e identificar a classe da vulnerabilidade.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </ReportSection>

                        <ReportSection title="3. Descobertas e Provas">
                            <p className="mb-6">Foram encontrados diversos links e termos-chave associados a plataformas de jogos de azar injetados no código-fonte do site. A seguir, uma lista completa das URLs maliciosas identificadas.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                {infectedLinks.map((link, index) => (
                                    <div key={index} className="text-sm">
                                        <p className="text-cyan-400 font-semibold truncate" title={link.text}>{link.text}</p>
                                        <code className="bg-gray-700 text-green-400 px-2 py-1 rounded text-xs break-all w-full block mt-1">
                                            {link.url}
                                        </code>
                                    </div>
                                ))}
                            </div>
                             <div className="mt-6">
                                <strong>Criticidade da Descoberta:</strong> <RiskBadge level="high" /> (Comprometimento de Integridade)
                            </div>
                        </ReportSection>

                        <ReportSection title="4. Análise de Vulnerabilidades">
                            <p className="mb-4">A injeção de conteúdo malicioso é sintomática de uma vulnerabilidade mais profunda no sistema. A falha provável é de <strong className="text-red-400">Cross-Site Scripting (XSS) Persistente</strong> ou uma <strong className="text-red-400">Injeção de Código (Code Injection)</strong> via componentes de terceiros <span className={!isUnlocked ? "blur-sm select-none" : ""}>{isUnlocked ? originalData.analysisPhrase1 : "(contate o auditor para detalhes)."}</span></p>
                            <h4 className="text-xl font-bold text-white mb-3">Detalhamento da Vulnerabilidade: XSS (Cross-Site Scripting)</h4>
                             <div className="overflow-x-auto">
                               <table className="w-full min-w-[600px] text-left border-collapse">
                                    <thead className="border-b border-gray-600">
                                        <tr>
                                            <th className="p-3 text-cyan-400 w-1/3">Tipo</th>
                                            <th className="p-3 text-cyan-400">Descrição no Contexto do Alvo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-700">
                                            <td className="p-3 font-semibold align-top">XSS Persistente (Stored XSS)</td>
                                            <td className="p-3">O código malicioso (os links e textos de cassino) é armazenado permanentemente no banco de dados do site e é executado/renderizado toda vez que a página é carregada.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-semibold align-top">Impacto para o Cliente</td>
                                            <td className="p-3">O atacante usou a injeção para fins de SEO Spam (ganhar *backlinks*). No entanto, um ataque de XSS Persistente poderia levar ao roubo de cookies de sessão, desfiguração do site ou redirecionamento de usuários.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </ReportSection>

                        <ReportSection title="5. Vulnerabilidades Relacionadas e Riscos (CVEs)">
                             <p className="mb-4">A ocorrência de injeção de conteúdo é comumente o resultado da exploração de falhas conhecidas em softwares desatualizados. As seguintes CVEs demonstram a classe de risco que provavelmente levou a este comprometimento:</p>
                             <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px] text-left border-collapse">
                                    <thead className="border-b border-gray-600">
                                        <tr>
                                            <th className="p-3 text-cyan-400">CVE ID</th>
                                            <th className="p-3 text-cyan-400">Descrição da Classe de Risco</th>
                                            <th className="p-3 text-cyan-400">Risco de Exploração</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cveDataToDisplay.map((cve, index) => {
                                            const parts = cve.id.split(/-(?=\d+$)/);
                                            const prefix = parts[0];
                                            const suffix = parts.length > 1 ? parts[1] : '';
                                            return (
                                                <tr key={index} className={index < cveDataToDisplay.length - 1 ? "border-b border-gray-700" : ""}>
                                                    <td className="p-3">
                                                        <code className="bg-gray-700 text-green-400 px-2 py-1 rounded">
                                                            {prefix}-<span className={!isUnlocked ? "blur-sm select-none" : ""}>{suffix}</span>
                                                        </code>
                                                    </td>
                                                    <td className={`p-3 ${!isUnlocked ? "blur-sm select-none" : ""}`}>{cve.description}</td>
                                                    <td className="p-3"><RiskBadge level={cve.risk as 'high' | 'medium' | 'low'} /></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                             <p className="mt-4 text-sm text-gray-400 italic">O site está vulnerável a esta classe de ataques se o seu CMS, <span className={!isUnlocked ? "blur-sm select-none" : ""}>{isUnlocked ? originalData.cveFooterPhrase1 : "contate o auditor para detalhes"}</span> e contiver uma ou mais dessas falhas de segurança conhecidas.</p>
                        </ReportSection>
                        
                        <ReportSection title="6. Recomendações de Mitigação">
                            <p className="mb-4">Para remediar o comprometimento atual e prevenir futuros ataques, as seguintes ações são essenciais:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-lg text-white mb-2">1. Remoção do Conteúdo</h4>
                                    <ul className={`list-disc list-inside space-y-2 text-gray-400 ${!isUnlocked ? "blur-sm select-none" : ""}`}>
                                        {isUnlocked ? originalData.mitigation.removal.map((item, i) => <li key={i}>{item}</li>) : <><li>Contate o auditor para o plano.</li><li>Contate o auditor para detalhes.</li></>}
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-lg text-white mb-2">2. Correção (Hardening)</h4>
                                    <ul className={`list-disc list-inside space-y-2 text-gray-400 ${!isUnlocked ? "blur-sm select-none" : ""}`}>
                                       {isUnlocked ? originalData.mitigation.hardening.map((item, i) => <li key={i}>{item}</li>) : <><li>Contate o auditor para o plano.</li><li>Contate o auditor para detalhes.</li><li>Contate o auditor para o plano.</li></>}
                                    </ul>
                                </div>
                                 <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-lg text-white mb-2">3. Medidas Preventivas</h4>
                                    <ul className={`list-disc list-inside space-y-2 text-gray-400 ${!isUnlocked ? "blur-sm select-none" : ""}`}>
                                        {isUnlocked ? originalData.mitigation.preventive.map((item, i) => <li key={i}>{item}</li>) : <><li>Contate o auditor para o plano.</li><li>Contate o auditor para detalhes.</li><li>Contate o auditor para o plano.</li></>}
                                    </ul>
                                </div>
                            </div>
                        </ReportSection>

                        <ReportSection title="7. Conclusão">
                             <p>
                                O site <code className="bg-gray-700 text-green-400 px-2 py-1 rounded inline-block">https://souzabombas.com.br/</code> foi comprometido por uma injeção de conteúdo malicioso, com o objetivo de obter *backlinks* de SEO, expondo-o a sérios riscos de segurança e reputação. A correção imediata da vulnerabilidade de Injeção/XSS subjacente é crucial para a integridade do negócio.
                            </p>
                            <p className="mt-6 bg-red-900/30 border border-red-500/40 p-4 rounded-lg text-red-300 text-center font-bold">
                                Para solução completa, eficaz e prevenção de invasões futuras, entre em contato com a pessoa que lhe enviou este relatório.
                            </p>
                        </ReportSection>

                        <footer className="mt-12 pt-8 border-t border-gray-700 text-right">
                            <p className="text-white">Atenciosamente,</p>
                            <p className="text-cyan-400 text-lg font-bold">Davi.S</p>
                            <p className="text-gray-400">Analista de Segurança da Informação</p>
                            <p className="text-gray-500 text-sm">(Pentest e Análise de Vulnerabilidades)</p>
                        </footer>

                    </main>
                </div>

            </div>
        </div>
    );
};

export default Report;
