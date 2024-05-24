import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
import { firestore, signInWithGoogle } from '../firebase';

import { toast } from "sonner"
import { Separator } from './ui/separator';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      console.error('Error signing in with Google', err);
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
        bio: ''
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
      <TabsList className="grid w-full grid-cols-2 bg-zinc-200">
        <TabsTrigger value="login">Se connecter</TabsTrigger>
        <TabsTrigger value="signup">S&#39;inscrire</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription className="flex flex-col items-center justify-center">
              <Button variant='outline' onClick={handleGoogleSignIn} className="flex items-center my-4">
                <img className='w-6 mr-2' src='/imgs/google-logo.png' />
                Connexion avec Google
              </Button>
              <div className='flex justify-between items-center w-full'>
                <Separator className="w-5/12" />
                <span>ou</span>
                <Separator className="w-5/12" />
              </div>
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
          <CardFooter>
            <Button onClick={handleLogin}><LogIn className="mr-2 h-4 w-4" /><p>Se connecter</p></Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>S&apos;inscrire</CardTitle>
            <CardDescription className="flex flex-col items-center justify-center">
              <Button variant='outline' onClick={handleGoogleSignIn} className="flex items-center my-4">
                <img className='w-6 mr-2' src='/imgs/google-logo.png' />
                Inscription avec Google
              </Button>
              <div className='flex justify-between items-center w-full'>
                <Separator className="w-5/12" />
                <span>ou</span>
                <Separator className="w-5/12" />
              </div>
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
          <CardFooter>
            <Button onClick={handleSignup}><LogIn className="mr-2 h-4 w-4" /><p>S&apos;inscrire</p></Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Login;