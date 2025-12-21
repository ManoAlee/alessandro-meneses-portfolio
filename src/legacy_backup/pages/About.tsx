import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
    return (
        <Layout>
            <div className="space-y-6 max-w-3xl">
                <h1 className="text-4xl font-bold text-white">Sobre Mim</h1>
                <p className="text-gray-400 text-lg">
                    Bem-vindo ao meu portfólio! Sou um desenvolvedor apaixonado com foco em arquitetura de software e automação.
                </p>
                
                <div className="bg-card border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Skills Técnicas</h2>
                    <ul className="grid grid-cols-2 gap-2 text-gray-400">
                        <li>• System Design</li>
                        <li>• React & TypeScript</li>
                        <li>• Cloud Infrastructure</li>
                        <li>• CI/CD Pipelines</li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export default About;