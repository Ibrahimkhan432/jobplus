import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function AppliedJobTable() {

  // get the api call here
  // const getall   = fetch();
  // dispatch(setALlaplicationdata(data))
  // show on the ui 
  const allAppliedJobs = useSelector((store: any) => store.job.allAppliedJobs);
  console.log("allapplied jobs", allAppliedJobs);

  return (
    <div>
      <Table className="w-full  border border-gray-200 rounded-2xl shadow-sm rounded-lg">
        <TableCaption>A list of jobs you have applied for</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
                        allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob:any) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob.job?.title}</TableCell>
                                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`${appliedJob?.status === "rejected" ? 'text-red-400' : appliedJob.status === 'pending' ? 'text-white' : 'text-white'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }




        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
