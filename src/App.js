import './App.css';
import Register from './components/Register';
import ReactPlayer from 'react-player';
import {useEffect, useState} from 'react';


function App() {
	const [loaded, setLoaded] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	
	useEffect(() => {
		
	}, []);
	
  return (
    <div className="app">
      {loaded ? 
      <Register/> :
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
    </div>
  );
}

export default App;
