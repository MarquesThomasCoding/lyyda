import { Suspense } from 'react';
import EventsList from './EventsList';
import NavBar from './NavBar';


const Home = () => {

  return (
    <div className='m-14'>

      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <EventsList />
      </Suspense>
    </div>
  );
};

export default Home;
