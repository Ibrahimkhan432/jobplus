import FilterCard from "@/components/FilterCard";
import Navbar from "@/components/global/Navbar";
import Job from "@/components/Job";
import { useSelector } from "react-redux";


function Jobs() {
  const { allJobs } = useSelector((store: any) => store.job)
  // console.log("allJobs", allJobs);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 mt-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="hidden lg:block lg:w-1/4 relative">
            {/* Placeholder to maintain space */}
            <div className="h-[300px]"></div>

            {/* Fixed FilterCard */}
            <div className="fixed top-[80px] w-[310px]">
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
                    <Job job={job} />
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
