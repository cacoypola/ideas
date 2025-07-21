
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LogIn } from 'lucide-react';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();

    // NOTA: Estas son las credenciales solicitadas.
    // En una aplicación real, esto debería manejarse de forma segura en un backend.
    if (username === 'Iago' && password === 'Mjmlpf08@') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      navigate('/admin');
      toast({
        title: '¡Éxito!',
        description: 'Has iniciado sesión como administrador.',
      });
    } else {
      toast({
        title: 'Error de inicio de sesión',
        description: 'Usuario o contraseña incorrectos.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Admin - CACO&POLA</title>
        <meta name="description" content="Página de inicio de sesión para administradores." />
      </Helmet>
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md px-4"
        >
          <Card className="glass-effect border-white/30 text-white">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Acceso de Administrador
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="username" className="text-white mb-2 block font-semibold">Usuario</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg"
                    placeholder="Iago"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white mb-2 block font-semibold">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-3 text-lg rounded-xl shadow-lg">
                  <LogIn className="mr-2 h-5 w-5" />
                  Iniciar Sesión
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
