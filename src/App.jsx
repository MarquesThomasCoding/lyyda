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
        <main className='flex min-h-screen'>
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
        <main className='flex min-h-screen'>
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
          <main className='flex min-h-screen'>
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
        <main className='flex min-h-screen'>
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
        <main className='flex min-h-screen'>
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
    <nav className='text-gray text-lg font-bold py-8 h-full  border-r-[1px] border-slate-600'>
      <ul className='flex flex-col items-start'>
        <li className='w-full hover:bg-slate-700 hover:text-slate-200'><Link className='flex w-full px-10 py-2' to="/">Accueil</Link></li>
        <li className='w-full hover:bg-slate-700 hover:text-slate-200'><Link className='flex w-full px-10 py-2' to="/create">Créer un événement</Link></li>
        <li className='w-full hover:bg-slate-700 hover:text-slate-200'><Link className='flex w-full px-10 py-2' to="/login">Se connecter</Link></li>
        <li className='w-full hover:bg-slate-700 hover:text-slate-200'><Link className='flex w-full px-10 py-2' to="/signup">S&apos;inscrire</Link></li>
      </ul>
    </nav>
  );
}