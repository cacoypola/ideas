import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Send, CheckCircle, Upload, X, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import imageCompression from 'browser-image-compression';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    description: '',
    file: null,
    filePreview: null,
    fileType: null,
  });
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    if (!isImage && !isPdf) {
      toast({
        title: "Archivo no válido",
        description: "Por favor, sube solo archivos de imagen o PDF.",
        variant: "destructive",
      });
      return;
    }

    let processedFile = file;
    if (isImage) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        processedFile = await imageCompression(file, options);
      } catch (error) {
        toast({
          title: "Error de compresión",
          description: "No se pudo comprimir la imagen.",
          variant: "destructive",
        });
        return;
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        file: processedFile,
        filePreview: reader.result,
        fileType: isImage ? 'image' : 'pdf',
      }));
    };
    reader.readAsDataURL(processedFile);
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null, filePreview: null, fileType: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.country || !formData.email || !formData.description) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }
    setShowModal(true);
  };

  const handleAcceptTerms = async () => {
    let userIp = 'No disponible';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      userIp = data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
    }

    const ideas = JSON.parse(localStorage.getItem('pendingIdeas') || '[]');
    const newIdea = {
      id: Date.now(),
      name: formData.name,
      country: formData.country,
      email: formData.email,
      description: formData.description,
      image: formData.filePreview,
      fileType: formData.fileType,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      userIp: userIp,
    };

    ideas.push(newIdea);
    localStorage.setItem('pendingIdeas', JSON.stringify(ideas));

    setShowModal(false);
    setFormData({ name: '', country: '', email: '', description: '', file: null, filePreview: null, fileType: null });
    removeFile();

    toast({
      title: "¡Idea enviada!",
      description: "Tu idea ha sido enviada para revisión. ¡Gracias!",
    });
  };

  const steps = [
    { icon: Lightbulb, title: "Crea tu idea", description: "Crea tu idea y súbela a nuestra plataforma." },
    { icon: Send, title: "Envíala", description: "Rellena el formulario con tus datos y tu idea. ¡Es muy fácil!" },
    { icon: CheckCircle, title: "Verificación y Publicación", description: "La idea será verificada y, si es aceptada, se mostrará públicamente." },
    { icon: Award, title: "¡Gana un premio!", description: "Si tu idea es escogida para votar y resulta ganadora, ¡obtendrás un 15% de descuento en esa camiseta!" }
  ];

  return (
    <>
      <Helmet>
        <title>Inicio - CACO&POLA</title>
        <meta name="description" content="Diseña con ideas, viste con orgullo. Crea y comparte tus ideas de diseño." />
      </Helmet>
      <div className="pt-24 pb-12 min-h-screen">
        <section className="py-20 px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
            CACO&POLA
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl md:text-2xl text-gray-600 font-light uppercase tracking-wider">
            diseña con ideas, viste con orgullo
          </motion.p>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Cómo Funciona
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }}>
                  <Card className="text-center h-full glass-effect hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="mb-6 flex justify-center">
                        <div className="p-4 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 text-white">
                          <step.icon className="h-8 w-8" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Envía Tu Idea
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card className="glass-effect">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 mb-2 block font-semibold">Nombre *</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="bg-white/50 border-gray-300" placeholder="Tu nombre" required />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-gray-700 mb-2 block font-semibold">País *</Label>
                        <Input id="country" name="country" value={formData.country} onChange={handleInputChange} className="bg-white/50 border-gray-300" placeholder="Tu país" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 mb-2 block font-semibold">Correo electrónico * (privado)</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-white/50 border-gray-300" placeholder="tu@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-gray-700 mb-2 block font-semibold">Descripción de la idea *</Label>
                      <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="bg-white/50 border-gray-300 min-h-[120px]" placeholder="Describe tu idea de diseño..." required />
                    </div>
                    <div>
                      <Label htmlFor="file" className="text-gray-700 mb-2 block font-semibold">Archivo (Imagen o PDF, opcional)</Label>
                      <Input id="file" name="file" type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                      {formData.filePreview ? (
                        <div className="relative group">
                          {formData.fileType === 'image' ? (
                            <img src={formData.filePreview} alt="Previsualización" className="w-full h-auto max-h-60 object-cover rounded-md border border-gray-300" />
                          ) : (
                            <div className="p-4 border border-gray-300 rounded-md text-center bg-gray-50">Archivo PDF cargado.</div>
                          )}
                          <Button variant="destructive" size="icon" onClick={removeFile} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button type="button" variant="outline" className="w-full" onClick={() => fileInputRef.current.click()}>
                          <Upload className="mr-2 h-4 w-4" /> Subir archivo
                        </Button>
                      )}
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 text-lg rounded-lg">Enviar Idea</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="glass-effect">
            <DialogHeader>
              <DialogTitle>Términos y Condiciones</DialogTitle>
              <DialogDescription>
                No se permite contenido ofensivo, violento, sexual o discriminatorio. Si se detecta contenido inapropiado, tu IP será baneada. Lee nuestros <Link to="/legal" className="text-blue-600 hover:underline">términos completos aquí</Link>.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={handleAcceptTerms} className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">Acepto y Enviar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default HomePage;