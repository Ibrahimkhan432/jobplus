import { Table, TableCaption } from "@/components/ui/table"
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontalIcon } from "lucide-react";

function AdminJobTable() {
  const navigate = useNavigate();
  useGetAllAdminJobs();
  const allAdminJobs = useSelector((store: any) => store.job.allAdminJobs);
  console.log(allAdminJobs);

  const searchJobByName = useSelector((store: any) => store.job.searchJobByName);
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);

  useEffect(() => {
    if (searchJobByName) {
      const filtered = allAdminJobs.filter((job: any) =>
        job.title.toLowerCase().includes(searchJobByName.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(searchJobByName.toLowerCase()) ||
        job.location.toLowerCase().includes(searchJobByName.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allAdminJobs);
    }
  }, [searchJobByName, allAdminJobs]);

  if (!allAdminJobs || allAdminJobs.length === 0) {
    return <div className="text-center py-4">No jobs found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <Table className="w-full text-sm">
          <TableCaption className="text-sm text-gray-500 py-2">All Jobs</TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-gray-700">Job Title</TableHead>
              <TableHead className="text-gray-700">Company</TableHead>
              <TableHead className="text-gray-700">Location</TableHead>
              <TableHead className="text-gray-700">Type</TableHead>
              <TableHead className="text-gray-700 pr-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No jobs found matching <span className="font-semibold">"{searchJobByName}"</span>
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job: any) => (
                <TableRow
                  key={job._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-gray-900">{job.title}</TableCell>
                  <TableCell className="text-gray-700">
                    {job.company?.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600">{job.location}</TableCell>
                  <TableCell className="text-gray-600">{job.jobType}</TableCell>
                  <TableCell className="text-right pr-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <MoreHorizontalIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        className="w-40 p-2 bg-white border border-gray-200 rounded-md shadow-md"
                      >
                        <div className="flex flex-col gap-2">
                          <div
                            onClick={() => navigate(`/admin/companies/${job._id}`)}
                            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            Edit
                          </div>
                          <div
                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            Applicants
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminJobTable
