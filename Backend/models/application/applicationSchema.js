import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    job:{type:mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
    application:{required:true,type:mongoose.Schema.Types.ObjectId,ref:"User"},
    status:{type:String,enum:["pending","accepted","rejected"],default:"pending"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    status:{type:String,required:true},
    created_at:{type:Date,required:true},
    updated_at:{type:Date,required:true},
    resume:{type:String,required:true},
})
const Application = mongoose.model("Application",applicationSchema);
export default Application;