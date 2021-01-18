import './Register.css';
import {useState} from 'react';
import ReactPlayer from 'react-player';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CKLogo from '../assets/ck_logo.png';
import {db, auth} from '../firebase';
function Register() {
	
	const [mem1,setMem1] = useState(false);
	const [mem2, setMem2] = useState(false);
	
	const [teamname, setTeamname] = useState('');
	const [name1, setName1] = useState('');
	const [email1, setEmail1] = useState('');
	const [name2, setName2] = useState('');
	const [email2, setEmail2] = useState('');
	const [name3, setName3] = useState('');
	const [email3, setEmail3] = useState('');
	const [password, setPassword] = useState('');
	const [contact, setContact] = useState('');
	
	const handleSubmit = (e) => {
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email1, password).then(() => {
      		auth.currentUser.updateProfile({
              		displayName: teamname,
              		photoURL: `https://avatars.dicebear.com/4.5/api/gridy/${teamname}.svg`,
            	}).then(() => {
            		db.collection('users').doc(auth.currentUser.uid).set({
            			teamname: teamname,
            			name1: name1,
            			email1: email1,
            			name2: name2,
            			email2: email2,
            			name3: name3,
            			email3: email3,
            			contact: contact
            		})
            	}).then(() => alert('Done'));
          }).catch((error) => console.log(error))
	}
	
  return(
  <div className="register">
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
		<div className="register__right">
			<form onSubmit={(e) => handleSubmit(e)}>
				<h2>Register Your Team</h2>
				<div className="form__inner">
					<div className="form__split">
						<div className="input__field">
							<label for="teamname"><h3>Create a name for your team</h3></label>
							<span className="info"><InfoOutlinedIcon style={{fontSize: 16}}/> Team name should only contain alphabets, with no spaces and numbers. Be unique. Be creative.</span>
							<input id="teamname" placeholder="eg: spotihunters" required minlength="3" value={teamname} onChange={(e) => setTeamname(e.target.value)} />
						</div>
						<div className="input__field">
							<label for="name1">Your Name</label>
							<input id="name1" placeholder="John Doe" required value={name1} onChange={(e) => setName1(e.target.value)} />
						</div>
						<div className="input__field">
							<label for="email1">Your Email Address</label>
							<input id="email1" type="email" placeholder="johndoe@gmail.com" required value={email1} onChange={(e) => setEmail1(e.target.value)} />
							<span className="info bottom"><InfoOutlinedIcon style={{fontSize: 16}}/> Your team members will be able login to the contest only using this email or the team name itself.</span>
						</div>
						<div className="input__field">
							<label for="password">Pick a Password</label>
							<input id="password" type="password" placeholder="••••••••" required minlength="8" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
				<button type="submit">Create Team</button>
			</form>
		</div>
	</div>
	</div>
	);
}

export default Register;