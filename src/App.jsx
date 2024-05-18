import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import EventDetails from './components/EventDetails';
import CreateEvent from './components/CreateEvent';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Racine */}
        <Route path="/" element={
        <main className='flex'>
          <div className='flex-grow-0'>
            <NavigationBar />
          </div>
          <div className='flex-grow'>
            <Home />
          </div>
        </main>
        } />
        {/* Evènement par id */}
        <Route path="/event/:id" element={
        <main className='flex'>
          <div className='flex-grow-0'>
            <NavigationBar />
          </div>
          <div className='flex-grow'>
            <EventDetails />
          </div>
        </main>
        } />
        {/* Création d'évènement */}
        <Route path="/create" element={
        <PrivateRoute>
          <main className='flex'>
            <div className='flex-grow-0'>
              <NavigationBar />
            </div>
            <div className='flex-grow'>
              <CreateEvent />
            </div>
          </main>
        </PrivateRoute>
        } />
        {/* Connexion */}
        <Route path="/login" element={
        <main className='flex'>
          <div className='flex-grow-0'>
            <NavigationBar />
          </div>
          <div className='flex-grow'>
            <Login />
          </div>
        </main>
        } />
        {/* Inscription */}
        <Route path="/signup" element={
        <main className='flex'>
          <div className='flex-grow-0'>
            <NavigationBar />
          </div>
          <div className='flex-grow'>
            <Signup />
          </div>
        </main>
        } />
      </Routes>
    </Router>
  );
}

export default App;


function NavigationBar() {
  return (
    <nav className='text-slate-200 font-bold px-10 py-8'>
      <ul className='flex flex-col gap-4 items-start'>
        <li className='hover:text-violet-600'><Link to="/">Accueil</Link></li>
        <li className='hover:text-violet-600'><Link to="/create">Créer un événement</Link></li>
        <li className='hover:text-violet-600'><Link to="/login">Se connecter</Link></li>
        <li className='hover:text-violet-600'><Link to="/signup">S&apos;inscrire</Link></li>
      </ul>
    </nav>
  );
}