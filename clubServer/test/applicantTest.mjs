import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch';
//import { isTypedArray } from 'util/types';

const urlBase = "http://localhost:3001/";

describe('Applicant Testing for good aaplicant', function() {
    let res, validApplicant;
    before(async function() {
        res = await fetch(urlBase + 'applicant',{
            method: "post",
        body: JSON.stringify({name:"Daniel", email:"daniel-radcliffe@gmail.com",comments:"Good website"}),
        headers:{"Content-Type": "application/json"}
    });
     validApplicant = await res.json();
    });
    it('Applicant with good data is added', async function() {
        validApplicant = await fetch(urlBase + 'applicant');
        assert.equal(res.status, 201); 
    })
});

describe('Applicant Testing for TOO large JSON', function() {
    let res, badData;
    before(async function() {
        res = await fetch(urlBase + 'applicant', {
            method: "post",
            body: JSON.stringify({name:"Daniel", email:"daniel-radcliffe@gmail.com", 
            comments:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod Duis aute ie cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),
            headers:{"Content-Type": "application/json"}
        });
        badData = await res.json();
    });
    it('Applicant with Too large JSON is rejected', async function() {
        badData = await fetch(urlBase + 'applicant');
        assert.equal(badData.status, 404);
    })
});


describe('Applicant Testing for missing required fields', function() {
    let res, missingData;
    before(async function() {
        res = await fetch(urlBase + 'applicant', {
            method: "post",
            body: JSON.stringify({name:"Daniel", email:"daniel-radcliffe@gmail.com"}),
            headers:{"Content-Type": "application/json"}
        });
        missingData = await res.json();
    });
    it('Applicant with missing required fields is rejected', async function() {
        missingData = await fetch(urlBase + 'applicant');
        assert.equal(missingData.status, 404);
    })
});

describe('Applicant Testing for incorrect email', function() {
    let res, incorrectEmail;
    before(async function() {
        res = await fetch(urlBase + 'applicant', {
            method: "post",
            body: JSON.stringify({name:"Daniel", email:"dd@gmail.com", comments: "I have a fake email id"}),
            headers:{"Content-Type": "application/json"}
        });
        incorrectEmail = await res.json();
    });
    it('Applicant with incorrect email is rejected', async function() {
        incorrectEmail = await fetch(urlBase + 'applicant');
        assert.equal(incorrectEmail.status, 404);
    })
});
