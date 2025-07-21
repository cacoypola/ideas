
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Check, X, Star, Users, FileText, Globe } from 'lucide-react';

const AdminPage = () => {
    const [pendingIdeas, setPendingIdeas] = useState([]);
    const [approvedIdeas, setApprovedIdeas] = useState([]);
    const [votingIdeas, setVotingIdeas] = useState([]);
    const { toast } = useToast();

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = () => {
        setPendingIdeas(JSON.parse(localStorage.getItem('pendingIdeas') || '[]'));
        setApprovedIdeas(JSON.parse(localStorage.getItem('approvedIdeas') || '[]'));
        setVotingIdeas(JSON.parse(localStorage.getItem('votingIdeas') || '[]'));
    };

    const handleApprove = (ideaId) => {
        const ideaToApprove = pendingIdeas.find(idea => idea.id === ideaId);
        if (ideaToApprove) {
            const newApproved = [...approvedIdeas, { ...ideaToApprove, status: 'approved' }];
            const newPending = pendingIdeas.filter(idea => idea.id !== ideaId);
            
            localStorage.setItem('approvedIdeas', JSON.stringify(newApproved));
            localStorage.setItem('pendingIdeas', JSON.stringify(newPending));
            
            loadIdeas();
            toast({ title: "Idea aprobada", description: "La idea ahora es visible en la página 'Ver Ideas'." });
        }
    };

    const handleReject = (ideaId) => {
        const newPending = pendingIdeas.filter(idea => idea.id !== ideaId);
        localStorage.setItem('pendingIdeas', JSON.stringify(newPending));
        loadIdeas();
        toast({ title: "Idea Rechazada", description: "La idea ha sido eliminada.", variant: "destructive" });
    };

    const handleSelectForVoting = (ideaId) => {
        const ideaToVote = approvedIdeas.find(idea => idea.id === ideaId);
        if (ideaToVote && !votingIdeas.some(v => v.id === ideaId)) {
            const newVoting = [...votingIdeas, { ...ideaToVote, votes: 0 }];
            localStorage.setItem('votingIdeas', JSON.stringify(newVoting));
            loadIdeas();
            toast({ title: "Seleccionada para Votar", description: "La idea está en la página de votación." });
        } else {
             toast({ title: "Error", description: "Esta idea ya está en la lista de votación.", variant: "destructive" });
        }
    };
    
    const handleRemoveFromVoting = (ideaId) => {
        const newVoting = votingIdeas.filter(idea => idea.id !== ideaId);
        localStorage.setItem('votingIdeas', JSON.stringify(newVoting));
        loadIdeas();
        toast({ title: "Eliminada de Votación", description: "La idea ya no está en la página de votación.", variant: "destructive" });
    };

    const AdminIdeaCard = ({ idea, children }) => (
        <Card className="glass-effect border-white/30 text-white w-full overflow-hidden">
            <CardContent className="p-4 flex flex-col md:flex-row items-start gap-4">
                <div className="flex-shrink-0 w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center">
                    {idea.fileType === 'image' && idea.image && <img src={idea.image} alt="Idea" className="w-full h-full object-cover rounded-md" />}
                    {idea.fileType === 'pdf' && <FileText className="w-12 h-12 text-white/70" />}
                    {!idea.image && <p className="text-xs text-center text-white/50">Sin archivo</p>}
                </div>

                <div className="flex-grow">
                    <p className="font-semibold text-lg">{idea.description}</p>
                    <p className="text-sm text-white/80">{idea.name} de {idea.country}</p>
                    <p className="text-xs text-white/60">{idea.email}</p>
                    {idea.userIp && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-yellow-300">
                            <Globe className="h-3 w-3" />
                            <span>IP: {idea.userIp}</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-row md:flex-col gap-2 self-center md:self-auto">{children}</div>
            </CardContent>
        </Card>
    );

    return (
        <>
            <Helmet>
                <title>Admin - CACO&POLA</title>
                <meta name="description" content="Panel de administración para gestionar ideas." />
            </Helmet>
            <div className="pt-32 pb-12 min-h-screen">
                <div className="container mx-auto px-4">
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                        Panel de Administración
                    </motion.h1>

                    <div className="grid lg:grid-cols-1 gap-12">
                        <section>
                            <Card className="glass-effect border-white/30 p-6">
                                <CardHeader>
                                    <CardTitle className="text-3xl text-white flex items-center gap-3 font-bold"><Check className="h-8 w-8 text-green-400"/>Ideas Pendientes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {pendingIdeas.length > 0 ? pendingIdeas.map(idea => (
                                        <AdminIdeaCard key={idea.id} idea={idea}>
                                            <Button onClick={() => handleApprove(idea.id)} size="sm" className="bg-green-500 hover:bg-green-600 w-full font-semibold"><Check className="mr-2 h-4 w-4"/> Aprobar</Button>
                                            <Button onClick={() => handleReject(idea.id)} variant="destructive" size="sm" className="w-full font-semibold"><X className="mr-2 h-4 w-4"/> Rechazar</Button>
                                        </AdminIdeaCard>
                                    )) : <p className="text-white/70 text-center py-4">¡Todo al día! No hay ideas pendientes.</p>}
                                </CardContent>
                            </Card>
                        </section>
                        
                        <section>
                             <Card className="glass-effect border-white/30 p-6">
                                <CardHeader>
                                    <CardTitle className="text-3xl text-white flex items-center gap-3 font-bold"><Star className="h-8 w-8 text-yellow-400"/>Seleccionar para Votar</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {approvedIdeas.length > 0 ? approvedIdeas.map(idea => {
                                        const isVoting = votingIdeas.some(v => v.id === idea.id);
                                        return (
                                            <AdminIdeaCard key={idea.id} idea={idea}>
                                                <Button onClick={() => handleSelectForVoting(idea.id)} size="sm" disabled={isVoting} className="bg-blue-500 hover:bg-blue-600 w-full font-semibold disabled:bg-gray-500"><Star className="mr-2 h-4 w-4"/> {isVoting ? 'Seleccionada' : 'Seleccionar'}</Button>
                                            </AdminIdeaCard>
                                        )
                                    }) : <p className="text-white/70 text-center py-4">No hay ideas aprobadas para seleccionar.</p>}
                                </CardContent>
                            </Card>
                        </section>

                        <section>
                            <Card className="glass-effect border-white/30 p-6">
                                <CardHeader>
                                    <CardTitle className="text-3xl text-white flex items-center gap-3 font-bold"><Users className="h-8 w-8 text-pink-400"/>Ideas en Votación</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {votingIdeas.length > 0 ? votingIdeas.map(idea => (
                                        <AdminIdeaCard key={idea.id} idea={idea}>
                                             <Button onClick={() => handleRemoveFromVoting(idea.id)} variant="destructive" size="sm" className="w-full font-semibold"><X className="mr-2 h-4 w-4"/> Quitar</Button>
                                        </AdminIdeaCard>
                                    )) : <p className="text-white/70 text-center py-4">Aún no hay ideas compitiendo en la votación.</p>}
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
