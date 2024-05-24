import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from 'react';
import { authStateListener } from './firebase';
import EventsJoined from './components/EventsJoined';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authStateListener((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <Router>
      <Routes>
        {/* Racine */}
        <Route path="/" element={
        <main className='flex min-h-screen bg-zinc-100'>
          <div className='flex-grow'>
            <Home />
          </div>
        </main>
        } />
        {/* Connexion */}
        <Route path="/login" element={
        <main className='flex min-h-screen bg-zinc-100'>
          <div className='flex flex-grow'>
            <Login />
          </div>
        </main>
        } />
        {/* Profil */}
        <Route path="/profile" element={
          <PrivateRoute>
            <main className='flex min-h-screen bg-zinc-100'>
              <div className='flex w-full'>
                <Profile />
              </div>
            </main>
          </PrivateRoute>
        } />
        {/* Evènements rejoints */}
        <Route path="/joined" element={
          <PrivateRoute>
            <main className='flex min-h-screen bg-zinc-100'>
              <div className='flex w-full'>
                <EventsJoined />
              </div>
            </main>
          </PrivateRoute>
        } />
        {/* 404 */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Toaster richColors className="bg-zinc-400" />
    </Router>
  );
}

export default App;