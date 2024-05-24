import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Calendar, GalleryVerticalEnd } from 'lucide-react';
import { useLogout } from '../firebase';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserData from '../hooks/useUserData';

function DropDown() {
    const {logout} = useLogout();
    const { user, loading: authLoading } = useAuth();
    const userData = useUserData(user?.uid);

    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (userData) {
            setAvatar(userData.photoURL);
            setUsername(userData.username);
        }
    }, [userData]);

    if (authLoading) {
        return <p>Chargement de l&apos;utilisateur...</p>;
    }

    return (
        <DropdownMenu>
            {user &&
            <DropdownMenuTrigger>
              <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{username ? username[0] : user.email[0]}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            }
            <DropdownMenuContent>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile"><DropdownMenuItem className='cursor-pointer'><User className="mr-2 h-4 w-4" />Profil</DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/myevents"><DropdownMenuItem className='cursor-pointer'><Calendar className="mr-2 h-4 w-4" />Mes évènements</DropdownMenuItem></Link>
                    <Link to="/joined"><DropdownMenuItem className='cursor-pointer'><GalleryVerticalEnd className="mr-2 h-4 w-4" />Mes participations</DropdownMenuItem></Link>
                </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className='cursor-pointer'><LogOut className="mr-2 h-4 w-4" />Me déconnecter</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown;