import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';


const Job = ({ job }: any) => {
  console.log("job", job);
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime: any) => {
    const createdAt = new Date(mongodbTime);
    const daysAgo = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    return daysAgo
  }

  return (
    <div className="p-6 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition duration-200">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {
            daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : daysAgoFunction(job?.createdAt) === 1
                ? "1 day ago"
                : `${daysAgoFunction(job?.createdAt)} days ago`
          }

        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.company?.logo || "https://via.placeholder.com/48"} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-gray-800 text-base">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 w-3/4">{job?.title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <Badge className="bg-blue-100 text-blue-700 font-medium">{job?.posioton}</Badge>
        <Badge className="bg-red-100 text-red-600 font-medium">{job?.jobType}</Badge>
        <Badge className="bg-purple-100 text-purple-700 font-medium">{job?.salary}</Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-sm font-medium cursor-pointer text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
        >
          View Details
        </Button>
        <Button className="bg-primary cursor-pointer text-white text-sm font-medium hover:opacity-90">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
