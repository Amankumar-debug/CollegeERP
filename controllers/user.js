const User=require("../models/user");
const Student=require("../models/student");


module.exports.loginhome=(req,res)=>{
    res.render("./user/loginhome");
}
module.exports.signupForm=(req,res)=>{
    res.render("./user/signup.ejs");
}



module.exports.signup=async(req,res)=>{
    try {
        let{username,email,registration_no,password,role}=req.body;
    // let user=await Student.findOne({registration_no:registration_no});
    // if(!user){
    //     req.flash("error","Wrong Registration No! Please enter correct Registration No")
    //     return res.redirect("/signup");
    // }
    let newUser=new User({email,username,registration_no,role});
    let registeredUser=await User.register(newUser,password);
    req.logIn(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Website!");
    res.redirect("/college");
    })
    } catch (err) {
        req.flash("error",err.message);
        res.redirect("/singup");
    }
    

}

module.exports.loginForm=(req,res)=>{
    res.render("./user/studentlogin.ejs");
}

module.exports.loginForm2=(req,res)=>{
    res.render("./user/collegelogin.ejs");
}

module.exports.login=async(req,res)=>{
    let{username}=req.body
    let user=await User.findOne({username:username});
    if(user.role=="Admin"){
        req.flash("success","Welcome back to Website");
    // let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect("/student/add");
    }else{
        res.redirect("/college");
    }
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next();
        }
        req.flash("success","you are logged out ")
        res.redirect("/");
    })
}