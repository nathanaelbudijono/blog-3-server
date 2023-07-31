const express = require("express");
const cors = require("cors");
const { connected } = require("./database/connect");
const { router } = require("./router/route");
const { postRouter } = require("./router/routerPost");
const { config } = require("dotenv");
const morgan = require("morgan");
// const config = require("dotenv");

const app = express();

const PORT = 8000;
app.use(morgan("tiny"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
config();
app.use(express.json());
app.use("/api", router);
app.use("/api", postRouter);

connected().then(() => {
  try {
    app.listen(PORT, () => {
      console.log("Server is online");
    });
  } catch (err) {
    console.log("Cant connect");
  }
});
