"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import axiosInstance from "@/utils/axios"
import { CheckIcon, XIcon, MailIcon, PhoneIcon, FileTextIcon, CalendarIcon, UserIcon, DownloadIcon } from "lucide-react"

const ApplicantsTable = () => {
  const { applicants } = useSelector((store: any) => store.application)
  console.log("applicants", applicants)

  const statusHandler = async (status: string, id: string) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axiosInstance.post(`/application/status/${id}/update`, { status })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("error in job applicantTable")
      toast.error("Failed to update status")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!applicants?.applications || applicants.applications.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-lg">No applicants found</div>
        <p className="text-gray-400 text-sm mt-2">Applications will appear here once candidates apply</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Job Applicants</h2>
        <Badge variant="secondary" className="text-sm text-white">
          {applicants.applications.length} {applicants.applications.length === 1 ? "Applicant" : "Applicants"}
        </Badge>
      </div>

      <div className="grid gap-4">
        {applicants.applications.map((item: any) => (
          <div
            key={item._id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item?.applicant?.fullName || "N/A"}</h3>
                  {item.status && <Badge className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</Badge>}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Applied on</p>
                <p className="text-sm font-medium text-gray-700">{formatDate(item?.applicant?.createdAt)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600 text-sm">
                <MailIcon className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Email:</span>
                <a href={`mailto:${item?.applicant?.email}`} className="ml-1 text-blue-600 hover:underline">
                  {item?.applicant?.email || "N/A"}
                </a>
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <PhoneIcon className="h-4 w-4 mr-2 text-green-800" />
                <span className="font-medium">Phone:</span>
                <a href={`tel:${item?.applicant?.phoneNumber}`} className="ml-1 text-green-800 hover:underline">
                  {item?.applicant?.phoneNumber || "N/A"}
                </a>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-gray-600 text-sm">
                <FileTextIcon className="h-4 w-4 mr-2 text-purple-600" />
                <span className="font-medium">Resume:</span>
                {item.applicant?.profile?.resume ? (
                  <a
                    className="ml-1 text-purple-600 hover:underline flex items-center"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                    <DownloadIcon className="h-3 w-3 ml-1" />
                  </a>
                ) : (
                  <span className="ml-1 text-gray-400">Not provided</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center text-xs text-gray-500">
                <CalendarIcon className="h-3 w-3 mr-1" />
                Application ID: {item._id.slice(-8)}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => statusHandler("Accepted", item._id)}
                  className="bg-green-600 hover:bg-green-800 text-white cursor-pointer"
                  disabled={item.status === "Accepted"}
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Accept
                </Button>

                <Button
                  size="sm"
                  onClick={() => statusHandler("Rejected", item._id)}
                  className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  disabled={item.status === "Rejected"}
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApplicantsTable
