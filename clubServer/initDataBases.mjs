// Create a NeDB datastore for users with hashed passwords

import DataStore from "nedb-promises";
const db = DataStore.create("./memberDB");
const db1 = DataStore.create("./activityDB");
import { readFile } from "fs/promises";

// Get sample data from JSON file
const members = JSON.parse(
  await readFile(new URL("./clubUsers3Hash.json", import.meta.url))
);

const activites = JSON.parse(
    await readFile(new URL("./eventDataDump.json", import.meta.url))
);

async function setupMemberDB() {
  let numRemoved = await db.remove({}, { multi: true });
  console.log("clearing database, removed " + numRemoved);

  // We let NeDB create _id property for members
  let newDocs = await db.insert(members);
  console.log("Added " + newDocs.length + " users");


  //we let NeDB create _id property for activities
  let activityRemoved = await db1.remove({}, {multi: true});
  console.log("clearing databse, removed " + activityRemoved);

  let activDocs = await db1.insert(activites);
  console.log("Added " + activDocs.length + " activities");
}

setupMemberDB();
