import AppliedJobTable from "@/components/AppliedJobTable";
import Navbar from "@/components/global/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import React from "react";
import UpdateProfileDialog from "../../components/UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";
const isResume = true;
const isApplied = true;
function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((store: any) => store.auth);
  console.log("user", user);

  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto mt-10 sm:p-4 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user?.profile?.profilePhoto || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww"}
              alt="Profile Picture"
            />
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {user?.fullName}
            </h1>
            <p className="text-gray-600">{user?.profile?.bio}</p>
          </div>
        </div>

        <div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="border-gray-300 text-gray-700 cursor-pointer"
          >
            <Pen className="w-2 h-2 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="w-5 h-5 text-primary" />
          <span className="text-sm sm:text-base">{user?.email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Contact className="w-5 h-5 text-primary" />
          <span className="text-sm sm:text-base">{user?.phoneNumber}</span>
        </div>
        <div>
          <h1 className="font-semibold"> Skills</h1>
          {user?.profile?.skills && user.profile.skills.length > 0 ? (
            user.profile.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full mt-2"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="inline-block bg-gray-200 text-gray-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              No skills added
            </span>
          )}
        </div>
        <div>
          <h1 className="font-semibold">Resume</h1>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              className="text-blue-500 mt-2 cursor-pointer hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500 mt-2">No resume uploaded</span>
          )}
        </div>
      </div>
      {
        user && user.role === "student" && (
          <div className="max-w-4xl mx-auto mt-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-4">
            <h1 className="font-semibold">Applied Jobs</h1>
            {isApplied ? (
              <AppliedJobTable />
            ) : (
              <span className="text-gray-500 mt-2">No applied jobs</span>
            )}
          </div>
        )

      }

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
