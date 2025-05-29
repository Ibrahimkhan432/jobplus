import FilterCard from "@/components/FilterCard";
import Navbar from "@/components/global/Navbar";
import Job from "@/components/Job";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Jobs() {
  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 mt-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-6">
      
          <div className="lg:w-1/4 w-full">
            <FilterCard />
          </div>

          <div className="flex-1">
            {jobArray.length <= 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-60 bg-white rounded-md shadow-md border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">
                  No Jobs Found
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobArray.map((item, index) => (
                  <Job key={index} />
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
