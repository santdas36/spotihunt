import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './components/Register';
import EventPage from './EventPage';
import ReactPlayer from 'react-player';
import {useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';

function App() {
	const [loaded, setLoaded] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);
	
  return (
    <div className="app">
      {loaded ? 
      <EventPage /> :
      <ReactPlayer
      	className={`intro__video ${fadeOut ? 'fadeOut' : ''}`}
      	url="https://github.com/santdas36/spot-i-hunt/raw/main/intro.mp4"
      	width="100%"
      	height="100%"
      	playing
      	muted
      	onEnded={() => {
      		setFadeOut(true);
      		setTimeout(()=> setLoaded(true), 1000)}
      		}/>
      }
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
