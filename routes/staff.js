require('dotenv').config()
const express=require("express");
const router=express.Router();
const staffController=require("../controllers/staff");
const ExpressError=require("../utils/ExpressError.js");
const asyncWrap = require("../utils/asyncWrap.js");
const{staffSchema}=require("../schema.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });
const {isLoggedIn}=require("../middleware.js");

const validateStaff=(req,res,next)=>{
     let{error}=staffSchema.validate(req.body);
     if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
     }else{
        next();
     }
}

router.get("/add",isLoggedIn,(staffController.newForm));
router.post("/add",isLoggedIn,validateStaff,
                   upload.single("staff[image]"),
                   asyncWrap(staffController.newStaff));

router.get("/showAll",isLoggedIn,asyncWrap(staffController.showAll));

router.get("/search",isLoggedIn,asyncWrap(staffController.search));   
router.get("/searchfaculty",isLoggedIn,asyncWrap(staffController.searchFaculty));   


router.get("/:id",isLoggedIn,asyncWrap(staffController.editForm));
router.put("/:id/edit",isLoggedIn,validateStaff,
                    upload.single("staff[image]"),
                    asyncWrap(staffController.editStaff));

                 

router.delete("/:id",isLoggedIn,asyncWrap(staffController.destroy));

module.exports=router;

