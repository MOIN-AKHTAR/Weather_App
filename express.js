const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");
//Making our app as express;
const app = express();
//Setting view engine
app.set("view engine", "hbs");
const partial = path.join(__dirname, "/partials");
hbs.registerPartials(partial);
app.use(express.static(path.join(__dirname, "/public")));
app.get("", (req, res) => {
  res.render("index", {
    Name: "Moin Akhter Page"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    Profession: "I am a Software Engineer",
    Experience: "I have experience of few months"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    Work: "Just provide your city name and leave other on application:)"
  });
});
app.get("/weather", (request, respond) => {
  geocode(request.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return respond.send({
        error
      });
    } else {
      forecast({ latitude, longitude }, (err, res) => {
        if (err) {
          respond.send({
            err
          });
        } else {
          respond.send({
            location: request.query.address,
            res
          });
        }
      });
    }
  });
});
app.get("/*", (req, res) => {
  res.render("PageNotFound");
});
app.listen(3000, err => {
  if (err) return console.log("Unable to connect to server");
  console.log("Connected Successfully");
});
