// controllers/userController.js

import User from "../../models/entity/users.js";
import bcrypt from "bcrypt";

// Function to handle user login
export const loginUser = async (req, res) => {
  // Destructure email and password from the request body
  const { email, password } = req.body;
  // Array to store any errors that occur during login
  const errorsArr = [];
  try {
    // Check if user is already logged in
    if (req.session.userId) {
      // If user is already logged in, redirect to the profile page
      return res.redirect("/user/profile");
    }

    // Find the user with the provided email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // If user does not exist, show error message
    if (!user) {
      errorsArr.push("Invalid credentials.");
      return res.render("login.ejs", { errorsArr });
    }

    // Check if the password provided matches the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Set the userId in the session to indicate that the user is logged in
      req.session.userId = user.user_id;
      console.log("User logged in successfully");
      // Redirect to the user profile page after successful login
      return res.redirect("/user/profile");
    } else {
      // If password does not match, show error message
      errorsArr.push("Invalid credentials.");
      return res.render("login.ejs", { errorsArr });
    }
  } catch (error) {
    console.error(error);
    // If an error occurs, redirect to the login page
    return res.redirect("/user/login");
  }
};

// Function to handle user registration
export const createUser = async (req, res) => {
  // Array to store any errors that occur during registration
  const errorsArr = [];
  try {
    // Create a new user with the provided name, email, and hashed password
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      confirm_password: bcrypt.hashSync(req.body.confirm_password, 8),
    });

    // If user is successfully created, redirect to the login page
    if (user) {
      return res.redirect("/user/login");
    }
  } catch (error) {
    console.error(error);
    // If an error occurs, show error message and render the registration page again
    errorsArr.push("Something went wrong please try again");
    return res.render("register.ejs", { errorsArr });
  }
};
