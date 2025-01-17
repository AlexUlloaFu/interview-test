import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const PORT = 12345;
const app = express();

app.use(express.json());
app.use(cors());

// dummy bd
const users = [
  {
    username: "testUser",
    password: "password123",
    role: "admin",
  },
];

//dummy secret jwt key
const secretKey = "asdasdsd";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex == -1) return res.status(404).json({ message: "user not found" });
  if (password != "password123") return res.status(401).json({ message: "password incorrect" });
  if (users[userIndex].role != "admin")
    return res.status(401).json({ message: "user not authorized" });
  const token = jwt.sign({ username }, secretKey, { expiresIn: "10m" });
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log("server started on port : ", PORT);
});
