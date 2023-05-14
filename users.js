import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "users.json";

// Write the helper functions


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
    
    // create variable createdUser, that contains and id and values passed by user
    const createdUser = {id: uuidv4(),...newUser}
    // If the user fills in all the required fields:
    if (Object.values(newUser).length === 4) {
        // add the new object to the array of objects
        users.push(createdUser);
        // stringify modified array of objects
        const strUsers = JSON.stringify(users);
        // write strUsers to users.json
        await fs.writeFile(fileName, strUsers);
        // return the newly created object
        return createdUser;
    // if the user doesn't provide all the required information, return null
    } else {
        return null;
    }
}

export async function updateUserByID(id, updatedUser) {
    // Read 
    const usersJSON = await fs.readFile(fileName, "utf-8");
    // Parse into JS array of objects
    const users = JSON.parse(usersJSON);  
    // Create variable updated, set to null
    let updated = null;
    /* Write for loop to iterate through the array of users
        - if a user id matches the id parameter:
            * update the user object with updatedUser paramater
            * keep the id and have the rest of the values either changed by the user, or if not, kept as they were before
        */
    for (let i=0; i<users.length; i++) {
        if (users[i].id===id) {
            const notUpdated = users[i];
            updated = {id:id,
                ...notUpdated,
                ...updatedUser}
            // Update object in users array to have the new updated values    
            users[i]=updated;

            // Stringify updated users array of objects and write back to the users.json file
            await fs.writeFile(fileName, JSON.stringify(users))
        }
    }
    // Return null if a matching id is not found
    return updated;
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
    // If a matching index is found
    if (matchingIndex!==null) {
    // Delete user with matching id
    users.splice(matchingIndex,1);
    // Stringify updated array of objects and write to JSON file
    await fs.writeFile(fileName, JSON.stringify(users));
    }

    // Return deleted user object (or null, if id not matching)
    return deletedUser;
}
