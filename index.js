import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./model/userschema.js";
import cors from "cors";
dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 4001;

const DB = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB conncted"))
    .catch((err) => console.error(err.message));
};
DB();

// Reegister User
app.post("/register", (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !lastName || !email || !phone) {
      throw Error("Please pass in all fields");
    }
    const finduser = User.findOne({ email });
    if (finduser) {
      throw Error("User with this email already exist 📩 😂");
    }
    const ivCode = "124FFRW";
    const newUser = new User({
      firstName,
      lastName,
      phone,
      email,
    });
    newUser.save();
    res.send(
      `Hello ${firstName}, Your Registration was successful and your invitation code is ${ivCode}`
    );
  } catch (error) {
    res.status(400).send(`Opps 🔴 ${error.message}`);
    console.error(`Something Went Wrong 🔴 ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`We're waiting for yourmessage @ ${port}`);
});
