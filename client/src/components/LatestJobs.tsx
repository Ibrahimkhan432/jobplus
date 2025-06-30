import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useSelector } from "react-redux"
import LatestJobCard from "./LatestJobCard"

// const jobs = [
//   {
//     id: "1",
//     title: "Senior Frontend Developer",
//     company: "TechCorp Inc.",
//     logo: "/placeholder.svg?height=48&width=48",
//     location: "San Francisco, CA",
//     salary: "$120K - $150K",
//     type: "Full-time",
//     posted: "2 days ago",
//     description:
//       "We're looking for an experienced Frontend Developer to join our team and help build amazing user experiences with React and Next.js.",
//   },
//   {
//     id: "2",
//     title: "UX/UI Designer",
//     company: "DesignHub",
//     logo: "/placeholder.svg?height=48&width=48",
//     location: "Remote",
//     salary: "$90K - $110K",
//     type: "Full-time",
//     posted: "1 week ago",
//     description:
//       "Join our creative team to design beautiful and intuitive user interfaces for web and mobile applications.",
//   },
//   {
//     id: "3",
//     title: "Backend Engineer",
//     company: "DataFlow Systems",
//     logo: "/placeholder.svg?height=48&width=48",
//     location: "New York, NY",
//     salary: "$130K - $160K",
//     type: "Full-time",
//     posted: "3 days ago",
//     description:
//       "Help us build scalable backend systems using Node.js, Express, and MongoDB to power our growing platform.",
//   },
//   {
//     id: "4",
//     title: "Marketing Specialist",
//     company: "GrowthGenius",
//     logo: "/placeholder.svg?height=48&width=48",
//     location: "Chicago, IL",
//     salary: "$70K - $90K",
//     type: "Part-time",
//     posted: "Just now",
//     description: "Drive our digital marketing efforts including social media, content creation, and email campaigns.",
//   },
//   {
//     id: "5",
//     title: "DevOps Engineer",
//     company: "CloudNative",
//     logo: "/placeholder.svg?height=48&width=48",
//     location: "Remote",
//     salary: "$140K - $170K",
//     type: "Contract",
//     posted: "5 days ago",
//     description: "Manage our cloud infrastructure, CI/CD pipelines, and help scale our systems to meet growing demand.",
//   },
//   {
//     id: "6",
//     title: "Product Manager",
//     company: "InnovateTech",
//     logo: "/placeholder.svg?height=48&width=48",
//     location: "Austin, TX",
//     salary: "$110K - $140K",
//     type: "Full-time",
//     posted: "1 day ago",
//     description:
//       "Lead product development initiatives, gather requirements, and work with cross-functional teams to deliver amazing products.",
//   },
// ]
function LatestJobs({job}: any) {
  const { allJobs } = useSelector((store: any) => store.job)
  // console.log("alljob", allJobs);
  return (
    <div>
      <section className="px-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
              <p className="text-blue-600 mt-2">Explore our latest job opportunities</p>
            </div>
            <Link to="/jobs">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 cursor-pointer">View All Jobs</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-10">
            {allJobs.length <= 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-60 bg-white rounded-md shadow-md border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">
                  No Jobs Found
                </h1>
              </div>

            ) : (
              allJobs?.slice(0, 6).map((job: any) => (
                <LatestJobCard key={job._id} job={job} />
              ))
            )
            }
          </div>
        </div>
      </section>

    </div>
  )
}

export default LatestJobs