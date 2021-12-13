import fetch from 'node-fetch';

const serverPrefix = "http://localhost:3001/";

async function testThem() {
    let res = await fetch (serverPrefix + "info");
    let info = await res.json();
    console.log("clubName: " + info.clubName);

    res = await fetch (serverPrefix + "activities");
    let activities = await res.json();
    console.log(`The club has ${activities.length} activities currently posted`);

    res = await fetch(serverPrefix + "members");
    let members = await res.json();
    console.log(`The club currently has ${members.length} members`);
}

testThem();