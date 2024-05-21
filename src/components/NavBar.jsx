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
import { Link } from 'react-router-dom';
import CreateEvent from "./CreateEvent";
import useAuth from '../hooks/useAuth';

function NavBar() {
    const { user, loading: authLoading } = useAuth();

    if (authLoading) {
        return <p>Chargement de l&apos;utilisateur...</p>;
    }
    return (
        <NavigationMenu className="fixed top-0 left-0 justify-end border-b border-zinc-300 p-2 w-screen max-w-screen">
        <NavigationMenuList>
            <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/"><NavigationMenuLink className="flex items-center">Lyyda</NavigationMenuLink></Link>
            </NavigationMenuItem>
            {!user &&
            <NavigationMenuItem>
                    <Link className={navigationMenuTriggerStyle()} to="/login"><NavigationMenuLink>Se connecter</NavigationMenuLink></Link>
            </NavigationMenuItem>
            }
            <NavigationMenuItem>
                <CreateEvent />
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavBar;