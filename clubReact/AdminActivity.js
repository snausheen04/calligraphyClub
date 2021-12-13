import React from "react";
import events from "./eventDataDump.json"

class AdminActivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activities: events, eventName: "", eventDate: "" };
    }
    eventNameHandler(event) {
        this.setState({eventName: event.target.value});
    }
    eventDateHandler(event) {
        this.setState({eventDate: event.target.value});
    }

    addActivity() {
        this.setState({activities:this.state.activities.concat({
            name: this.state.eventName,
            dates: [this.state.eventDate],
            })});
    }

    deleteActivity(i) {
        console.log("deleting i" + i);
        let newArray = this.state.activities.filter(function(act, index) {
            return (i !== index);
        })
        this.setState({activities:newArray}); 
      };
        
    render() {
        return (
            <>  
                <br></br>
                <br></br>
                <h1>Activity Management</h1>
                <h3>Add Activity</h3>
                <section className="ActivityTable">
                    <table className="ActivityForm">
                        <thead>
                            <tr>
                                <th></th><th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <label>Name</label>  </td><td>
                                    <input type="text" onChange={this.eventNameHandler.bind(this)} value={this.state.eventName}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Date(s)</label> </td><td>
                                    <input type="text" onChange={this.eventDateHandler.bind(this)} value={this.state.eventDate}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button onClick={this.addActivity.bind(this)}>Add</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <h2>Activities</h2>
                <table className="Activities">
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Date(s)</th>
                    </tr>
                    {this.state.activities.map((Activity, i) => (<tr key={"Activity" + i}>
                            <td>
                                <button onClick={this.deleteActivity.bind(this, i)}>Delete</button>
                            </td>
                            <td>{Activity.name}</td>
                            <td>{Activity.dates}</td>
                        </tr>
                    ))} 
                    </tbody>
                </table>
            </>
        );
    }
}


export default AdminActivities