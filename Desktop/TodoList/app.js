const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

var items = ["Buy Food", "Eat Food", "Cook Food"];
var workitems = [];
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'))


app.get("/", function(req, res){

   let day = date.getDate();

    res.render("list", {ListTitle: day, Items: items});
});

app.post("/", function(req, res){
    var item = req.body.new;
if (req.body.list === "Work") {
  workitems.push(item)
  res.redirect("/work")
} else {
  items.push(item)
  res.redirect("/");
}
});

app.get("/work", function(req, res){
  res.render("list", {ListTitle: "Work List", Items: workitems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
