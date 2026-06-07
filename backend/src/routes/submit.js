
const express = require('express');
const submitRouter = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const rateLimiter = require("../middleware/rateLimit");
const {submitCode,runCode,getUserSubmissions} = require("../controllers/userSubmission");

// Allow max 5 submissions/runs per 10 seconds per IP
const submitLimiter = rateLimiter(5, 10000);

submitRouter.post("/submit/:id", userMiddleware, submitLimiter, submitCode);
submitRouter.post("/run/:id", userMiddleware, submitLimiter, runCode);
submitRouter.get("/userSubmissions", userMiddleware, getUserSubmissions);

module.exports = submitRouter;
