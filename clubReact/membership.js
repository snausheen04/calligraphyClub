import React from "react";


class Membership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name:"", email:"", password:"", level:"", comments:"", dialogClass:""};
    }

    submitApplication() {
        this.setState({dialogClass:"showing"})
    }

    render() {
        let message = null;
        if (this.state.password.length < 8) {
            message = <p>Password too short, unconfirmed!</p>
        }
        else {
        message = <p>Welcome <strong>{this.state.name}</strong>, {""}
        your email is <strong>{this.state.email}</strong>, {""}
        your level is <strong>{this.state.level}</strong>, {""}
        and you had the following comments: <strong>{this.state.comments}</strong></p>
        }
        return <div>
            <br></br>
            <h2>apply now!</h2>
            <br></br>
            <label htmlFor="userName">Name :</label> <input type="text" name="userName" id="userName" 
                                                    placeholder="Enter name" required maxLength="20" value={this.state.name} onInput={(event)=> this.setState({name: event.target.value})}></input>

            <label htmlFor="userEmail">email :</label> <input type="email" name="userEmail" id="userEmail" 
                                                    placeholder="Enter email" required value={this.state.email} onInput={(event)=> this.setState({email: event.target.value})}></input>

            <label htmlFor="enterPassword">Password :</label> <input type="Password" name="enterPassword" id="enterPassword" 
                                                    placeholder="Enter Password" required minLength="8" maxLength="20" value={this.state.password} onInput={(event)=> this.setState({password: event.target.value})}></input>

            <label htmlFor="enterSkillLevel">Level :</label>
            <select name="enterSkillLevel" id="enterSkillLevel" value={this.state.level} onInput={(event)=> this.setState({level: event.target.value})}>
                <option value="">Please select an option</option>
                <option value="Beginner level 1">Beginner 1</option>
                <option value="Beginner level 2">Beginner 2</option>
                <option value="Intermediate level 1">Intermediate 1</option>
                <option value="Intermediate level 1">Intermediate 2</option>
                <option value="Expert">Expert</option>
            </select>
            <label htmlFor="enterComments">Comment :</label><textarea id="enterComments" cols="40" rows="5" 
                                                    placeholder="Want to say something nice" value={this.state.comments} onInput={(event)=> this.setState({comments: event.target.value})}></textarea>
            <button id="signUpButton" onClick={this.submitApplication.bind(this)} >Sign up!</button>


            <section id="thanksDialog2" className={this.state.dialogClass}>
                <div className="message">
                    <h3>Thanks for Signing up</h3>
                    {message}
                    <button id="closeButton" onClick={(event) => this.setState({dialogClass:" "})}>
                        Close
                    </button>
                </div>
            </section>
        </div>
    }
}

export default Membership