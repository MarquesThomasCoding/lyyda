import { useParams } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import NavBar from "./NavBar";
import { Separator } from "./ui/separator";
import { UserPlus } from "lucide-react";

function Profile() {
    // Récupérer les paramètres de l'URL
    const { id } = useParams();

    // Récupérer les données de l"utilisateur avec l'ID
    const userData = useUserData(id);

    return (
        <>
            <NavBar />
            {!userData && <p>Utilisateur introuvable</p>}
            {userData &&
            <>
                <Card className="w-full m-20 max-md:m-4 max-md:mt-20">
                    <CardHeader>
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={userData.photoURL} alt={userData.username} />
                            <AvatarFallback>{userData.username.charAt(0) + userData.username.charAt(userData.username.length-1)}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{userData.username}</CardTitle>
                        <Separator />
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{userData.bio}</CardDescription>
                    </CardContent>

                    <CardFooter>
                        <Button ><UserPlus className="mr-1 h-4 w-4" /> Suivre</Button>
                    </CardFooter>
                </Card>
            </>
            }
        </>
    )
}

export default Profile;