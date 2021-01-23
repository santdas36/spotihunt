import './EventPage.css';
import Sidebar from './components/Sidebar';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import {useEffect, useState} from 'react';


function EventPage() {
  return (
    <div className="event">
    	<Sidebar/>
    	<Leaderboard/>
    	<Footer/>
    </div>
  );
}

export default EventPage;
