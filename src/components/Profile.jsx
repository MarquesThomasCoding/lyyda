import NavBar from "./NavBar";
import useAuth from '../hooks/useAuth';
import useUserData from '../hooks/useUserData';

function Profile() {
    const { user, loading } = useAuth();
    const userData = useUserData(user?.uid); // Utilisation de user?.uid pour éviter l'erreur si user est null

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
            
            <div>
                <p>{userData.username}</p>
                <p>Description</p>
                <p>Rejoint le</p>
                <p>Evénements créés</p>
                <p>Evénements rejoins</p>
                <p>Abonnés</p>
                <p>Abonnements</p>
                <p>Tags</p>
            </div>
        </>
    )
}

export default Profile;