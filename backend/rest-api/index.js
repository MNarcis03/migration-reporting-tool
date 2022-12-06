const express = require("express");
const { EnteringLog, ExitingLog } = require("./src/aspect/method.aspect.js");

const app = express();
const port = 3000;

const birdTweetsRouter = require("./src/routes/birdTweets.route");

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/birdTweets", birdTweetsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
