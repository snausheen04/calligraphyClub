import fetch from 'node-fetch';


//let newIdGood = { email: "tirrivees1820@outlook.com", password: "449OqspUq" };

console.log("--------");
fetch("http://localhost:3001/login", {
    method: 'post',
    body: JSON.stringify({ email: "tirrivees1820@outlook.com", password: "449OqspUq" }),
    headers: { 'Content-Type': 'application/json' },
})
.then(result => result.json())
.then(json => console.log(json));

//let newIdBadEmail = { email: "tirrivees@outlook.com", password: "449OqspUq" };
fetch("http://localhost:3001/login", {
    method: 'post',
    body: JSON.stringify({ email: "tirrivees@outlook.com", password: "449OqspUq" }),
    headers: { 'Content-Type': 'application/json' },
})
.then(result => result.json())
.then(json => console.log(json));

//let newIdBadPwd = { email: "tirrivees1820@outlook.com", password: "449Oqsp" };
fetch("http://localhost:3001/login", {
        method: 'post',
        body: JSON.stringify({ email: "tirrivees1820@outlook.com", password: "449Oqsp" }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(result => result.json())
    .then(json => console.log(json));

