import fetch from 'node-fetch';
import express from 'express';
import bcrypt from 'bcryptjs';
import { readFile } from 'fs/promises';
import session from 'express-session';
import Ajv from 'ajv';
import DataStore from 'nedb-promises';
const memberDB = DataStore.create("./memberDB");
const activityDB = DataStore.create("./activityDB");
//import addFormats from "ajv-Format";

// Read in Schemas
const activitySchema = JSON.parse(
    await readFile(new URL("./test/activitySchema.json", import.meta.url))
);
const applicantSchema = JSON.parse(
    await readFile(new URL("./test/applicantSchema.json", import.meta.url))
);

let ajv = new Ajv();
//addFormats(ajv);
let activityValidate = ajv.compile(activitySchema);
let applicantValidate = ajv.compile(applicantSchema);


const app = express();
//Json protection
//let jsonParser = express.json({ limit:'50mb' });
app.use(express.json({limit: '50mb'}));

function jsonError(err, req, res, next) {
    res.status(400).json({
        message: "too big",
        error: true
    });
    console.log("Json input over limit");
    return;
};


const cookieName = "BF2566";
app.use(session({
    secret: 'website development Sana',
    resave: false,
    saveUninitialized: false,
    name: cookieName
}));


// This initializes session state
function setUpSessionMiddleware(req, res, next) {
    console.log(`\nsession object: ${JSON.stringify(req.session)}`);
    console.log(`session id: ${req.session.id}`);
    if (!req.session.user) {
        req.session.user = { role: "guest" };
    };
    next();
};

app.use(setUpSessionMiddleware);

// Use this middleware to restrict paths to only logged in users
function checkCustomerMiddleware(req, res, next) {
    if (req.session.user.role === "guest") {
        res.status(401).json({ error: "Not permitted / member or guest" });;
    } else {
        console.log("here" + req.session.user.role);
        next();
    }
};


// Use this middleware to restrict paths only to admins
function checkAdminMiddleware(req, res, next) {
    if (req.session.user.role !== "admin") {
        res.status(401).json({ error: "Not permitted / not admin" });;
    } else {
        next();
    }
};


app.get('/info', function (req, res) {
    let myObj = {
        clubName: "Bay Area Calligraphy Club",
        ownerName: "Sana N",
        netId: "bf2566"
    };
    res.json(myObj);
});


app.get("/members", checkAdminMiddleware, async function (req, res) {
    let memberNames = await memberDB.find({}, {firstName: 1, lastName: 1});
    res.json(memberNames);
})

app.get("/activities", async function (req, res) {
    console.log("Activities are being displayed ");
    let activities = await activityDB.find({});
    res.json(activities);
});


app.post('/activities', async function (req, res) {

    console.log(`post to /activities received: ${JSON.stringify(req.body)}`);
    let activity = req.body;
    var validActivity = activityValidate(activity);
    if (!validActivity) {
        console.log(activityValidate.errors);
        res.status(400).json({ error: "bad data" });
        console.log("bad activity");
        return;
    }
    await activityDB.insert(activity);
    let activities = await activityDB.find({});
    res.status(201).json(activities);
});


app.delete('/activities/:id', checkAdminMiddleware, async function (req, res) {
    const { id } = req.params;
    await activitiesdb.remove({ _id: id });
    let activities = await activitiesdb.find({});
    res.json(activities);
});


app.post("/applicant", async function (req, res) {
    console.log(`Adding applicant received: ${JSON.stringify(req.body)}`);
    let applicant = req.body;
    var validApplicant = applicantValidate(applicant);
    if (!validApplicant) {
        console.log(applicantValidate.errors);
        res.status(400).json({ error: "bad data" });
        return;
    }
    res.status(201).json({ msg: "Processing.. please wait" });
});


// Available to all visitors, returns user info if successful
app.post('/login', express.json(), async function (req, res) {
    console.log(`path /login received: ${JSON.stringify(req.body)}`);
    let userEmail = req.body.email;
    let password = req.body.password;
    console.log("user email is here: " + userEmail);
    // Find user
    let userFound =await memberDB.findOne({email: userEmail});

    if (!userFound) { // Not found
        res.status(401).json({ error: true, message: "User/Password error before verified" });
        return;
    }
    let verified = bcrypt.compareSync(password, userFound.password);
    console.log(verified);
    if (verified) {
        console.log("----entered verified -----")
        let oldInfo = req.session.user;
        req.session.regenerate(function (err) {
            if (err) {
                console.log(err);
            }
            let newUserInfo = Object.assign(oldInfo, userFound);
            delete newUserInfo.password;
            req.session.user = newUserInfo;
            res.json(newUserInfo);
        });
    } else {
        res.status(401).json({ error: true, message: "User/Password error after trying to verify" });
    }
});


app.get('/logout', function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        res.clearCookie(cookieName, options); // the cookie name and options
        res.json({ message: "Goodbye" });
    })
});


app.listen(3001, function () {
    console.log(`clubServer.mjs app listening on 3001`);
});