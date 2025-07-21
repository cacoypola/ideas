import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass-effect mt-auto py-6">
            <div className="container mx-auto px-4 text-center text-gray-800">
                <div className="flex justify-center mb-4">
                    <Link to="/" className="flex items-center space-x-2">
                         <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/47a01f6b-06ce-4940-b2fb-2d51ed4738e6/1663bdaf7fc513b25daeaefa9813817a.png" alt="CACO&POLA Logo" className="h-10 w-auto" />
                    </Link>
                </div>
                <div className="flex justify-center items-center space-x-4 mb-2 text-sm">
                    <Link to="/legal" className="hover:text-blue-500 transition-colors">Aviso Legal</Link>
                    <span>|</span>
                    <Link to="/legal#privacy" className="hover:text-blue-500 transition-colors">Política de Privacidad</Link>
                     <span>|</span>
                    <a href="mailto:ideas@cacoandpola.com" className="hover:text-blue-500 transition-colors">Contacto</a>
                </div>
                <p className="text-sm">
                    &copy; {currentYear} CACO&POLA. Todos los derechos reservados.
                </p>
                <p className="text-sm mt-1">
                    Hecho por <span className="font-semibold text-gray-900">IAGO</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;