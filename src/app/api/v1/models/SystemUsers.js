import mongoose from "mongoose";

const systemUsersSchema = new mongoose.Schema({
  system_first_name: {
    type: String,
    required: [true, "Please provide first name."],
  },
  system_last_name: {
    type: String,
    required: [true, "Please provide last name"],
  },
  system_email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  system_password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const SystemUsers =
  mongoose.models.system_users ||
  mongoose.model("system_users", systemUsersSchema);

export default SystemUsers;
