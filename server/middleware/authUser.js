const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { model } = require("../models/user");

const authUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!token) return res.status(401).json({ errorMessage: "Token not found" });

  const token = authorization.replace("Bearer", "");
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err)
      return res.status(401).json({ errorMessage: "You must be logged in" });

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;

    next();
  });
};

module.exports = authUser;
