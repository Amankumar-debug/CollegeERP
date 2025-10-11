require('dotenv').config()
const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const asyncWrap = require("../utils/asyncWrap.js");
const studentController=require("../controllers/student");
const { studentSchema}=require("../schema.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });
const {isLoggedIn}=require("../middleware.js");

const validateStudent=(req,res,next)=>{
     let{error}=studentSchema.validate(req.body);
     if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
     }else{
        next();
     }
}

router.get("/add",isLoggedIn,(studentController.addStudentForm));
router.post("/add",isLoggedIn,validateStudent,
                  upload.single("student[image]"),
                  asyncWrap(studentController.addStudent));

router.get("/showAll",isLoggedIn,asyncWrap(studentController.showAll));
router.get("/showOne/:id",isLoggedIn,asyncWrap(studentController.showOne));

router.get("/:id/edit",isLoggedIn,asyncWrap(studentController.editForm));
router.put("/:id",isLoggedIn,validateStudent,
                  upload.single("student[image]"),
                  asyncWrap(studentController.editStudent))

router.get("/search",isLoggedIn,asyncWrap(studentController.search));

router.get("/fees",isLoggedIn,(studentController.feesSearch));
router.get("/feesForm",isLoggedIn,(studentController.feesForm));
router.post("/:id/submitFees",isLoggedIn,(studentController.submitFees));

router.get("/addfeesconferm",isLoggedIn,(studentController.addfeesconferm))
router.get("/addFees",isLoggedIn,asyncWrap(studentController.addFees));

router.get("/faculty",isLoggedIn,(studentController.faculty));
router.get("/result",isLoggedIn,(studentController.result));

router.delete("/:id",isLoggedIn,asyncWrap(studentController.destroyStudent));

module.exports=router;