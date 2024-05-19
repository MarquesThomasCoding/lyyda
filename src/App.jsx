import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <Router>
      <Routes>
        {/* Racine */}
        <Route path="/" element={
        <main className='flex min-h-screen bg-slate-900'>
          <div className='flex-grow-0'>
            <NavigationBar />
          </div>
          <div className='flex-grow'>
            <Home />
          </div>
        </main>
        } />
        {/* Connexion */}
        <Route path="/login" element={
        <main className='flex min-h-screen bg-slate-900'>
          <div className='flex-grow-0'>
            <NavigationBar />
          </div>
          <div className='flex flex-grow'>
            <Login />
          </div>
        </main>
        } />
      </Routes>
      <Toaster richColors className="bg-slate-600" />
    </Router>
  );
}

export default App;


function NavigationBar() {
  return (
    <nav className='text-slate-400 text-lg font-bold py-8 h-full  border-r-[1px] border-slate-600'>
      <ul className='flex flex-col items-start'>
        <li className='w-full hover:bg-slate-700 hover:text-slate-200'><Link className='flex w-full px-10 py-2' to="/">Accueil</Link></li>
        <li className='w-full hover:bg-slate-700 hover:text-slate-200'><Link className='flex w-full px-10 py-2' to="/login">Se connecter</Link></li>
        <li className='w-full hover:bg-slate-700 hover:text-slate-200'><Link className='flex w-full px-10 py-2' to="/signup">S&apos;inscrire</Link></li>
      </ul>
    </nav>
  );
}