import React from "react";

class Menu extends React.Component{

    constructor(props){
        super(props);
        
    }

    render() {
        let newList = null;
        switch (this.props.role) {
            case "user" :
                newList = ["Home", "Activities", "Logout"];
                break;
            case "guest":
                newList = ["Home", "Login", "Membership", "Logout"];
                break;
            case "admin":
                newList = ["Home", "Activities", "Manage Activity", "Logout"];
                break;
            default :
                newList = ["Home", "Login", "Logout"];
                break;
        }
        return <div>
            <nav><ul>
            {newList.map((item, i) => <li key={"item" + i} className={item === this.props.show? "active":""} onClick={this.props.openPage.bind(null, item)}>{item}
            </li>)}
            </ul></nav>
            </div>;
    }
}

export default Menu;
