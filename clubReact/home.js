import React from "react";
import bayarea from "./images/bayarea.png";
import calligraphy from "./images/calligraphy.png";

class Home extends React.Component {
    constructor(props) {
        super(props); // Must call
        // Set up state here
    }
    render() {

    return <div>
    <img src={bayarea} />

    <img src={calligraphy} />;
    </div>
    }
}
export default Home
