import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const jobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "/placeholder.svg?height=48&width=48",
    location: "San Francisco, CA",
    salary: "$120K - $150K",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "We're looking for an experienced Frontend Developer to join our team and help build amazing user experiences with React and Next.js.",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "DesignHub",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Remote",
    salary: "$90K - $110K",
    type: "Full-time",
    posted: "1 week ago",
    description:
      "Join our creative team to design beautiful and intuitive user interfaces for web and mobile applications.",
  },
  {
    id: "3",
    title: "Backend Engineer",
    company: "DataFlow Systems",
    logo: "/placeholder.svg?height=48&width=48",
    location: "New York, NY",
    salary: "$130K - $160K",
    type: "Full-time",
    posted: "3 days ago",
    description:
      "Help us build scalable backend systems using Node.js, Express, and MongoDB to power our growing platform.",
  },
  {
    id: "4",
    title: "Marketing Specialist",
    company: "GrowthGenius",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Chicago, IL",
    salary: "$70K - $90K",
    type: "Part-time",
    posted: "Just now",
    description: "Drive our digital marketing efforts including social media, content creation, and email campaigns.",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudNative",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Remote",
    salary: "$140K - $170K",
    type: "Contract",
    posted: "5 days ago",
    description: "Manage our cloud infrastructure, CI/CD pipelines, and help scale our systems to meet growing demand.",
  },
  {
    id: "6",
    title: "Product Manager",
    company: "InnovateTech",
    logo: "/placeholder.svg?height=48&width=48",
    location: "Austin, TX",
    salary: "$110K - $140K",
    type: "Full-time",
    posted: "1 day ago",
    description:
      "Lead product development initiatives, gather requirements, and work with cross-functional teams to deliver amazing products.",
  },
]

function LatestJobs() {
  return (
    <div>
 <section className="px-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
              <p className="text-blue-600 mt-2">Explore our latest job opportunities</p>
            </div>
            <Link to="/jobs">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-200">View All Jobs</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-blue-100"
              >
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center border border-blue-200">
                        <img
                          src={job.logo || "/placeholder.svg"}
                          alt={job.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{job.title}</h3>
                        <p className="text-blue-600 font-medium">{job.company}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 mb-4">
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location}
                    </div>
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {job.posted}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
                  <div className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                    {job.type}
                  </div>
                  <div className="text-blue-700 font-bold">{job.salary}</div>
                </div>
                <Link
                  to={`/jobs/${job.id}`}
                  className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-3 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default LatestJobs