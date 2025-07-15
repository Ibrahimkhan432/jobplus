import Navbar from "@/components/global/Navbar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import PostJobTable from "../../components/recruiter/PostJobTable";
import { setSearchJobByName } from "../../../redux/jobSlice";

function RecruiterDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobByName = useSelector((store: any) => store.job.searchJobByName);
  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 w-full">
            <Input
              value={searchJobByName}
              onChange={(e) => dispatch(setSearchJobByName(e.target.value))}
              type="text"
              placeholder="Search company by title"
              className="sm:w-1/2 w-3/4"
            />
          </div>
          <Button
            onClick={() => navigate("/recruiter/dashboard/create")}
            className="bg-primary text-white px-2 sm:px-4  py-2 rounded-lg hover:bg-primary/90 cursor-pointer ">
            Add  New Job
          </Button>
        </div>
        <PostJobTable />
      </div>
    </div>
  )
}

export default RecruiterDashboard
