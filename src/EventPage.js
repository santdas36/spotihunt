import './EventPage.css';
import Sidebar from './components/Sidebar';
import QuestContainer from './components/QuestContainer';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import {useEffect, useState} from 'react';


function EventPage() {
  return (
    <div className="event">
    	<Sidebar/>
    	<QuestContainer/>
    	<Leaderboard/>
    	<Footer/>
    </div>
  );
}

export default EventPage;
