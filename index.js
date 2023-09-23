const express = require("express");
const cors = require("cors");
const users = require('./routes/user.routes');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to vinayak's application." });
});

const PORT = process.env.PORT || 3000;

app.use('/api/users', users);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});