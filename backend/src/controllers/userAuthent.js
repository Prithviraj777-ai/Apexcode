const redisClient = require("../config/redis");
const User =  require("../models/user")
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Submission = require("../models/submission")
const { ValidationError, AuthenticationError } = require("../core/customErrors");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 60 * 60 * 1000
};

const register = async (req, res, next) => {
    try {
      try {
        validate(req.body);
      } catch (validationErr) {
        throw new ValidationError(validationErr.message);
      }
      const { firstName, emailId, password } = req.body;

      const existingUser = await User.findOne({ emailId });
      if (existingUser) {
        throw new ValidationError("Email address is already in use.");
      }

      req.body.password = await bcrypt.hash(password, 10);
      req.body.role = 'user';
    
      const user = await User.create(req.body);
      const token = jwt.sign({ _id: user._id, emailId: emailId, role: 'user' }, process.env.JWT_KEY, { expiresIn: '1h' });
      
      const reply = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id,
        role: user.role,
      };
    
      res.cookie('token', token, COOKIE_OPTIONS);
      res.status(201).json({
        user: reply,
        message: "Logged in successfully"
      });
    } catch (err) {
      next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            throw new ValidationError("Email and password are required.");
        }

        const user = await User.findOne({ emailId });
        if (!user) {
            throw new AuthenticationError("Invalid email or password.");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new AuthenticationError("Invalid email or password.");
        }

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role,
        };

        const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '1h' });
        
        res.cookie('token', token, COOKIE_OPTIONS);
        res.status(200).json({
            user: reply,
            message: "Logged in successfully"
        });
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (token) {
            const payload = jwt.decode(token);
            if (payload && payload.exp) {
                await redisClient.set(`token:${token}`, 'Blocked');
                await redisClient.expireAt(`token:${token}`, payload.exp);
            }
        }

        res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0)
        });
        res.status(200).send("Logged out successfully");
    } catch (err) {
       next(err);
    }
}

const adminRegister = async (req, res, next) => {
    try {
      try {
        validate(req.body);
      } catch (validationErr) {
        throw new ValidationError(validationErr.message);
      }
      const { firstName, emailId, password } = req.body;

      const existingUser = await User.findOne({ emailId });
      if (existingUser) {
        throw new ValidationError("Email address is already in use.");
      }

      req.body.password = await bcrypt.hash(password, 10);
      req.body.role = 'admin';
    
      const user = await User.create(req.body);
      const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '1h' });
      
      res.cookie('token', token, COOKIE_OPTIONS);
      res.status(201).send("Admin registered successfully");
    } catch (err) {
        next(err);
    }
}

const deleteProfile = async (req, res, next) => {
    try {
      const userId = req.result._id;
      await User.findByIdAndDelete(userId);
      
      res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0)
        });
      res.status(200).send("Profile deleted successfully");
    } catch (err) {
      next(err);
    }
}

const checkAuthUser = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(200).json({ user: null });
        
        const payload = jwt.verify(token, process.env.JWT_KEY);
        if (!payload._id) return res.status(200).json({ user: null });
        
        const IsBlocked = await redisClient.exists(`token:${token}`);
        if (IsBlocked) return res.status(200).json({ user: null });
        
        const user = await User.findById(payload._id);
        if (!user) return res.status(200).json({ user: null });
        
        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role: user.role,
        };
        res.status(200).json({ user: reply, message: "Valid User" });
    } catch (err) {
        res.status(200).json({ user: null });
    }
};

module.exports = { register, login, logout, adminRegister, deleteProfile, checkAuthUser };