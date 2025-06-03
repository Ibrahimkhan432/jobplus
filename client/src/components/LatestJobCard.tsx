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
        <Card className="overflow-hidden hover:shadow-md transition-shadow border-gray-100">
            <CardHeader className="p-6 flex flex-row items-start gap-4 pb-4">
                <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{job?.title}</h3>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500">
                            <Bookmark className="h-5 w-5" />
                            <span className="sr-only">Bookmark</span>
                        </Button>
                    </div>
                    <p className="text-blue-600 font-medium">{job?.company?.name || "Unnamed Company"}</p>
                </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 pb-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job?.description}</p>
                <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500">
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {job?.location}
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                        {job?.salary}
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-6 pt-2 flex items-center justify-between">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {job?.jobType}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {job?.position}
                </Badge>
                {/* <Link to={`/jobs/${job._id}`}> */}
                <Button size="sm">View Details</Button>
                {/* </Link> */}
            </CardFooter>
        </Card>
    );
};

export default LatestJobCard;
