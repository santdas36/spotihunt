import './Register.css';
import Modal from './Modal';
import {useState, useRef, useEffect} from 'react';
import ReactPlayer from 'react-player';
import {InfoOutlined, VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons';
import CKLogo from '../assets/ck_logo.png';
import {db, auth} from '../firebase';

function Register() {
	
	const nameInput = useRef(null);
	const [mem1,setMem1] = useState(false);
	const [mem2, setMem2] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState(null);
	const [passwordVisible, setPasswordVisible] = useState(false);
	
	const [teamname, setTeamname] = useState('');
	const [validTeamname, setValidTeamname] = useState(false);
	const [name1, setName1] = useState('');
	const [email1, setEmail1] = useState('');
	const [name2, setName2] = useState('');
	const [email2, setEmail2] = useState('');
	const [name3, setName3] = useState('');
	const [email3, setEmail3] = useState('');
	const [password, setPassword] = useState('');
	const [contact, setContact] = useState('');
	const [user, setUser] = useState(null);
	
	const validateTeamname = () => {
		db.collection('usernames').doc(teamname).get().then((data) => {
			if (data.exists) {
				setValidTeamname(false);
				alert('Team name already taken. Please choose another one.');
				nameInput.current.focus();
			} else {
				setValidTeamname(true);
			}
		});
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validTeamname) {
			alert('Team name already taken. Please choose another one.');
			nameInput.current.focus();
		} else {
			setLoading(true);
		auth.createUserWithEmailAndPassword(email1, password).then(() => {
      		auth.currentUser.updateProfile({
              		displayName: teamname,
              		photoURL: `https://avatars.dicebear.com/4.5/api/gridy/${teamname}.svg`,
            	}).then(() => {
            		db.collection('usernames').doc(teamname).set({
            			email: email1
            			});
            		db.collection('users').doc(auth.currentUser.uid).set({
            			teamname: teamname,
            			participantOne: {
            				name: name1,
            				email: email1,
            			},
            			participantTwo: {
            				name: name2,
            				email: email2,
            			},
            			participantThree: {
            				name: name3,
            				email: email3,
            			},
            			contact: contact
            		})
            	}).then(() => {
            		setLoading(false);
            	});
          }).catch((error) => {
          	setLoading(false);
          	setError(error.message);
          	})
		}
	}
	
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setLoggedIn(true);
				const unsubscribe = db.collection('users').doc(user.uid).onSnapshot((snapshot) => {
					setUser(snapshot.data());
				});
				setTimeout(unsubscribe, 10000);
			}
			});
	}, []);
	
  return(
  <div className="register">
    {error && <Modal message={error} title="Error Occurred..." close={()=>setError(null)}/>}
    <ReactPlayer
      className='register__background'
      url='https://github.com/santdas36/spot-i-hunt/raw/main/registration_background.mp4'
      width='100%'
      height='100%'
      playing
      muted
      loop
      />
	<div className="register__inner">
		<div className="register__left">
			<span style={{marginBottom: "5rem"}}>
				<span className="ck_logo">
					<img src={CKLogo} />
					<span>Christ.Keng<br/>
					presents,</span>
				</span>
				<h1>Spot-i-hunt</h1>
			</span>
			<span style={{marginBottom: "5rem"}}>
				<p style={{marginBottom: "1.5rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</p>
				<p>You can register your team here. If you've already registered, go chill to your favorite playlist, while keeping an eye out on your inbox and our social media pages.</p>
			</span>
			<span>
				<h3>Contact</h3>
				<p>someone@gmail.com</p>
				<p>+91 98765 432 01</p>
			</span>
		</div>
		{loggedIn ? (
		<div className="register__right">
			<h3 style={{marginBottom: '3rem'}}>Your team {user?.teamname.toUpperCase()} is successfully registered.</h3>
			<span style={{marginBottom: '3rem'}}> 
			<p style={{marginBottom: '0.5rem'}}>Participants</p>
			<p>1) {user?.participantOne.name} - {user?.participantOne.email}</p>
			{user?.participantTwo.name && (<p>2) {user?.participantTwo.name} - {user?.participantTwo.email}</p>)}
			{user?.participantThree.name && (<p>3) {user?.participantThree.name} - {user.participantThree?.email}</p>)}
			</span>
			<p>You can login using the email <strong>{user?.participantOne.email}</strong> or your team name <strong>{user?.teamname}</strong>, at the time of contest, which will be announced later.</p> 
			</div>) : (
			<div className="register__right">
			<form onSubmit={(e) => handleSubmit(e)}>
				<h2>Register Your Team</h2>
				<div className="form__inner">
					<div className="form__split">
						<div className="input__field">
							<label for="teamname"><h3>Create a name for your team</h3></label>
							<span className="info"><InfoOutlined style={{fontSize: 16}}/> Team name can contain only alphanumeric characterers, and no spaces are allowed. Be unique. Be creative.</span>
							<input ref={nameInput} id="teamname" placeholder="eg: spotihunters" required minlength="6" value={teamname} onBlur={validateTeamname} onChange={(e) => setTeamname(e.target.value)} pattern="^\S+$" />
						</div>
						<div className="input__field">
							<label for="name1">Your Name</label>
							<input id="name1" placeholder="John Doe" required value={name1} onChange={(e) => setName1(e.target.value)} />
						</div>
						<div className="input__field">
							<label for="email1">Your Email Address</label>
							<input id="email1" type="email" placeholder="johndoe@gmail.com" required value={email1} onChange={(e) => setEmail1(e.target.value)} />
							<span className="info bottom"><InfoOutlined style={{fontSize: 16}}/> Your team members will be able login to the contest only using this email or the team name itself.</span>
						</div>
						<div className="input__field password">
							<label for="password">Pick a Password</label>
							<input id="password" type={passwordVisible ? 'text' : 'password'} placeholder={passwordVisible ? 'password' : '••••••••'} required minlength="8" value={password} onChange={(e) => setPassword(e.target.value)}/>
							{
							passwordVisible ?
							(<VisibilityOffOutlined className="input__icon" style={{fontSize: 20}} onClick={() => setPasswordVisible((passwordVisible) => !passwordVisible)} />) :
							(<VisibilityOutlined className="input__icon" style={{fontSize: 20}} onClick={() => setPasswordVisible((passwordVisible) => !passwordVisible)}/>)
							}
						</div>
						<div className="input__field">
							<label for="contact">Contact Number</label>
							<input id="contact" type="tel" placeholder="+91 99999 99999" minlength="10" reauired value={contact} onChange={(e) => setContact(e.target.value)} />
						</div>
					</div>
					<div className="form__split">
						<div className="input__field" style={{marginBottom: "1rem"}}>
							<label for="teamname"><h3>Add Members to Your Team</h3></label>
							<span className="info">Your team can consist of utmost three participants (including you). </span>
						</div>
						<div onClick={()=>setMem1(true)} className={`member ${mem1 ? 'active' : ''}`} data-text="Add a 2nd participant">
							<h3>Participant #2</h3>
								<div className="input__field">
									<label for="name2">Name</label>
									<input id="name2" type="text" placeholder="Jane Doe" required={mem1} value={name2} onChange={(e) => setName2(e.target.value)} />
								</div>
								<div className="input__field">
									<label for="email2">Email Address</label>
									<input id="email2" type="email" placeholder="janedoe@gmail.com" required={mem1} value={email2} onChange={(e) => setEmail2(e.target.value)} />
								</div>
							</div>
							<div onClick={()=>setMem2(true)} className={`member ${mem2 ? 'active' : ''}`} data-text="Add a 3rd participant">
								<h3>Participant #3</h3>
								<div className="input__field">
									<label for="name3">Name</label>
									<input id="name3" type="text" placeholder="Julien Doe" required={mem2} value={name3} onChange={(e) => setName3(e.target.value)} />
								</div>
							<div className="input__field">
									<label for="email3">Email Address</label>
									<input id="email3" type="email" placeholder="juliendoe@gmail.com" required={mem2} value={email3} onChange={(e) => setEmail3(e.target.value)} />
							</div>
						</div>
					</div>
				</div>
				<button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Create Team'}</button>
			</form>
		</div>)}
	</div>
	</div>
	);
}

export default Register;