import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, MapPin, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ViewIdeasPage = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const approvedIdeas = JSON.parse(localStorage.getItem('approvedIdeas') || '[]');
    setIdeas(approvedIdeas);
  }, []);

  return (
    <>
      <Helmet>
        <title>Ver Ideas - CACO&POLA</title>
        <meta name="description" content="Explora todas las ideas de diseño verificadas y aprobadas por nuestra comunidad." />
      </Helmet>

      <div className="pt-32 pb-12 min-h-screen">
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12"
            >
              Ideas Verificadas
            </motion.h1>

            {ideas.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <Card className="glass-effect max-w-md mx-auto">
                  <CardContent className="p-8">
                    <p className="text-gray-600 text-lg">
                      Aún no hay ideas verificadas. ¡Sé el primero en enviar una!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.map((idea, index) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-effect hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <CardContent className="p-0 flex-grow flex flex-col">
                        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden flex items-center justify-center">
                          {idea.fileType === 'image' && idea.image ? (
                            <img
                              src={idea.image}
                              alt="Idea de diseño"
                              className="w-full h-full object-cover"
                            />
                          ) : idea.fileType === 'pdf' ? (
                            <FileText className="w-16 h-16 text-gray-400" />
                          ) : (
                            <img  class="w-full h-full object-cover" alt="Imagen por defecto de idea de diseño" src="https://images.unsplash.com/photo-1687754946970-5ff99224bd70" />
                          )}
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <p className="text-gray-700 mb-4 leading-relaxed flex-grow">
                            {idea.description}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{idea.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{idea.country}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ViewIdeasPage;