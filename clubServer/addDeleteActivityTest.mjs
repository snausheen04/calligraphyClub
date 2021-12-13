import express from 'express';
import fetch from 'node-fetch';
const serverPrefix = "http://localhost:3001/";


async function adddDelete() {
    //add activity
    let thing = { name: "Exihibitions 2", dates: "December 23, December 25" };
    let res = await fetch(serverPrefix + "activities");
    let activities = await res.json();
    console.log("---------------");
    console.log(`The club has  ( ${activities.length} ) activities currently posted`);
    res = await fetch(serverPrefix + "activities", {
        method: 'post',
        body: JSON.stringify(thing),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(`Posted new activity return code: ${res.status}`);

    res = await fetch(serverPrefix + "activities");
    activities = await res.json();
    console.log(`Now club has ( ${activities.length} ) activities posted`);

    //delete activity
    res = await fetch(serverPrefix + "activities/1", {
        method: "delete",
    });
    console.log(`Delete called returned value: ${res.status}`);

    res = await fetch(serverPrefix + "activities");
    activities = await res.json();
    console.log(`The club has ( ${activities.length} ) activities after deletion`);
    console.log("---------------");
}
adddDelete();