import { useState } from 'react';
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Stocker les informations de l'utilisateur dans Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        id: user.uid
      });

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Créer un compte</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S&apos;inscrire</button>
      </form>
      <p>
        Déjà inscrit? <a href="/login">Se connecter</a>
      </p>
    </div>
  );
};

export default Signup;
