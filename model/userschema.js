import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
});

const User = model("User", userSchema);

export default User;
