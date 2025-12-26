import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="py-8 bg-background border-t border-white/10 text-center text-gray-400 mt-auto">
            <p className="mb-4">&copy; {new Date().getFullYear()} Alessandro Meneses — Boituva, SP</p>
            <div className="flex justify-center gap-6">
                <a 
                    href="https://github.com/ManoAlee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                >
                    GitHub
                </a>
                <a 
                    href="https://www.linkedin.com/in/alessandro-meneses/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
};

export default Footer;