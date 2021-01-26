import './Login.css';
import {toast} from 'react-toastify';
import {useState, useRef, useEffect} from 'react';
import ReactPlayer from 'react-player';
import {InfoOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons';
import CKLogo from '../assets/logo_ck.png';
import SHLogo from '../assets/logo_sh.png';
import {db, auth, timestamp} from '../firebase';

function Login({initUser}) {
	
	const [loading, setLoading] = useState(null);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [passwordReset, setPasswordReset] = useState(false);
	const [teamname, setTeamname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const emailInp = useRef(null);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!email && teamname) {
			db.collection('usernames').doc(teamname).get().then((data)=> {
				if(data.exists) {
					if(passwordReset) {
						auth.sendPasswordResetEmail(email).then((response) => { toast.info("Check your Inbox/Spam folder and follow the steps in the email that we have sent, to reset your password. If your facing any trouble, please contact us.", {autoClose: 10000}); setLoading(false);}).catch((error) => {toast.error(error.message);setLoading(false);});
					} else {
					auth.signInWithEmailAndPassword(data.data().email, password).then(()=> {setLoading(false); toast.success('Yay! You are now logged in!')}).catch((error) => {toast.error(error.message); setLoading(false)});
					}
				} else {
					toast.error("Seems like the teamname you've entered that doesn't exist. Try again or use ypur email to login.");
					setLoading(false);
				}	
			});	
		} else {
			if(passwordReset) {
				auth.sendPasswordResetEmail(email).then((response) => { toast.info("Check your Inbox/Spam folder and follow the steps in the email that we have sent, to reset your password. If your facing any trouble, please contact us.", {autoClose: 10000}); setLoading(false);}).catch((error) => {toast.error(error.message);setLoading(false);
			} else {
				auth.signInWithEmailAndPassword(email, password).then(()=> {setLoading(false); toast.success("Welcome back, you're logged in!")}).catch((error) => {toast.error(error.message); setLoading(false)});
			}
		}
	}
	
	
  return(
  <div className='login'>
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
			<span style={{marginTop: 'auto'}}>
				<h3 style={{marginBottom: "1rem"}}>Contact</h3>
				<p><a className="link" href="mailto:christ.kengeri1@gmail.com">christ.kengeri1@gmail.com</a></p>
				<p><a className="link" href="https://instagram.com/christ.keng">@christ.keng</a></p>
			</span>
		</div>
		<div className="login__right">
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="form__inner">
						<div className="input__field">
							<label for="teamname">Team Name</label>
							<input disabled={email} id="teamname" placeholder="spotihunters" required={!email} value={teamname} onChange={(e) => setTeamname(e.target.value)} />
						</div>
						<p className="input__separator">-or-</p>
						<div className="input__field">
							<label for="email">Email Address</label>
							<input disabled={teamname} ref={emailInp} id="email" type="email" placeholder="johndoe@gmail.com" required={!teamname} value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						{!passwordReset && (<div className="input__field password">
							<label for="password">Password</label>
							<input id="password" type={passwordVisible ? 'text' : 'password'} placeholder={passwordVisible ? 'password' : '••••••••'} required minlength="8" value={password} onChange={(e) => setPassword(e.target.value)}/>
							{
							passwordVisible ?
							(<VisibilityOffOutlined className="input__icon" style={{fontSize: 20}} onClick={() => setPasswordVisible((passwordVisible) => !passwordVisible)} />) :
							(<VisibilityOutlined className="input__icon" style={{fontSize: 20}} onClick={() => setPasswordVisible((passwordVisible) => !passwordVisible)}/>)
							}
						</div>)}
				</div>
				{passwordReset ?
				(<button type="submit" disabled={loading}>{(loading) ? 'Verifying...' : 'Reset Password'}</button>) : 
				(<button type="submit" disabled={loading || !initUser}>{(loading || !initUser) ? 'Logging In...' : 'Login'}</button>)}
				<p style={{fontWeight: 800, textAlign: 'center', marginTop: '1.5rem'}} onClick={()=>setPasswordReset(!passwordReset)}>{passwordReset ? 'Back to Login' : 'Forgot Password?'}</p>
			</form>
		</div>
	</div>
	</div>
	);
}

export default Login;