import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Shield } from 'lucide-react';

const WelcomeFooter = () => {
    return (
        <footer className="bg-slate-900/50 border-t border-slate-800 text-slate-400">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-lg text-white">Os Melhores do Transporte</p>
                        <p className="text-sm">Conectando cargas e motoristas com eficiência e segurança.</p>
                    </div>

                    <div className="flex flex-col items-center md:items-start">
                        <p className="font-semibold text-white mb-2">Navegação</p>
                        <div className="flex space-x-6">
                            <Button variant="link" asChild className="p-0 text-slate-400 hover:text-red-400">
                                <Link to="/about">Sobre Nós</Link>
                            </Button>
                            <Button variant="link" asChild className="p-0 text-slate-400 hover:text-red-400">
                                <Link to="/help">Ajuda</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                            <Facebook className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                            <Instagram className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                            <Linkedin className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Os Melhores do Transporte. Todos os direitos reservados.</p>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <Link to="/admin-login" className="flex items-center text-slate-500 hover:text-red-400 transition-colors">
                            <Shield className="h-4 w-4 mr-2" />
                            Área Restrita
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default WelcomeFooter;