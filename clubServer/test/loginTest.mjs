import pkg from 'chai';
const { assert } = pkg;
import fetch from 'node-fetch';
//import getCookies from '/test/.getCookies.mjs';
// import urlBase from '../testURL.mjs';

const urlBase = "http://localhost:3001/";


function getCookies(res) {
  let rawStrings = res.headers.raw()["set-cookie"]
  let cookies = [];
  rawStrings.forEach(function (ck) {
      cookies.push(ck.split(";")[0]); // Just grabs cookie name=value part
  });
  return cookies.join(";"); // If more than one cookie join with ;
}

describe('Login Tests', function() {
    let res;
    let tours = null;
    let myCookie = null;

    before(async function() {
        console.log("Calling fetch");
        res = await fetch(urlBase + 'login');
        console.log("Back from fetch");
        myCookie = getCookies(res);
    })
    it('Cookie with appropriate name is returned', function() {
        assert.include(myCookie, 'BF2566');
    });
    describe('Login Sequence', function() {
        before(async function() {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "umbrate1989@yahoo.com",
                    "password": "1n3pLS47yH"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
        });
        it('Login Good', function() {
            assert.equal(res.status, 200);
        });
        it('User returned', async function() {
            let user = await res.json();
            //console.log(user);
            assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
        });
        it('Cookie session ID changed', function() {
            let cookie = getCookies(res);
            assert.notEmpty(cookie);
            assert.notEqual(cookie, myCookie);
            //console.log(cookie, myCookie);
        });
        it('Logout,cookie cleared',async function() {
            res = await fetch(urlBase + 'logout');
            console.log("Logout, cookie cleared");
        });
    });
    describe('Bad Logins', function() {
        it('Bad Email', async function() {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "Bstedhorses1903@yahoo.com",
                    "password": "nMQs)5Vi"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
        it('Bad Password', async function() {
            before(async function() {
                res = await fetch(urlBase + 'login', {
                    method: "post",
                    body: JSON.stringify({
                        "email": "biune1929@gmail.com",
                        "password": "BnMQs)5Vi"
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 401);
            });
        })
    })
})