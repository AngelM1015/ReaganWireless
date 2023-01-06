const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");


// app.use(favicon(pthe ath.join(__dirname, 'public/gi/img/favicon.ico'), { maxAge: oneDay }));
// app.use(ua.middleware(process.env.GA_TRACKING_ID, {cookieName: '_ga'}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const goog = require("./routes/google");
const supabase = require("./routes/supabase");
app.use("/api/google", goog);
app.use("/api/supabase", supabase);


app.use(express.static(path.join(__dirname, "./frontend/.output/public")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/.output/public/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;