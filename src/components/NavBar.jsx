import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"  
import { Link } from 'react-router-dom';
import CreateEvent from "./CreateEvent";
import useAuth from '../hooks/useAuth';
import DropDown from "./DropDown";
import { Home } from 'lucide-react';
import { ModeToggle } from "./mode-toggle";

function NavBar() {
    const { user, loading: authLoading } = useAuth();

    if (authLoading) {
        return <p>Chargement de l&apos;utilisateur...</p>;
    }
    return (
        <NavigationMenu className="fixed top-0 left-0 justify-end items-center border-b p-2 w-screen max-w-screen pr-6">
        <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/"><NavigationMenuLink className="flex items-center"><Home className="mr-2 h-4 w-4" />Accueil</NavigationMenuLink></Link>
            </NavigationMenuItem>
            {!user &&
            <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/login"><NavigationMenuLink>Se connecter</NavigationMenuLink></Link>
            </NavigationMenuItem>
            }
            <NavigationMenuItem>
                <CreateEvent />
            </NavigationMenuItem>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><DropDown /></TooltipTrigger>
                        <TooltipContent>
                        <p>Profil</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            <NavigationMenuItem>
                <ModeToggle />
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavBar;