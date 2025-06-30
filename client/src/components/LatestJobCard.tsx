import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Bookmark, MapPin, Clock, DollarSign } from "lucide-react";

interface JobData {
    _id: string;
    title: string;
    company: { name: string } | null;
    location: string;
    salary: string;
    jobType: string;
    createdAt: string;
    description: string;
    position: number;
}

interface LatestJobCardProps {
    job: JobData;
}

const LatestJobCard: React.FC<LatestJobCardProps> = ({ job }) => {
    // console.log("job", job);
    return (
        <Card className="overflow-hidden border border-gray-200 rounded-xl transition-transform duration-300 transform hover:scale-[1.05] hover:shadow-lg">
            <CardHeader className="p-6 pb-4 flex flex-row items-start gap-4">
                <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            {job?.title || "Untitled Role"}
                        </h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                            <Bookmark className="w-5 h-5" />
                            <span className="sr-only">Bookmark</span>
                        </Button>
                    </div>
                    <p className="text-sm text-blue-600 font-medium">
                        {job?.company?.name || "Unnamed Company"}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="px-6 pt-0 pb-4 ">
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {job?.description || "No description provided."}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    {job?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{job.location}</span>
                        </div>
                    )}
                    {job?.salary && (
                        <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span>{job.salary}</span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="px-6 mt-8 pb-6 flex items-center justify-between">
                <div className="flex gap-2">
                    {job?.jobType && (
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border border-blue-200"
                        >
                            {job.jobType}
                        </Badge>
                    )}
                    {job?.position && (
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border border-blue-200"
                        >
                            {job.position}
                        </Badge>
                    )}
                </div>
                <Button size="sm" variant="outline" className="cursor-pointer text-blue-400 hover:bg-blue-100">
                    View Details
                </Button>
            </CardFooter>
        </Card>


    );
};

export default LatestJobCard;
