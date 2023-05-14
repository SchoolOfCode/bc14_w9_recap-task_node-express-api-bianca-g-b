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

// Write get request for getUserByID function
app.get("/api/users/:id", async (req, res) => {
  const userByID = await getUserByID(req.params.id)
  return res.json({
    success: true,
    payload: userByID
  })
})

// Write post request for createUser function
app.post("/api/users", async (req, res) => {
  const addedUser = await createUser(req.body);
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