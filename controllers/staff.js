const Staff=require("../models/staff.js");

module.exports.newForm=(req,res)=>{
    res.render("./college/staff/new.ejs");
}

module.exports.newStaff=async(req,res)=>{
    let newStaff=new Staff(req.body.staff);

    let url=req.file.path;
    let filename=req.file.filename;
    newStaff.image={url,filename};
    newStaff.owner=req.user._id;

    await newStaff.save();
    req.flash("success","Staff Added successfully");
    res.redirect("/staff/add");
}

module.exports.showAll=async(req,res)=>{
    let allStaff=await Staff.find().populate("owner");
    res.render("./college/staff/showAll.ejs",{allStaff});
}

module.exports.editForm=async(req,res)=>{
    let {id}=req.params;
    let staff=await Staff.findById(id);
    res.render("./college/staff/edit.ejs",{staff});
}

module.exports.editStaff=async(req,res)=>{
     let{id}=req.params;
    let staff= await Staff.findByIdAndUpdate(id,{...req.body.staff});

     if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        staff.image={url,filename};
        await staff.save();
    }
     
    await staff.save();
     req.flash("success","Staff Information updated successfully")
     res.redirect("/staff/showAll")
}

module.exports.search=async(req,res)=>{
    let {course} = req.query;
    let allStaff=await Staff.find({department:course});
    if(allStaff.length>0){
        return  res.render("./college/staff/showAll.ejs",{allStaff});
    }
    req.flash("error","No Staff  Found!");
    res.redirect("/staff/showAll");
}

module.exports.searchFaculty=async(req,res)=>{
    let {course} = req.query;
    let allStaff=await Staff.find({department:course});
    if(allStaff.length>0){
        return  res.render("./Student/faculty.ejs",{allStaff});
    }
    req.flash("error","No Staff  Found!");
    res.redirect("/student/faculty");
}

module.exports.destroy=async(req,res)=>{
    let{id}=req.params;
    await Staff.findByIdAndDelete(id);
    req.flash("error","Staff information Deleted successfully");
    res.redirect("/staff/showAll");
}