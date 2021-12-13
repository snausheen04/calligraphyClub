import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch';
//import { isTypedArray } from 'util/types';

const urlBase = "http://localhost:3001/";

describe('Get activity tests', function () {
    let res;
    let data;
    before(async function () {
        res = await fetch(urlBase + 'activities');
        data = await res.json();
    })
    console.log(res);
    console.log(data);
    it('Returns an array of activities', async function () {
        // let result = JSON.parse(data);
        assert.isArray(data);
    });
})
describe('Add Activity Tests', function () {
    let data, res;
    before(async function () {
        res = await fetch(urlBase + 'activities', {
            method: "post",
            headers: { "Content-Type": "application/json" },
        });
    });
    it('Adding activity without logging in', async function () {
        //let result = JSON.parse(data);
        assert.equal(res.status, 400);
    })
});


describe('Add Activity Tests', function () {
    let login, noLogin, addActivities, res;
    before(async function () {
        res = await fetch(urlBase + 'login', {
            method: "post",
            body: JSON.stringify({ email: "bibiri1807@yandex.com", password: "Hj4sS5sshQ" }),
            headers: { "Content-Type": "application/json" },
        });
        login = await res.json();
    });

    it('Login as a member and add activity', async function () {
        assert.equal(res.status, 200);
        assert.equal(login.role, 'member');
        addActivities = await fetch(urlBase + 'activities', {
            json: { name: "Exclusive art showcase", date: "Christmas of 2021" },
            responseType: 'json'
        });
        assert.equal(addActivities.status, 200);
    });
})

describe('Delete Activity Tests', function () {
    let delActivity, res, data;
    before(async function () {
        res = await fetch(urlBase + 'activities/:_id', {
            method: "delete",
            headers: { "Content-Type": "application/json" },
        });
        data = await res.json();
    });
    it('Try deletin activity without loggin in', async function () {
        delActivity = await fetch(urlBase + 'activities/:_id');
        assert.equal(delActivity.status, 404);
    })
})

//logged in as member and trying to delete an activity, which is not allowed to members
describe('Delete Activity Tests', function () {
    let res, login, delActivity;
    before(async function () {
        res = await fetch(urlBase + "login", {
            method: "post",
            body: JSON.stringify({ email: "bibiri1807@yandex.com", password: "Hj4sS5sshQ" }),
            headers: { "Content-Type": "application/json" },
        });
        login = await res.json();
    });
    it('Login as member and try to delete an activity', async function () {
        assert.equal(res.status, 200);
        assert.equal(login.role, 'member');
        delActivity = await fetch(urlBase + 'activities/:_id');
        assert.equal(delActivity.status, 404);
    });
});

describe('Delete Activity Tests', function () {
    let res, login, delActivity;
    before(async function () {
        res = await fetch(urlBase + "login", {
            method: "post",
            body: JSON.stringify({ email: "tirrivees1820@outlook.com", password: "449OqspUq" }),
            headers: { "Content-Type": "application/json" },
        });
        login = await res.json();
    });
    it('Login as admin and delete activity', async function () {
        assert.equal(res.status, 200);
        assert.equal(login.role, 'admin');
        delActivity = await fetch(urlBase + 'activities/:_id', {
            method: "delete",
            headers: { "Content-Type": "application/json" }
        });
        assert.equal(delActivity.status, 401);
    });
});


describe('Activity Tests for data', function () {
    let res, largeData, login;
    before(async function () {
        res = await fetch(urlBase + 'login', {
            method: "post",
            body: JSON.stringify({ email: "chihuahua1899@gmail.com", password: "9E3423Gj3iJ" }),
            headers: { "Content-Type": "application/json" },
        });
        login = await res.json();
    });
    it('Overly Large JSON data is rejected', async function () {
        assert.equal(res.status, 200);
        //assert.equal(login.role, 'admin');
        res = await fetch(urlBase + 'activities', {
            method: "post",
            body: JSON.stringify({ name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Duis aute irure dolor in dolor in reprehenderit in voluptate velit esse cillu ", 
            dates: "Christmas of 2021" }),
            headers: {"Content-Type": "application/json"},
        });
        largeData = await res.json();
        assert.equal(res.status, 400);
    })
});


describe('Activity Tests for missing required fields', function () {
    let res, missingFields, login;
    before(async function () {
        res = await fetch(urlBase + 'login', {
            method: "post",
            body: JSON.stringify({ email: "chihuahua1899@gmail.com", password: "9E3423Gj3iJ" }),
            headers: { "Content-Type": "application/json" },
        });
        login = await res.json();
    });
    it('Data with missing fields is rejected', async function () {
        assert.equal(res.status, 200);
       // assert.equal(login.role, '');
        res = await fetch(urlBase + 'activities', {
            method: "post",
            body: JSON.stringify({ name: "Exclusive art showcase" }),
            headers: {"Content-Type": "application/json"},
        });
        missingFields = await res.json();
        assert.equal(res.status, 400);
    })
});
