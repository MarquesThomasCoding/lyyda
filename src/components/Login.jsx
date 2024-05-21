// src/components/Login.jsx
import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// import { Google } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore, provider, signInWithPopup } from '../firebase';

import { toast } from "sonner"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Vous êtes connecté avec Google");
      navigate('/');
    } catch (error) {
      toast.error("Une erreur est survenue lors de la connexion avec Google");
      console.error(error);
    }
  };

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      setError('Vous devez renseigner une adresse email et un mot de passe');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Vous êtes connecté");
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
        setError('Utilisateur introuvable');
      } else {
        setError(err.message);
      }
    }
  };

  const handleSignup = async () => {
    const passwordMatch = password === document.getElementById('password-match').value;
    setError('');

    if (!passwordMatch) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!email || !password || !username) {
      setError('Vous devez renseigner un pseudo, une adresse email et un mot de passe');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Stocker les informations de l'utilisateur dans Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        id: user.uid,
        username,
      });
      toast.success("Votre compte a été créé avec succès");
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Cette addresse email est déjà utilisée');
      } else if (err.code === 'auth/weak-password') {
        setError('Le mot de passe doit contenir au moins 6 caractères');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <Tabs defaultValue="login" className="w-[400px] m-auto">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Se connecter</TabsTrigger>
        <TabsTrigger value="signup">S&#39;inscrire</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription>
              Vous avez déjà un compte ? Connectez-vous avec votre adresse email et votre mot de passe.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email <span className="text-red-600">*</span></Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe <span className="text-red-600">*</span></Label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2">
            <Button onClick={handleLogin}>Se connecter</Button>
            <Button variant='outline' onClick={handleGoogleSignIn} className="flex items-center">
              <img className='w-6 mr-2' src='/imgs/google-logo.png' />
              Connexion avec Google
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>S&apos;inscrire</CardTitle>
            <CardDescription>
              Pas encore de compte ? Créez-en un en renseignant votre adresse email, un mot de passe, et un pseudo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label value={username} htmlFor="username">Pseudo <span className="text-red-600">*</span></Label>
              <Input onChange={(e) => setUsername(e.target.value)} id="username" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email <span className="text-red-600">*</span></Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Mot de passe <span className="text-red-600">*</span></Label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password-match">Confirmer le mot de passe <span className="text-red-600">*</span></Label>
              <Input id="password-match" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2">
            <Button onClick={handleSignup}>S&apos;inscrire</Button>
            <Button variant='outline' onClick={handleGoogleSignIn} className="flex items-center">
              <img className='w-6 mr-2' src='/imgs/google-logo.png' />
              Inscription avec Google
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Login;