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

function DropDown() {
    const {logout} = useLogout();
    const { user, loading: authLoading } = useAuth();

    if (authLoading) {
        return <p>Chargement de l&apos;utilisateur...</p>;
    }

    return (
        <DropdownMenu>
            {user &&
            <DropdownMenuTrigger>
              <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            }
            <DropdownMenuContent>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile"><DropdownMenuItem className='cursor-pointer'><User className="mr-2 h-4 w-4" />Profil</DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem><Calendar className="mr-2 h-4 w-4" />Mes évènements</DropdownMenuItem>
                    <DropdownMenuItem><GalleryVerticalEnd className="mr-2 h-4 w-4" />Mes participations</DropdownMenuItem>
                </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className='cursor-pointer'><LogOut className="mr-2 h-4 w-4" />Me déconnecter</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDown;