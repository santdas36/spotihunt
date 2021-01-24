import './Login.css';
import Modal from './Modal';
import {useState, useRef, useEffect} from 'react';
import ReactPlayer from 'react-player';
import {InfoOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons';
import CKLogo from '../assets/logo_ck.png';
import SHLogo from '../assets/logo_sh.png';
import {db, auth, timestamp} from '../firebase';

function Login() {
	
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	const [passwordVisible, setPasswordVisible] = useState(false);
	
	const [teamname, setTeamname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
	}
	
	
  return(
  <div className='login'>
    {error && <Modal message={error} title="Error Occurred..." close={()=>setError(null)}/>}
    <ReactPlayer
      className='login__background'
      url='https://github.com/santdas36/spot-i-hunt/raw/main/registration_background.mp4'
      width='100%'
      height='100%'
      playing
      muted
      loop
      />
	
	<div className="login__inner">
		<div className="login__left">
			<span style={{marginBottom: "5rem"}}>
				<img src={CKLogo} className="logo__ck" />
				<img src={SHLogo} className="logo__sh" />
			</span>
			<span style={{marginBottom: "5rem"}}>
				<p style={{marginBottom: "1.5rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lbore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
				<p>You can login your team here. If you've already logined, go chill to your favorite playlist, while keeping an eye out on your inbox and our social media pages.</p>
			</span>
			<span>
				<h3 style={{marginBottom: "1rem"}}>Contact</h3>
				<p><a className="link" href="mailto:christ.kengeri1@gmail.com">christ.kengeri1@gmail.com</a></p>
				<p><a className="link" href="https://instagram.com/christ.keng">@christ.keng</a></p>
			</span>
		</div>
		<div className="login__right">
			<form onSubmit={(e) => handleSubmit(e)}>
				<h2>Login</h2>
				<div className="form__inner">
						<div className="input__field">
							<label for="teamname">Team Name</label>
							<input id="teamname" placeholder="spotihunters" required value={teamname} onChange={(e) => setTeamname(e.target.value)} />
						</div>
						or
						<div className="input__field">
							<label for="email">Email Address</label>
							<input id="email" type="email" placeholder="johndoe@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="input__field password">
							<label for="password">Password</label>
							<input id="password" type={passwordVisible ? 'text' : 'password'} placeholder={passwordVisible ? 'password' : '••••••••'} required minlength="8" value={password} onChange={(e) => setPassword(e.target.value)}/>
							{
							passwordVisible ?
							(<VisibilityOffOutlined className="input__icon" style={{fontSize: 20}} onClick={() => setPasswordVisible((passwordVisible) => !passwordVisible)} />) :
							(<VisibilityOutlined className="input__icon" style={{fontSize: 20}} onClick={() => setPasswordVisible((passwordVisible) => !passwordVisible)}/>)
							}
						</div>
				</div>
				<button type="submit" disabled={loading}>{loading ? 'Logging In...' : 'Login'}</button>
			</form>
		</div>
	</div>
	</div>
	);
}

export default Login;