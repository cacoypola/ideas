import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, User, MapPin, Trophy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const VoteIdeasPage = () => {
  const [votingIdeas, setVotingIdeas] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const votingData = JSON.parse(localStorage.getItem('votingIdeas') || '[]');
    setVotingIdeas(votingData.map(idea => ({ ...idea, votes: idea.votes || 0 })));

    const userIP = localStorage.getItem('userIP') || generateUserIP();
    localStorage.setItem('userIP', userIP);
    
    const votes = JSON.parse(localStorage.getItem('userVotes_' + userIP) || '[]');
    setUserVotes(votes);
    setHasVoted(votes.length >= 2);
  }, []);

  const generateUserIP = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
  };

  const handleVote = (ideaId) => {
    if (hasVoted) {
      toast({
        title: "Límite alcanzado",
        description: "Ya has votado por 2 ideas. No puedes votar más.",
        variant: "destructive"
      });
      return;
    }

    if (userVotes.includes(ideaId)) {
      toast({
        title: "Ya votaste",
        description: "Ya has votado por esta idea.",
        variant: "destructive"
      });
      return;
    }

    const newVotes = [...userVotes, ideaId];
    const userIP = localStorage.getItem('userIP');
    
    localStorage.setItem('userVotes_' + userIP, JSON.stringify(newVotes));
    setUserVotes(newVotes);

    const updatedIdeas = votingIdeas.map(idea => 
      idea.id === ideaId ? { ...idea, votes: (idea.votes || 0) + 1 } : idea
    );
    
    setVotingIdeas(updatedIdeas);
    localStorage.setItem('votingIdeas', JSON.stringify(updatedIdeas));

    if (newVotes.length >= 2) {
      setHasVoted(true);
      toast({
        title: "¡Votación completa!",
        description: "Has usado todos tus votos. ¡Gracias por participar!"
      });
    } else {
      toast({
        title: "¡Voto registrado!",
        description: `Te queda ${2 - newVotes.length} voto más.`
      });
    }
  };

  const getWinners = () => {
    if (votingIdeas.length === 0) return [];
    const maxVotes = Math.max(...votingIdeas.map(idea => idea.votes || 0));
    return votingIdeas.filter(idea => (idea.votes || 0) === maxVotes && maxVotes > 0);
  };

  const winners = getWinners();

  return (
    <>
      <Helmet>
        <title>Votar Ideas - CACO&POLA</title>
        <meta name="description" content="Vota por tus ideas favoritas en nuestro evento especial de votación." />
      </Helmet>

      <div className="pt-32 pb-12 min-h-screen">
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6"
            >
              Evento de Votación
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            >
              Vota por tus 2 ideas favoritas. Cada usuario puede votar máximo 2 veces.
              {hasVoted && (
                <span className="block mt-2 text-blue-600 font-semibold">
                  ¡Ya has completado tu votación!
                </span>
              )}
            </motion.p>
            
            {winners.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
                    <Trophy className="h-6 w-6" />
                    <span className="font-bold text-lg">
                      {winners.length === 1 ? 'Idea Ganadora' : 'Ideas Ganadoras'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {votingIdeas.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <Card className="glass-effect max-w-md mx-auto">
                  <CardContent className="p-8">
                    <p className="text-gray-600 text-lg">
                      El evento de votación aún no ha comenzado. ¡Mantente atento!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {votingIdeas.map((idea, index) => {
                  const isWinner = winners.some(winner => winner.id === idea.id);
                  const hasUserVoted = userVotes.includes(idea.id);
                  
                  return (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="h-full"
                    >
                      <Card className={`glass-effect hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${
                        isWinner ? 'ring-2 ring-yellow-400 border-yellow-400/50' : ''
                      }`}>
                        <CardContent className="p-0 flex flex-col flex-grow">
                          {isWinner && (
                            <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
                              <Trophy className="h-4 w-4" />
                              <span>Ganador</span>
                            </div>
                          )}

                          <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative flex items-center justify-center">
                            {idea.fileType === 'image' && idea.image ? (
                              <img src={idea.image} alt="Idea de diseño para votar" className="w-full h-full object-cover" />
                            ) : idea.fileType === 'pdf' ? (
                               <FileText className="w-16 h-16 text-gray-400" />
                            ) : (
                              <img  class="w-full h-full object-cover" alt="Idea de diseño para votar" src="https://images.unsplash.com/photo-1687038662093-081fffe489c6" />
                            )}
                          </div>

                          <div className="p-6 flex flex-col flex-grow">
                            <p className="text-gray-700 mb-4 leading-relaxed flex-grow">{idea.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4 mt-auto">
                              <div className="flex items-center space-x-1"><User className="h-4 w-4" /><span>{idea.name}</span></div>
                              <div className="flex items-center space-x-1"><MapPin className="h-4 w-4" /><span>{idea.country}</span></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Button
                                onClick={() => handleVote(idea.id)}
                                disabled={hasVoted || hasUserVoted}
                                className={`flex items-center space-x-2 ${
                                  hasUserVoted ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600'
                                } text-white disabled:opacity-50`}
                              >
                                <Heart className={`h-4 w-4 ${hasUserVoted ? 'fill-current' : ''}`} />
                                <span>{hasUserVoted ? 'Votado' : 'Me gusta'}</span>
                              </Button>
                              <div className="flex items-center space-x-1 text-gray-600">
                                <Heart className="h-4 w-4" />
                                <span className="font-semibold">{idea.votes || 0}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Card className="glass-effect max-w-md mx-auto">
                <CardContent className="p-6">
                  <p className="text-gray-600">
                    Votos utilizados: <span className="font-bold text-blue-600">{userVotes.length}/2</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VoteIdeasPage;