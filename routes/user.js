const express=require("express");
const router=express.Router();
const User=require("../models/user.js")
const wrapAsync=require("../utils/asyncWrap.js");
const passport = require("passport");
// const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");

router.get("/",(userController.loginhome));

router.get("/signup",(userController.signupForm));
router.post("/signup",(userController.signup));

router.get("/student/login",(userController.loginForm));
router.get("/college/login",(userController.loginForm2));

router.post("/login",passport.authenticate("local",
    {failureRedirect:"/student/login",
        failureFlash:true
    }
    ),(userController.login));

router.get("/logout",(userController.logout));    

module.exports=router;