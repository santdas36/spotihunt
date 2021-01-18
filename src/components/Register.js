import './Register.css';
import ReactPlayer from 'react-player';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function Register() {
  return(
  <div className="register">
	<div className="register__inner">
		<div className="register__left">
			<span>
				christ keng. presents,
				<h1>Spot-i-hunt</h1>
			</span>
			<span>
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
							<input id="teamname" />
						</div>
						<div className="input__field">
							<label for="name1">Your Name</label>
							<input id="name1" />
						</div>
						<div className="input__field">
							<label for="email1">Your Email Address</label>
							<input id="email1" type="email"/>
							<span className="info bottom"><InfoOutlinedIcon style={{fontSize: 16}}/> Your team members will be able login to the contest only using this email or the team name itself.</span>
						</div>
						<div className="input__field">
							<label for="password">Pick a Password</label>
							<input id="password" type="password"/>
						</div>
						<div className="input__field">
							<label for="contact">Contact Number</label>
							<input id="contact" type="tel"/>
						</div>
					</div>
					<div className="form__split">
						<div className="input__field" style={{marginBottom: "1rem"}}>
							<label for="teamname"><h3>Add Members to Your Team</h3></label>
							<span className="info">Your team can consist of utmost three participants (including you). </span>
						</div>
						<div className="member" data-text="Add a 2nd participant">
							<h3>Participant #2</h3>
								<div className="input__field">
									<label for="name2">Name</label>
									<input id="name2" type="text"/>
								</div>
								<div className="input__field">
									<label for="email2">Email Address</label>
									<input id="email2" type="email"/>
								</div>
							</div>
							<div className="member" data-text="Add a 3rd participant">
								<h3>Participant #3</h3>
								<div className="input__field">
									<label for="name3">Name</label>
									<input id="name3" type="text"/>
								</div>
							<div className="input__field">
									<label for="email3">Email Address</label>
									<input id="email3" type="email"/>
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