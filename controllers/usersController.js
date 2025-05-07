import {
  findUserByUsernameAndPassword,
  createUser,
  findUserByUsername,
  updatePasswordByUsername,
} from "../models/userModel.js";

// 登录
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  try {
    const user = await findUserByUsernameAndPassword(username, password);
    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 注册（只用用户名和密码）
export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  try {
    const user = await createUser(username, password);
    res.status(201).json({ message: "Registration successful", user });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 重置密码（通过用户名）
export const resetPassword = async (req, res) => {
  const { username, newPassword, confirmPassword } = req.body;
  if (!username || !newPassword || !confirmPassword)
    return res
      .status(400)
      .json({ message: "Username and two password inputs are required" });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await updatePasswordByUsername(username, newPassword);
    res.json({ message: "Password reset successful", updatedUser });
  } catch (err) {
    console.error("❌ Reset password error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
