import User from "../models/entity/users.js";
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    findUserById(userId, req, res, next);
  } else {
    return res.render("login.ejs");
  }
};

const findUserById = async (userId, req, res, next) => {
  try {
    const user = await User.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      req.user = undefined;
      return res.render("login.ejs");
    } else {
      req.user = user;
      req.userId = user.user_id;

      if (req.userId) {
        next();
      }
    }
  } catch (error) {
    req.user = undefined;
    return res.render("login.ejs");
  }
};

export const checkLogin = async (req, res, next) => {
  if (req.userId) {
    return res.redirect("/user/profile");
  }
  next();
};

export default authenticateToken;
