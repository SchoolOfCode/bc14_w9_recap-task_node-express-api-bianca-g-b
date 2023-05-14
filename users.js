import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "users.json";

// First step - write the helper functions


// Function to return all the users
export async function getUsers() {
    // Read
    const usersJSON = await fs.readFile(fileName, "utf-8");
    // Parse into JS array of objects
    const users = JSON.parse(usersJSON);
    // Return users array of objects
    return users;
}

export async function getUserByID(id) {
    // Read
    const usersJSON = await fs.readFile(fileName, "utf-8");
    // Parse into JS array of objects
    const users = JSON.parse(usersJSON);
    // define user variable and assign to null;
    let user = null;
    // Write a for loop to iterate through the array of object and determine
    // if the id parameter matches the user id; if it does set user variable 
    // to the user that matches the id
    for (let i=0; i<users.length; i++) {
        if (users[i].id === id) {
            user = users[i];
            break;
        }
    }
    // return user (either the matching id user or null if not matching)
    return user;
}

export async function createUser(newUser) {
    // Read
    const usersJSON = await fs.readFile(fileName, "utf-8");
    // Parse into JS array of objects
    const users = JSON.parse(usersJSON);
    // modify the newUser object  - set random ID, and have the other values be passed by the user
    newUser = {
        id: uuidv4(),
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        catchphrase: newUser.catchphrase
    }
    // push the newUser object to the users array of objects
    users.push(newUser);
    // stringify modified array of objects
    const strUsers = JSON.stringify(users);
    // write strUsers to users.json
    await fs.writeFile(fileName, strUsers);
    // return the newUser obj
    return newUser;
}

export async function updateUserByID(id, updatedUser) {
    // Read 
    const usersJSON = await fs.readFile(fileName, "utf-8");
    // Parse into JS array of objects
    const users = JSON.parse(usersJSON);
    // Set updatedUser to null
    updatedUser = null;
    /* Write for loop to iterate through the array of users
        - if a user id matches the id parameter:
            * update the user object with updatedUser paramater
            * keep the id and have the other values be passed by the user
        */
    for (let i=0; i<users.length; i++) {
        if (users[i].id===id) {
            updatedUser = {
                id: id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                catchphrase: newUser.catchphrase
            }
            users[i]=updatedUser;
            break;
        }
    }
    // Stringify updated users array of objects and write back to the users.json file
    await fs.writeFile(fileName, JSON.stringify(users))
    // return updatedUser object (or null, if id not matching)
    return updatedUser;
}

export async function deleteUserByID(id) {
    // Read
    const usersJSON = await fs.readFile(fileName);
    // Parse into JS array of objects
    const users = JSON.parse(usersJSON);
    // Set deleted user and matching id to null
    let deletedUser = null;
    let matchingIndex = null;
    /* Write for loop to determine if matching id is found
        - if so, set deleted user to matching id object
        - set matchingIndex to index found
    */
    for (let i=0; i<users.length; i++) {
        if (users[i].id === id) {
            deletedUser = users[i];
            matchingIndex = i;
            break;
        }
    }
    // Delete user with matching id
    users.splice(matchingIndex,1);
    // Return deleted user object (or null, if id not matching)
    return deletedUser;
}
