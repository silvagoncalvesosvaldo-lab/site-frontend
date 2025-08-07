import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, Truck } from 'lucide-react';

const WelcomeHeader = ({ scrollTo }) => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a102a]/80 backdrop-blur-sm">
            <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3 text-xl font-bold text-white">
                    <Truck className="h-7 w-7 text-sky-400" />
                    <span className="hidden sm:inline">Os Melhores do Transporte</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-md">
                    <span onClick={() => scrollTo('clientes')} className="cursor-pointer hover:text-white transition-colors">Para Clientes</span>
                    <span onClick={() => scrollTo('transportadores')} className="cursor-pointer hover:text-white transition-colors">Para Transportadores</span>
                    <span onClick={() => scrollTo('afiliados')} className="cursor-pointer hover:text-white transition-colors">Para Afiliados</span>
                    <span onClick={() => navigate('/about')} className="cursor-pointer hover:text-white transition-colors">Sobre Nós</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                    <span className="text-slate-400 text-xs sm:text-sm">Para quem já é cadastrado →</span>
                    <Button onClick={() => navigate('/acessar')} variant="outline" className="border-slate-600 text-white hover:bg-slate-800 hover:text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-md whitespace-nowrap">
                        <LogIn className="mr-2 h-4 w-4" /> Acessar / Login
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default WelcomeHeader;