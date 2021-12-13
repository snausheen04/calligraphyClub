import bcrypt from 'bcryptjs';
import { readFile, writeFile } from 'fs/promises';
const users = JSON.parse(await readFile(new URL('./clubUsers3.json',
    import.meta.url)));

let nRounds = 12;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);

hashedUsers = users.map(function(user) {
    let regularPwd = user.password;
    let salt = bcrypt.genSaltSync(nRounds);
    let hashedPwd = bcrypt.hashSync(regularPwd, salt);
    user.password = hashedPwd;
    return user;
})

let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
writeFile("clubUsers3Hash.json", JSON.stringify(hashedUsers, null, 2));
