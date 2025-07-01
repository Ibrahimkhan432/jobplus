import FilterCard from "@/components/FilterCard";
import Navbar from "@/components/global/Navbar";
import JobCard from "@/components/Jobcard";
import { useSelector } from "react-redux";


function Jobs() {
  const { allJobs } = useSelector((store: any) => store.job)
  // console.log("allJobs", allJobs);

  return (
    <div>
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="max-w-8xl mx-auto  sm:px-6 lg:px-8 mt-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="hidden lg:block lg:max-w-1/4 relative">
            {/* Fixed FilterCard */}
            <div className="">
              <FilterCard />
            </div>

            <div className="lg:hidden">
              <FilterCard />
            </div>
          </div>


          <div className="flex-1">
            {allJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-60 bg-white rounded-md shadow-md border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">
                  No Jobs Found
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allJobs.map((job: any) => (
                  <div key={job?._id} >
                    <JobCard job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Jobs;
