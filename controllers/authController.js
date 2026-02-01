const jwt = require("jsonwebtoken");
const User = require("../models/User");

function makeToken(id) {
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
}

async function register(req, res) {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already used" });

  // ВАЖНО: роль лучше не принимать от клиента, но для демо можно:
  const user = await User.create({
    email,
    password,
    role: role === "admin" ? "admin" : "user",
  });

  const token = makeToken(user._id);

  res.status(201).json({
    message: "Registered",
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = makeToken(user._id);

  res.json({
    message: "Logged in",
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
}

module.exports = { register, login };