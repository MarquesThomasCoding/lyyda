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
        <Route path="/" element={<>
          <NavigationBar />
          <Home />
        </>} />
        <Route path="/event/:id" element={<>
          <NavigationBar />
          <EventDetails />
        </>} />
        <Route path="/create" element={<PrivateRoute><>
          <NavigationBar />
          <CreateEvent />
        </></PrivateRoute>} />
        <Route path="/login" element={<>
          <NavigationBar />
          <Login />
        </>} />
        <Route path="/signup" element={<>
          <NavigationBar />
          <Signup />
        </>} />
      </Routes>
    </Router>
  );
}

export default App;


function NavigationBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/create">Créer un événement</Link></li>
        <li><Link to="/login">Se connecter</Link></li>
        <li><Link to="/signup">S&apos;inscrire</Link></li>
      </ul>
    </nav>
  );
}