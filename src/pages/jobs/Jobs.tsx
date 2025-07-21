import FilterCard from "@/components/FilterCard";
import Navbar from "@/components/global/Navbar";
import JobCard from "@/components/Jobcard";
import { useState } from "react";
import { useSelector } from "react-redux";

function Jobs() {
  const { allJobs } = useSelector((store: any) => store.job);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const filteredJobs = allJobs?.filter((job: any) => {
    // If no filters, show all jobs
    if (!filters || Object.keys(filters).length === 0) return true;

    // Check each filter type
    const locationMatch = filters.Location
      ? job.location?.toLowerCase() === filters.Location.toLowerCase()
      : true;
    const industryMatch = filters.Industry
      ? job.industry?.toLowerCase() === filters.Industry.toLowerCase()
      : true;
    const salaryMatch = filters.Salary
      ? job.salary?.toLowerCase().includes(filters.Salary.toLowerCase())
      : true;
    const titleMatch = filters.title
      ? job.title?.toLowerCase().includes(filters.title.toLowerCase())
      : true;

    return locationMatch && industryMatch && salaryMatch && titleMatch;
  });

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
              <FilterCard
                onFilterChange={setFilters}
              />
            </div>

            <div className="lg:hidden">
              <FilterCard
                onFilterChange={setFilters}
              />
            </div>
          </div>

          <div className="flex-1">
            {filteredJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-60 bg-white rounded-md shadow-md border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">
                  No Jobs Found
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job: any) => (
                  <div key={job?._id}>
                    <JobCard job={job} searchTerm={filters.searchTerm || ""} />
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