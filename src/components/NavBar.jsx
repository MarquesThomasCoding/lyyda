import {
    NavigationMenu,
    // NavigationMenuContent,
    // NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    // NavigationMenuTrigger,
    // NavigationMenuViewport,
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

function NavBar() {
    const { user, loading: authLoading } = useAuth();

    if (authLoading) {
        return <p>Chargement de l&apos;utilisateur...</p>;
    }
    return (
        <NavigationMenu className="fixed top-0 left-0 justify-end items-center border-b border-zinc-300 p-2 w-screen max-w-screen">
        <NavigationMenuList>
            <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/"><NavigationMenuLink>Lyyda</NavigationMenuLink></Link>
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
        </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavBar;