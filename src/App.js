import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './components/Register';
import Unsupported from './components/Unsupported';
import Timer from './components/Timer';
import EventPage from './EventPage';
import ReactPlayer from 'react-player';
import {useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {VolumeOffRounded, VolumeUpRounded} from '@material-ui/icons';

function App() {
	const [loaded, setLoaded] = useState(false);
	const [muted, setMuted] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);
	const hasMinWidth = window.matchMedia('(min-width: 720px)').matches;
	
  return (
    <div className="app">
      {hasMinWidth ?
      	(<>{loaded ? 
      	<Register /> :
      	<><ReactPlayer
      		className={`intro__video ${fadeOut ? 'fadeOut' : ''}`}
      		url="https://github.com/santdas36/spot-i-hunt/raw/main/intro.mp4"
      		width="100%"
      		height="100%"
      		playing
      		muted={muted}
      		onEnded={() => {
      			setFadeOut(true);
      			setTimeout(()=> setLoaded(true), 1000)
      		}}
      	/>
      	<div className="videoButtons">
      		<span onClick={()=> setLoaded(true)}>Skip Intro</span>
      		<span onClick={()=> setMuted(!muted)}>{muted ? <VolumeOffRounded/> : <VolumeUpRounded/>}</span>
      	</div>
      	</>
      	}</>) :
      	(<Unsupported/>)
      }
      
      <Timer />
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
