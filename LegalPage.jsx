import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, UserCheck } from 'lucide-react';

const LegalPage = () => {
    return (
        <>
            <Helmet>
                <title>Aviso Legal - CACO&POLA</title>
                <meta name="description" content="Información legal, política de privacidad y términos de uso de CACO&POLA." />
            </Helmet>
            <div className="pt-32 pb-12 min-h-screen">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
                    >
                        Información Legal
                    </motion.h1>

                    <div className="space-y-12">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <Card id="legal-notice" className="glass-effect">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-800"><FileText className="h-8 w-8 text-blue-500"/>Aviso Legal</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 prose max-w-none text-gray-700">
                                    <p>Este es un sitio web de demostración creado por Hostinger Horizons. Toda la información y contenido son ficticios y para fines ilustrativos.</p>
                                    <p>El propietario de este sitio web es IAGO, operando bajo el nombre de CACO&POLA. Para cualquier consulta, por favor contacte a través del correo electrónico: <a href="mailto:ideas@cacoandpola.com" className="text-blue-600 hover:underline">ideas@cacoandpola.com</a>.</p>
                                    <p>El acceso y uso de este sitio web atribuye la condición de usuario, y acepta, desde dicho acceso y/o uso, las condiciones generales de uso aquí reflejadas.</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                            <Card id="privacy" className="glass-effect">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-800"><Shield className="h-8 w-8 text-green-500"/>Política de Privacidad</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 prose max-w-none text-gray-700">
                                    <p>La privacidad de nuestros usuarios es extremadamente importante para nosotros. Recopilamos información como nombre, país, correo electrónico y dirección IP con el único propósito de gestionar las ideas enviadas y el sistema de votación.</p>
                                    <p>El correo electrónico no se mostrará públicamente. La dirección IP se utiliza para evitar votos duplicados y para moderar el contenido. No compartiremos su información personal con terceros sin su consentimiento explícito, excepto cuando sea requerido por la ley.</p>
                                    <p>Utilizamos cookies y almacenamiento local para mejorar la experiencia del usuario, como recordar el estado de votación. Puede configurar su navegador para rechazar las cookies si lo desea.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                        
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
                            <Card id="terms" className="glass-effect">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-bold flex items-center gap-3 text-gray-800"><UserCheck className="h-8 w-8 text-orange-500"/>Términos de Uso</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 prose max-w-none text-gray-700">
                                   <p>Al enviar una idea, usted otorga a CACO&POLA una licencia no exclusiva, mundial y libre de regalías para usar, reproducir y mostrar dicha idea en el contexto de este sitio web y sus actividades promocionales.</p>
                                   <p>Usted es el único responsable del contenido que envía. Está estrictamente prohibido subir contenido que sea ilegal, ofensivo, violento, sexualmente explícito, discriminatorio o que infrinja los derechos de autor de terceros.</p>
                                   <p>Nos reservamos el derecho de eliminar cualquier contenido y/o banear la dirección IP de cualquier usuario que viole estos términos sin previo aviso. Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LegalPage;