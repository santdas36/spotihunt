import './Register.css';
import {useState} from 'react';
import ReactPlayer from 'react-player';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CKLogo from '../assets/ck_logo.png';
function Register() {
	
	const [mem1,setMem1] = useState(false);
	const [mem2, setMem2] = useState(false);
	
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
				<img src={CKLogo} className="ck_logo" />
				Christ.Keng presents,
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
			<form>
				<h2>Register Your Team</h2>
				<div className="form__inner">
					<div className="form__split">
						<div className="input__field">
							<label for="teamname"><h3>Create a name for your team</h3></label>
							<span className="info"><InfoOutlinedIcon style={{fontSize: 16}}/> Team name should only contain alphabets, with no spaces and numbers. Be unique. Be creative.</span>
							<input id="teamname" placeholder="eg: spotihunters" required minlength="3"/>
						</div>
						<div className="input__field">
							<label for="name1">Your Name</label>
							<input id="name1" placeholder="John Doe" required />
						</div>
						<div className="input__field">
							<label for="email1">Your Email Address</label>
							<input id="email1" type="email" placeholder="johndoe@gmail.com" required/>
							<span className="info bottom"><InfoOutlinedIcon style={{fontSize: 16}}/> Your team members will be able login to the contest only using this email or the team name itself.</span>
						</div>
						<div className="input__field">
							<label for="password">Pick a Password</label>
							<input id="password" type="password" placeholder="••••••••" required minlength="8"/>
						</div>
						<div className="input__field">
							<label for="contact">Contact Number</label>
							<input id="contact" type="tel" placeholder="+91 99999 99999" minlength="10" reauired/>
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
									<input id="name2" type="text" placeholder="Jane Doe" required={mem1}/>
								</div>
								<div className="input__field">
									<label for="email2">Email Address</label>
									<input id="email2" type="email" placeholder="janedoe@gmail.com" required={mem1}/>
								</div>
							</div>
							<div onClick={()=>setMem2(true)} className={`member ${mem2 ? 'active' : ''}`} data-text="Add a 3rd participant">
								<h3>Participant #3</h3>
								<div className="input__field">
									<label for="name3">Name</label>
									<input id="name3" type="text" placeholder="Julien Doe" required={mem2}/>
								</div>
							<div className="input__field">
									<label for="email3">Email Address</label>
									<input id="email3" type="email" placeholder="juliendoe@gmail.com" required={mem2}/>
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