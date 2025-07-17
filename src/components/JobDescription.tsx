"use client"
import { useNavigate, useParams } from "react-router-dom"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSingleJob } from "../../redux/jobSlice"
import { toast } from "sonner"
import axiosInstance from "@/utils/axios"
import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  BuildingIcon,
  FileTextIcon,
} from "lucide-react"

function JobDescription() {
  const navigate = useNavigate()
  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()
  const { user } = useSelector((store: any) => store.auth)
  const { singleJob } = useSelector((store: any) => store.job)

  const applications = singleJob?.applications
  // const isInitiallyApplied = applications?.some((a: any) => a.applicant?._id === user?._id) || false;
  const isInitiallyApplied = applications?.map((a: any) => a.applicant).includes(user?._id) || false;


  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const applyJobHandler = async () => {
    try {
      const res = await axiosInstance.post(`/application/apply/${jobId}`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success("Applied successfully")
      }
    } catch (error: any) {
      console.log("error in apply job", error)
      toast.error(error.response?.data?.message || "Failed to apply for job")
      navigate("/login")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatSalary = (salary: string) => {
    return salary ? `$${Number.parseInt(salary).toLocaleString()}` : "Not specified"
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axiosInstance.get(`/job/get/${jobId}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          res.data.job.applications.some(
            (application: any) =>
              (typeof application.applicant === "string" ? application.applicant : application.applicant?._id) ===
              user?._id,
          )
        }
      } catch (error) {
        console.log("error in get single job", error)
      }
    }
    fetchSingleJob()
  }, [dispatch, jobId, user?._id])

  if (!singleJob) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading job details...</div>
      </div>
    )
  }
  const formaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (formaRef.current) {
      formaRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [formaRef.current]);

  return (
    <div
      ref={formaRef}
      className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{singleJob?.title}</h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span className="text-lg">{singleJob?.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium text-white">
                  <ClockIcon className="h-4 w-4 mr-1 " />
                  {singleJob?.experience} years exp
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  {singleJob?.position} positions
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium  text-white">
                  <h1 className="h-4 w-4 mr-1">Rs </h1>
                  {formatSalary(singleJob?.salary)}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium cursor-pointer">
                  <BuildingIcon className="h-4 w-4 mr-1 " />
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <Button
                onClick={applyJobHandler}
                disabled={isApplied}
                size="lg"
                className={`px-8 py-3 text-lg font-semibold cursor-pointer text-white ${isApplied ? "bgMian-gradient hover:bg-green-600 cursor-not-allowed" : "bgMain-gradient hover:bg-blue-700"
                  }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Applied
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Applicants</p>
                <p className="text-2xl font-bold text-gray-900">{singleJob?.applications?.length || 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted Date</p>
                <p className="text-lg font-semibold text-gray-900">{formatDate(singleJob?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileTextIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
          </div>

          <div className="prose max-w-none">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About this role</h3>
              <p className="text-gray-600 leading-relaxed text-base">{singleJob?.description}</p>
            </div>

            {singleJob?.requirement && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Requirements</h3>
                <p className="text-gray-600 leading-relaxed text-base">{singleJob?.requirement}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Responsibilities</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Collaborate with designers to translate Figma mockups into working UI</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Write clean, maintainable, and efficient code using React and TailwindCSS</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ensure application responsiveness and performance across devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Participate in regular code reviews and agile team activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Good understanding of Git and deployment workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Apply Again Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to join our team?</h3>
          <p className="text-gray-600 mb-6">
            Take the next step in your career and apply for this exciting opportunity.
          </p>
          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            size="lg"
            className={`px-8 py-3 text-lg font-semibold text-white ${isApplied ? "bgMain-gradient hover:bg-green-600 cursor-not-allowed" : "bgMain-gradient hover:bg-blue-700"
              }`}
          >
            {isApplied ? (
              <>
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Application Submitted
              </>
            ) : (
              "Apply for this Position"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JobDescription
