import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  users_first_name: {
    type: String,
    required: [true, "Please provide first name."],
  },
  users_last_name: {
    type: String,
    required: [true, "Please provide last name"],
  },
  users_email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  users_password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const Users = mongoose.models.users || mongoose.model("users", usersSchema);

export default Users;
