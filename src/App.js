import './App.css';
import Register from './components/Register';

function App() {
  return (
    <div className="app">
    	<ReactPlayer
          className='react-player'
          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
          width='100%'
          height='100%'
          playing
          loop
        />
      <Register/>
    </div>
  );
}

export default App;
