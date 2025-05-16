import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String},
  salary: { type: String, required: true },
  location: { type: String, required: true },
  requirement: { type: String, required: true },
  position: { type: Number, required: true },
  jobType: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  experience:{type:Number,required:false},
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications:{type:mongoose.Schema.Types.ObjectId,ref:"Application"}
}, { timestamps: true });
const Job = mongoose.model("Job", jobSchema);
export default Job;
