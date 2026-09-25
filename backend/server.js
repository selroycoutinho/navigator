const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillsRoute");
const careerRoutes = require("./routes/careerRoutes");
const quizRoutes = require("./routes/quizRoute");
const githubRoutes = require("./routes/githubRoutes");
const skillVerificationRoutes = require("./routes/skillVerificationRoutes");
const streakRoutes = require("./routes/streakRoute");
const resumeRoutes = require("./routes/resumeRoute");

const app = express();

app.use(cors());
app.use(express.json());

console.log("ROUTE TYPES:");
console.log("authRoutes:", typeof authRoutes);
console.log("profileRoutes:", typeof profileRoutes);
console.log("skillRoutes:", typeof skillRoutes);
console.log("careerRoutes:", typeof careerRoutes);
console.log("quizRoutes:", typeof quizRoutes);
console.log("githubRoutes:", typeof githubRoutes);
console.log("streakRoutes:", typeof streakRoutes);
console.log("resumeRoutes:", typeof resumeRoutes);
console.log("skillVerificationRoutes:", typeof skillVerificationRoutes);

console.log("REGISTERING AUTH");
app.use("/api/auth", authRoutes);

console.log("REGISTERING PROFILE");
app.use("/api/profile", profileRoutes);

console.log("REGISTERING SKILLS");
app.use("/api/skills", skillRoutes);

console.log("REGISTERING CAREERS");
app.use("/api/careers", careerRoutes);

console.log("REGISTERING QUIZ");
app.use("/api/quiz", quizRoutes);

console.log("REGISTERING GITHUB");
app.use("/api/github", githubRoutes);

console.log("REGISTERING STREAK");
app.use("/api/streak", streakRoutes);

console.log("REGISTERING RESUME");
app.use("/api/resume", resumeRoutes);

console.log("REGISTERING SKILL VERIFICATION");
app.use("/api/skill-verification", skillVerificationRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Career Navigator backend is running"
    });
});

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/test", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed a protected route",
        user_id: req.user.user_id
    });
});

if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;