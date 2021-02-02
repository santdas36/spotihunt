import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './components/Register';
import Unsupported from './components/Unsupported';
import Timer from './components/Timer';
import EventPage from './EventPage';
import ReactPlayer from 'react-player';
import {useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';

function App() {
	const [loaded, setLoaded] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const hasMinWidth = window.matchMedia('(min-width: 720px)').matches;
	
  return (
    <div className="app">
      {hasMinWidth ?
      	(<>{loaded ? 
      	<Register /> :
      	<ReactPlayer
      		className={`intro__video ${fadeOut ? 'fadeOut' : ''}`}
      		url="https://github.com/santdas36/spot-i-hunt/raw/main/intro.mp4"
      		width="100%"
      		height="100%"
      		playing
      		muted
      		onEnded={() => {
      			setFadeOut(true);
      			setTimeout(()=> setLoaded(true), 1000)
      		}}
      	/>
      	}</>) :
      	(<Unsupported/>)
      }
      
      <Timer />
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
