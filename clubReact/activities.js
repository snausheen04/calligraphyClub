import React from "react";


class Activities extends React.Component {
    constructor(props) {
        super(props); 
        this.state= {activities: []};

}

componentDidMount() {
    let that = this;
    fetch('/activities').then(function(res) {
        if(res.ok) {
            return res.json();
        }
        else {
            console.log("trouble getting activities");
            return new Promise.reject(res.statusText);
        }
    })
    .then(function(activities) {
        that.setState({activities: activities});
    })
}
    render() {
    //creating table rows with array map method
    let tableRows = this.state.activities.map(function(event, i){
        return <tr key={i}><td>{event.name}</td>
                    <td>{event.dates}</td></tr>
        })
        let myTable = <table>
            <caption>Activity Schedule</caption>
            <thead>
                <tr><th>Name</th><th>Date(s)</th></tr>
            </thead>
            <tbody id="ActTable">
                {tableRows}
            </tbody>
        </table>;
    return <div>
            <br></br>
            <br></br>
            <br></br>
            {myTable}
        </div>;
    }
}

export default Activities