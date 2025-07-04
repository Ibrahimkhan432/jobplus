import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, Clock, DollarSign } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

interface JobData {
    _id: string;
    title: string;
    company: { name: string, logo: string } | null;
    location: string;
    salary: string;
    jobType: string;
    createdAt: string;
    description: string;
    position: number;
    experience: string;
}

interface LatestJobCardProps {
    job: JobData;
}

const daysAgoFunction = (mongodbTime: any) => {
    const createdAt = new Date(mongodbTime);
    const daysAgo = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    return daysAgo
}

const LatestJobCard: React.FC<LatestJobCardProps> = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div className="p-6 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03]">
            {/* Top Row: Posted Time & Bookmark */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    {
                        job?.createdAt
                            ? (daysAgoFunction(job.createdAt) === 0
                                ? "Today"
                                : daysAgoFunction(job.createdAt) === 1
                                    ? "1 day ago"
                                    : `${daysAgoFunction(job.createdAt)} days ago`)
                            : ""
                    }
                </p>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Bookmark className="w-4 h-4" />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={job?.company?.logo || "https://via.placeholder.com/48"} />
                </Avatar>
                <div>
                    <h2 className="font-semibold text-gray-800 text-base">
                        {job?.company?.name || "Unnamed Company"}
                    </h2>
                    <p className="text-sm text-gray-500">{job?.location || "Unknown location"}</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800">{job?.title || "Untitled Role"}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {job?.description || "No description available."}
                </p>
            </div>

            {/* Tags / Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
                {job?.experience && (
                    <Badge className="text-white font-medium border-primary bg-white text-primary">
                        Experience {job.experience}
                    </Badge>
                )}
                {job?.position && (
                    <Badge className="text-white font-medium border-primary bg-white text-primary">
                        Position {job.position}
                    </Badge>
                )}
                {job?.jobType && (
                    <Badge className="text-white font-medium border-primary bg-white text-primary">
                        {job.jobType}
                    </Badge>
                )}
                {job?.salary && (
                    <Badge className="text-white font-medium border-primary bg-white text-primary">
                        {job.salary}
                    </Badge>
                )}
            </div>

            {/* Action Button */}
            <div className="flex items-center gap-3 mt-6 flex-wrap">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="bg-primary cursor-pointer text-white text-sm font-medium hover:opacity-90 w-full"
                >
                    View Details
                </Button>
            </div>
        </div>
    );
};

export default LatestJobCard;
