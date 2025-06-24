import { useDispatch, useSelector } from "react-redux";
import Navbar from "./global/Navbar";
import Job from "./Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "../../redux/jobSlice";
import { useEffect } from "react";


function Browser() {
  useGetAllJobs();

  const { allJobs } = useSelector((store: any) => store.job)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(""))
  }, [])

  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto my-10 mt-5">
        <h1 className="text-xl font-bold">Search Results {allJobs.length}</h1>
        <div className="grid lg:grid-cols-3 gap-4 mt-2">
          {allJobs && allJobs.length > 0 ? (
            allJobs.map((job: any) => (
              <Job key={job._id} job={job} />
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-20">
              <h2 className="text-2xl font-semibold text-gray-600">No jobs found.</h2>
              <p className="text-gray-400 mt-2">Try adjusting your search or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Browser;
