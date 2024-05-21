import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { Toaster } from "@/components/ui/sonner"

function App() {
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
        <main className='flex min-h-screen bg-zinc-200'>
          <div className='flex flex-grow'>
            <Login />
          </div>
        </main>
        } />
      </Routes>
      <Toaster richColors className="bg-zinc-400" />
    </Router>
  );
}

export default App;


// function NavigationBar() {
//   return (
//     <nav className='text-lg font-bold py-8 h-full  border-r-[1px] border-zinc-400'>
//       <ul className='flex flex-col items-start'>
//         <li className='w-full hover:bg-zinc-700 hover:text-zinc-200'><Link className='flex w-full px-10 py-2' to="/">Accueil</Link></li>
//         <li className='w-full hover:bg-zinc-700 hover:text-zinc-200'><Link className='flex w-full px-10 py-2' to="/login">Se connecter</Link></li>
//       </ul>
//     </nav>
//   );
// }