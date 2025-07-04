import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    job:{type:mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
    applicant:{required:true,type:mongoose.Schema.Types.ObjectId,ref:"User"},
    status:{type:String,enum:["pending","accepted","rejected"],default:"pending"},
}, {timestamps:true});
const Application = mongoose.model("Application",applicationSchema);
export default Application;