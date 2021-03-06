require("dotenv").config();
const asyncHandler = require("@joellesenne/express-async-handler");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const Email = require("../models/email");
const User = require("../models/user");

router.use(function (req, res, next) {
  res.locals.title = "Đăng nhập";
  next();
});

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.get("/signup", function (req, res) {
  res.locals.title = "Đăng kí tài khoản";
  res.render("auth/signup");
});

router.get("/changePassword", function (req, res) {
  res.locals.title = "Đổi mật khẩu";
  res.render("auth/changePassword");
});

router.get("/forgotEmailPassword/:id", function (req, res) {
  res.locals.title = "Quên mật khẩu";
  res.render("auth/forgotEmailPassword");
});

router.get("/forgotPassword", function (req, res) {
  res.locals.title = "Quên mật khẩu";
  res.render("auth/forgotPassword");
});

router.get("/logout", function (req, res) {
  delete req.session.userId;
  res.redirect("/");
});

router.post(
  "/login",
  asyncHandler(async function (req, res) {
    const { email, password } = req.body;
    
    
    const foundUser = await User.findByEmail(email);
    console.log('this is email ', foundUser);
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      req.session.userId = foundUser.id;
      res.redirect("/");
    } else {
      res.render("auth/login");
    }
  })
);

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom(async function (email) {
        const foundUser = await User.findByEmail(email);
        if (foundUser) {
          throw Error("User exists");
        }
        return true;
      }),
    body("displayName").trim().notEmpty(),
  ],
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/login", { errors: errors.array() });
    }
    const user = await User.create({
      displayName: req.body.displayName,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      token: crypto.randomBytes(3).toString("hex").toUpperCase(),
    });
    await Email.send(
      user.email,
      "Kích hoạt tài khoản",
      `Nhấn vào link: ${process.env.BASE_URL}/auth/activate/${user.id}/${user.token}`
    );
    res.redirect("/");
  })
);

router.get(
  "/activate/:id/:token",
  asyncHandler(async function (req, res) {
    const { id, token } = req.params;
    const user = await User.findById(id);
    if (user && user.token == token) {
      user.token = null;
      user.save();
      req.session.userId = user.id;
    }
    res.redirect("/");
  })
);

router.post(
  "/changePassword",
  asyncHandler(async function (req, res) {
    const { password, newpassword } = req.body;
    const user = await User.findById(req.session.userId);
    if (user && bcrypt.compareSync(password, user.password)) {
      user.password = bcrypt.hashSync(newpassword, 10);
      user.save();
    }
    res.redirect("/");
  })
);

router.post(
  "/forgotPassword",
  asyncHandler(async function (req, res) {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    if (user) {
      await Email.send(
        user.email,
        "Đổi mật khẩu",
        `${process.env.BASE_URL}/auth/forgotEmailPassword/${user.id}`
      );
      console.log(`Vui lòng kiểm tra email`);
    }
    res.redirect("/");
  })
);

router.post(
  "/forgotEmailPassword/:id",
  asyncHandler(async function (req, res) {
    const { id } = req.params;
    const { newpassword } = req.body;
    const user = await User.findById(id);
    if (user) {
      user.password = bcrypt.hashSync(newpassword, 10);
      user.save();
    }
    res.redirect("/");
  })
);

module.exports = router;
