// index.js file
import React from "react";
import ReactDOM from "react-dom";
import events from "./eventDataDump.json"
import Menu from "./menu";
import Login from "./login";
import Home from "./home";
import Activities from "./activities";
import Membership from "./membership";
import AdminActivity from "./AdminActivity";


let myName = "Sana";


class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { role: "admin", show: "Manage Activity" }; 
        this.openPage = this.openPage.bind(this);
    }
    openPage(item, event) {
        this.setState({show: item})
    }
    render() {
        let content = null;
        switch (this.state.show) {
            case "Home": 
                content = <Home />;
                break;
            case "Activities":
                content = <Activities />;
                break;
            case "Login":
                content = <Login/>;
                break;
            case "Membership":
                content = <Membership/>;
                break;
            case "Manage Activity":
                content = <AdminActivity/>;
                break;
            default:
                content = <h2> <br></br>Oops! Something went wrong</h2>;
        }
        return (
            <>
                <Menu role={this.state.role} show={this.state.show} openPage = {this.openPage}/>
                {content}
            </>
        );
    }
}
            // Now rendering the App component!
            ReactDOM.render(<App />, document.getElementById("root"));
            




