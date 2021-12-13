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
    console.log("{ Try getting member information  without logging in }");
    try {
        let res = await fetch(serverPrefix + "members");
        console.log(`Getting member information: ${res.statusText}`);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");

    console.log("{ Login as admin, then get members }");
    try {
        let res = await fetch(loginAdmin.url, loginAdmin.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);

        // User info from login
        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(serverPrefix + "members",
            { headers: { "cookie": savedCookie } });

        let data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");

    console.log("{ Login as customer, then try to get only logged member information }");
    try {
        let res = await fetch(loginCust.url, loginCust.options);
        console.log(`login results: ${res.statusText}`);
        // Look at the cookie
        let savedCookie = extractCookies(res.headers.raw()["set-cookie"]);
        console.log(`Saved cookie: ${savedCookie}`);

        let userInfo = await res.json();
        console.log(userInfo);
        res = await fetch(serverPrefix + "members",
            { headers: { "cookie": savedCookie } });

        let data = await res.json();
        console.log(data);
    } catch (e) {
        console.log(`Error: ${e}\n`);
    }
    console.log("\n");
}

someTests();