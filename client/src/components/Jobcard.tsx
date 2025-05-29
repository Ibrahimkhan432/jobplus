import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Bookmark, MapPin, Clock, DollarSign } from "lucide-react"
import { Link } from "react-router-dom"

interface JobCardProps {
  id: string
  title: string
  company: string
  logo: string
  location: string
  salary: string
  type: string
  posted: string
  description: string
}

export default function JobCard({
  id,
  title,
  company,
  logo,
  location,
  salary,
  type,
  posted,
  description,
}: JobCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-gray-100">
      <CardHeader className="p-6 flex flex-row items-start gap-4 pb-4">
        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <img src={logo || "/placeholder.svg"} alt={company} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{title}</h3>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500">
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Bookmark</span>
            </Button>
          </div>
          <p className="text-blue-600 font-medium">{company}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 pb-4">
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            {location}
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
            {salary}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            {posted}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-2 flex items-center justify-between">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
          {type}
        </Badge>
        <Link to={`/jobs/${id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
