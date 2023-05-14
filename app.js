import express from "express";
// Import helper functions from users.js
import { getUsers,
         getUserByID,
         createUser,
         updateUserByID,
         deleteUserByID } from "./users.js";    

const app = express();
const port = 3000;

app.use(express.json());

// app.use("/", (req, res, next) => {
//   return res.json({
//     status: true,
//     payload: "This route works!",
//   });
//   next();
// });

// Write get request for getUsers function
app.get("/api/users", async (req,res) => {
  const allUsers = await getUsers(); 
  return res.json({
    status: true,
    payload: allUsers
  });
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Write GET REQUEST for getUserByID function
app.get("/api/users/:id", async (req, res) => {
  const userByID = await getUserByID(req.params.id)
  // Set variable success to take value of boolen
  //  true if getUserByID function returns an object (not null)
  //  false if getUserByID function returns null
  const success = userByID !== null;

  // if success is true, return json object with success set to true and object returned by function
  if (success) {
  return res.json({
    success: success,
    payload: userByID
  })
} 
// if success is false, use 404 status Not found, and return object with success set to false and payload to value(null) returned by function
  return res.status(404).json({
    success:success,
    payload: userByID
  })
})

// Write POST REQUEST for createUser function
app.post("/api/users", async (req, res) => {
  const addedUser = await createUser(req.body);
  // set variable success to boolean value, true if addedUser returns an object, false if it returns null
  const success = addedUser !== null;
  
  // If all the information required is provided in the body, return json object with success set to true and object returned by function
  if (success) {
    return res.json({
      success: success,
      payload: addedUser
    })
  }

  // If addedUser returns null, use 400 status Bad Request, and return object with success set to false and payload to a string giving information to the user
    return res.status(400).json({
      success: success,
      payload: "Incorrect request. Possibly insufficient information provided."
    }) 
})

// Write PATCH REQUEST for updateUserByID function
app.patch("/api/users/:id", async (req, res) => {
  const updatedUser = await updateUserByID(req.params.id, req.body)
  // console.log(req)
  // Set variable success to boolean, true if updatesUser return an object and false if it returns null
  const success = updatedUser !== null;
  // If success is true, return object with success set to true and updated user object
  if (success) {
  return res.json({
    success: success,
    payload: updatedUser
  })
}
  // If success is false, use 404 status Not found and return obj with success value set to false, and null value for payload
  return res.status(404).json({
    success: success,
    payload: updatedUser
  })
})

// Write DELETE REQUEST for deleteUserByID function
app.delete("/api/users/:id", async (req, res) => {
  const deletedUser = await deleteUserByID(req.params.id);
  // console.log(req);
  // console.log(deletedUser);
  // Set variable success to boolean, true if deletedUser returns an object, false if it returns null
  const success = deletedUser !==null;
  // If success is true, respond with object containing success value set to true, and object deleted successfully
  if (success) {
  return res.json({
    success: true,
    payload: deletedUser
  })
}
// If success if false, use 404 status Not found and return object containing success value set to false, and payload set to null
  return res.status(404).json({
    success: success,
    payload: deletedUser
  })
})