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

function AdminJobTable() {
  const navigate = useNavigate();
  useGetAllAdminJobs();
  const allAdminJobs = useSelector((store: any) => store.job.allAdminJobs);
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
                  <TableCell>{job.company?.name}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="cursor-pointer text-primary hover:text-primary/80">Edit</button>
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
