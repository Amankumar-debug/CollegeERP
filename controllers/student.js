const { now } = require("mongoose");
const Student=require("../models/student.js");
const student = require("../models/student.js");
const Staff=require("../models/staff.js");

module.exports.addStudentForm=(req,res)=>{
    res.render("./college/student/newStudent.ejs")
}

module.exports.addStudent= async(req,res)=>{
    let{student}=req.body;
    let registration=student.registration_no;
    let student1=await Student.find({registration_no:registration});
  
    if(student1.length>0){
        req.flash("error","Alraedy have student with same Registration No!")
        return res.redirect("/student/add");
    }

    let newStudent=new Student(req.body.student);
    newStudent.default_fees=req.body.student.fees;

    let url=req.file.path;
    let filename=req.file.filename;
    newStudent.image={url,filename};
    newStudent.owner=req.user._id;


    let result= await newStudent.save();
    req.flash("success","Student Added successfully")
    res.redirect("/student/add")
}

module.exports.showAll= async(req,res)=>{
    let allStudent=await Student.find({}).populate("owner");
    
    res.render("./college/student/showAll",{allStudent})
}

module.exports.showOne=async (req,res)=>{
    let {id}=req.params;
    let student= await Student.findById(id);
    res.render("./college/student/showOne",{student})
}

module.exports.editForm=async(req,res)=>{
    let {id}=req.params;
    let student=await Student.findById(id);
    res.render("./college/student/edit.ejs",{student});
}

module.exports.editStudent=async(req,res)=>{
    let {id}=req.params;
    let student=await Student.findByIdAndUpdate(id,{...req.body.student});
    
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        student.image={url,filename};
        await student.save();
    }
  
    await student.save();
    req.flash("success","Student information updated");
    res.redirect("/student/showAll")
}

module.exports.search=async(req,res)=>{
    const { name, father_name, course,semester } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (father_name) query.father_name = { $regex: father_name, $options: "i" };
    if (course) query.course = { $regex: course, $options: "i" };
    // if (semester) query.semester = { $regex: semester, $options: "i" };
    if (semester) query.semester = Number(semester); // <-- fixed./

    const allStudent = await Student.find(query);
    if(allStudent.length>0){
        return  res.render("./college/student/showAll.ejs", { allStudent });
    }
    req.flash("error","No student Data Found!");
    res.redirect("/student/showAll");
}

module.exports.feesSearch=async(req,res)=>{
    res.render("./college/student/feesSearch.ejs");
}

module.exports.feesForm=async(req,res)=>{
 const { name, father_name, course,semester } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (father_name) query.father_name = { $regex: father_name, $options: "i" };
    if (course) query.course = { $regex: course, $options: "i" };
    // if (semester) query.semester = { $regex: semester, $options: "i" };
    if (semester) query.semester = Number(semester); // <-- fixed./
    
    const student = await Student.findOne(query);
    if(student){
        return  res.render("./college/student/feesForm.ejs", { student });
    }
    req.flash("error","No student Data Found!");
    res.redirect("/student/fees");
}

module.exports.submitFees=async(req,res)=>{
    let{addfees}=req.body;
    let {id}=req.params;
    let student=await Student.findById(id);
   
    student.fees=(student.fees-addfees);
    student.created_at=new Date();
    await student.save();
    addfees = Number(addfees);
    let totalfees=(2000+addfees);
    res.render("./college/student/feesRecipt.ejs",{student,addfees,totalfees})
}

module.exports.addfeesconferm=(req,res)=>{
    res.render("./college/student/addfeesconferm.ejs");
}
module.exports.addFees=async(req,res)=>{
     let allStudent=await Student.find({});
     for(let student of allStudent){
        student.semester=student.semester+1;
        student.fees=student.fees+student.default_fees;
        if(student.semester>6){
            await Student.findByIdAndDelete(student._id);
        } else {
      await student.save();
    }
     }

     res.redirect("/student/showAll")
}

module.exports.faculty=async(req,res)=>{
     let allStaff=await Staff.find();
     res.render("student/faculty",{allStaff});
}

module.exports.result=async(req,res)=>{
    res.render("student/result");
}

module.exports.destroyStudent=async(req,res)=>{
    let {id}=req.params;
    await Student.findByIdAndDelete(id)
    req.flash("success","Student Deleted successfully")
    res.redirect("/student/showAll")
}