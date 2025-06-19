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
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            All Jobs
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No jobs found matching "{searchJobByName}"
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job: any) => (
                <TableRow key={job._id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company?.name || 'N/A'}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontalIcon className="cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-35 bg-white">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <div
                              onClick={() => navigate(`/admin/companies/${job._id}`)}
                              className="cursor-pointer text-primary hover:text-primary/80">
                              Edit
                            </div>
                            <div
                              onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                              className="cursor-pointer text-primary hover:text-primary/80">
                              Applicants
                            </div>
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
  )
}

export default AdminJobTable
