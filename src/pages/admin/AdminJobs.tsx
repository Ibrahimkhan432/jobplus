import Navbar from "@/components/global/Navbar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { setSearchJobByName } from "../../../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminJobTable from "@/components/admin/AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { Input } from "@/components/ui/input";

function AdminJobs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useGetAllAdminJobs();
    const searchJobByName = useSelector((store: any) => store.job.searchJobByName);

    return (
        <div>
            <div className="bgMain-gradient">
                <Navbar />
            </div>
            <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1 max-w-sm">
                        <Input
                            value={searchJobByName}
                            onChange={(e) => dispatch(setSearchJobByName(e.target.value))}
                            type="text"
                            placeholder="Search jobs by title"
                            className="w-3/4"
                        />
                    </div>
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 cursor-pointer">
                        Create Job
                    </Button>
                </div>
                <AdminJobTable />
            </div>
        </div>
    )
}

export default AdminJobs
