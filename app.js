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
  res.status(404).json({
    success:success,
    payload: userByID
  })
})

// Write POST REQUEST for createUser function
app.post("/api/users", async (req, res) => {
  const addedUser = await createUser(req.body);
  // Id addedUser returns null, use 400 status Bad Request, and return object with success set to false and payload to a string giving information to the user
    if (addedUser===null) {
    return res.status(400).json({
      success: false,
      payload: "Incorrect request. Possibly insufficient information provided."
    })
  } 
  // If all the information required is provided in the body, return json object with success set to true and object returned by function
  return res.json({
    success: true,
    payload: addedUser
  })
})

// Write patch request for updateUserByID function
app.patch("/api/users/:id", async (req, res) => {
  const updatedUser = await updateUserByID(req.params.id, req.body)
  // console.log(req)
  return res.json({
    success: true,
    payload: updatedUser
  })
})

// Write delete request for deleteUserByID function
app.delete("/api/users/:id", async (req, res) => {
  const deletedUser = await deleteUserByID(req.params.id);
  // console.log(req);
  // console.log(deletedUser);
  return res.json({
    success: true,
    payload: deletedUser
  })
})