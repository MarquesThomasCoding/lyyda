/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import EditProfile from './components/EditProfile';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from "@/components/ui/sonner"
import { useEffect, useState } from 'react';
import { authStateListener } from './firebase';
import EventsJoined from './components/EventsJoined';
import EventsCreated from './components/EventsCreated';
import { ThemeProvider } from "@/components/theme-provider"

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <Routes>
        {/* Racine */}
        <Route path="/" element={
        <main className='flex min-h-screen'>
          <div className='flex-grow'>
            <Home />
          </div>
        </main>
        } />
        {/* Connexion */}
        <Route path="/login" element={
        <main className='flex min-h-screen'>
          <div className='flex flex-grow'>
            <Login />
          </div>
        </main>
        } />
        {/* Profil */}
        <Route path="/profile" element={
          <PrivateRoute>
            <main className='flex min-h-screen'>
              <div className='flex w-full'>
                <EditProfile />
              </div>
            </main>
          </PrivateRoute>
        } />
        {/* Page profil avec paramètre ?id= */}
        <Route path="/profile/:id" element={
          <PrivateRoute>
            <main className='flex min-h-screen'>
              <div className='flex w-full'>
                <Profile />
              </div>
            </main>
          </PrivateRoute>
        } />
        {/* Evènements rejoints */}
        <Route path="/joined" element={
          <PrivateRoute>
            <main className='flex min-h-screen'>
              <div className='flex w-full'>
                <EventsJoined />
              </div>
            </main>
          </PrivateRoute>
        } />
        {/* Evènements créés */}
        <Route path="/myevents" element={
          <PrivateRoute>
            <main className='flex min-h-screen'>
              <div className='flex w-full'>
                <EventsCreated />
              </div>
            </main>
          </PrivateRoute>
        } />
        {/* 404 */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Toaster richColors className="bg-zinc-400" />
    </Router>
    </ThemeProvider>
  );
}

export default App;