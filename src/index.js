const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const hbs=require("hbs")
const collection = require("./mongodb")
const LogInCollection = require("./mongodb")

const templatePath = path.join(__dirname, '../templates')

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/", (req, res) => {
    res.render("login")
})

app.post("/signup", async (req, res)=>{
    try {
        const data = {
            name: req.body.name,
            password: req.body.password,
        };

        const newUser = await LogInCollection.create(data);
        console.log("Inserted document:", newUser);

        // Make sure the response is sent correctly
        res.render("home");

    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/login", async (req, res)=>{
    try {
        const check = await LogInCollection.findOne({name:req.body.name})

        if(check.password === req.body.password){
            res.render("home")
        }
        else{
            res.status(401).send("Invalid Credentials")
        }

    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Invalid credentials");
    }
})

app.get("/home", (req, res) => {
    res.render("home");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
