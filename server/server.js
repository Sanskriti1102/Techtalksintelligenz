const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.PORT;
const { EmailRoutes } = require("./route");

app.use(cors());

app.use("/email", EmailRoutes);

app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
