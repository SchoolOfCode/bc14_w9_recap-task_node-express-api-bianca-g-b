const express = require("express");
const app = express();
const PORT = 3000;

const userRouter = require("./routes/users.js");

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
