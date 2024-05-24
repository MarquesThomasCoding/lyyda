import NavBar from "./NavBar";
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
  

function Profile() {
    const { user, loading } = useAuth();
    const userData = useUserData(user?.uid);

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (userData) {
            setUsername(userData.username);
            setBio(userData.bio);
            setAvatar(userData.photoURL);
        }
    }, [userData]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
    
        setUpdating(true);
    
        try {
          const docRef = doc(firestore, 'users', user.uid);
          await updateDoc(docRef, {
            username,
            bio,
          });
          toast.success('Profil mis à jour avec succès');
        } catch (error) {
          toast.error("Une erreur est survenue lors de la mise à jour du profil");
          console.error('Error updating profile:', error);
        } finally {
          setUpdating(false);
        }
      };

    if (loading) {
    return <p>Chargement...</p>;
    }

    if (!user) {
    return <p>Vous devez être connecté pour accéder à cette page.</p>;
    }

    if (!userData) {
    return <p>Chargement des données de l&#39;utilisateur...</p>;
    }

    return (
        <>
            <NavBar />
            
            <Card className="w-full m-4 mt-20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Avatar className="w-14 h-14">
                            <AvatarImage src={avatar} alt="Avatar" />
                            <AvatarFallback>{username.charAt(0) + username.charAt(username.length-1)}</AvatarFallback>
                        </Avatar>
                        {username}
                    </CardTitle>
                    <CardDescription>{bio}</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-10">
                    <form onSubmit={handleUpdateProfile}>
                        <Label htmlFor="username">Nom d&apos;utilisateur</Label>
                        <Input 
                            className="mt-2 mb-6"
                            type="text" 
                            id="username"
                            placeholder="Nom d'utilisateur" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Label htmlFor="biography">Biographie</Label>
                        <Textarea 
                            className="mt-2 mb-6 resize-none"
                            id="biography"
                            placeholder="Biographie" 
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <Button type="submit" disabled={updating}>
                            {updating ? 'Mise à jour...' : 'Mettre à jour'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default Profile;