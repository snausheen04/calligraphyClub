/* Testing the POST /tours/add API */
import fetch from "node-fetch";
const serverPrefix = "http://localhost:3001/";

function extractCookies(rawStrings) {
    let cookies = [];
    rawStrings.forEach(function (ck) {
        cookies.push(ck.split(";")[0]); // Just grabs cookie name=value part
    });
    return cookies.join(";"); // If more than one cookie join with ;
}

let addActivity = {
    url: serverPrefix + "activities",
    options: {
        method: "POST",
        body: JSON.stringify({
            name: "Exclusive Expert's Workshop for Professionals",
            date: "Sometime in 2025",
        }),
        headers: { "Content-Type": "application/json" },
    },

};

let delActivity = {
    url: serverPrefix + "activities/1",
    options: {
        method: "delete",
        headers: { "Content-Type": "application/json" },
    }
};


let loginAdmin = {
    url: serverPrefix + "login",
    options: {
        method: "POST",
        body: JSON.stringify({
            // admin user, see users.json file
            email: "tirrivees1820@outlook.com",
            password: "449OqspUq",
        }),
        headers: { "Content-Type": "application/json" },
    },
};

let loginCust = {
    url: serverPrefix + "login",
    options: {
        method: "POST",
        body: JSON.stringify({
            // admin user, see users.json file
            email: "chihuahua1899@gmail.com",
            password: "9E3423Gj3iJ",
        }),
        headers: { "Content-Type": "application/json" },
    },
};

async function someTests() {
    //Adding activity without loggin in
    console.log(" { Try adding new activity  without logging in }");
    try {
        let res = await fetch(addActivity.url, addActivity.options);
        console.log(`Add actiivity outcome: ${res.statusText}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");

    //Deleting activity without loggin in
    console.log("{ Try deleting new activity  without logging in }");
    try {
        let res = await fetch(delActivity.url, delActivity.options);
        console.log(`Delete actiivity outcome: ${res.statusText}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");

    //Login as admin and adding new activity
    console.log("{ Login as admin, then add activity }");
    try {
        let res = await fetch(loginAdmin.url, loginAdmin.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        addActivity.options.headers.cookie = savedCookie;
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(addActivity.url, addActivity.options);
        let data = await res.json();
        console.log(`Add activity outcome for admin: ${res.status}`);

    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");

    //Login as admin and delete activity
    console.log("{ Login as admin, then delete activity }");
    try {
        let res = await fetch(loginAdmin.url, loginAdmin.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        delActivity.options.headers.cookie = savedCookie;
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(delActivity.url, delActivity.options);
        let data = await res.json();
        console.log(`Delete activity outcome for admin: ${res.status}`);

    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");

    //Login as customer and try to add activity
    console.log("{ Login as customer, then try to add new activity }");
    try {
        let res = await fetch(loginCust.url, loginCust.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        addActivity.options.headers.cookie = savedCookie;
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(addActivity.url, addActivity.options);
        let data = await res.json();
        console.log(data);
        console.log(`Add activity outcome for non-admin : ${res.status}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");

    //Login as customer and try to delete an activity
    console.log("{ Login as customer, then try to delete an activity }");
    try {
        let res = await fetch(loginCust.url, loginCust.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);
        delActivity.options.headers.cookie = savedCookie;
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(delActivity.url, delActivity.options);
        let data = await res.json();
        console.log(data);
        console.log(`Delete activity outcome for non-admin : ${res.status}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");
}
someTests();