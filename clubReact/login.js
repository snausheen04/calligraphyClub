import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props); // Must call
        // Set up state here
    }
    render() {
        let myStyle = {backgroundColor:"lightcyan", borderRadius:"6px"}
        let form1 = <form>
				<label htmlFor="email"> Enter your Email </label>
				<input type="email" name="email" id="email" required/>
			<br></br>
				<label htmlFor="password">Password</label>
				<input type="Password" name="password" id="password" required/>
			<br></br>
				<input type="submit" name="Login" style={myStyle}/>
		</form>;
        return <div>
            <br></br>
            <br></br>
            <h2>Login</h2>
            {form1}
        </div>;
        }
}
export default Login