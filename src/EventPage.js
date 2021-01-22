import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import {useEffect, useState} from 'react';


function EventPage() {
  return (
    <div className="event">
    	<Sidebar/>
    	<Footer/>
    </div>
  );
}

export default EventPage;
