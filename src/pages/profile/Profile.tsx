import AppliedJobTable from "@/components/AppliedJobTable";
import Navbar from "@/components/global/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";
import { toast } from "sonner";
import { setUser } from "../../../redux/authSlice";
import { Progress } from "@/components/ui/progress";
import axiosInstance from "@/utils/axios";

const isApplied = true;

function Profile() {
  useGetAppliedJobs();
  const { user } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills ? user.profile.skills.join(", ") : "",
    file: null as File | null,
    profilePhoto: user?.profile?.profilePhoto || ""
  });

  React.useEffect(() => {
    setForm({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills ? user.profile.skills.join(", ") : "",
      file: null,
      profilePhoto: user?.profile?.profilePhoto || ""
    });
  }, [user]);

  const profileFields = [
    user?.fullName,
    user?.email,
    user?.phoneNumber,
    user?.profile?.bio,
    user?.profile?.skills && user.profile.skills.length > 0,
    user?.profile?.resume,
    user?.profile?.profilePhoto,
  ];
  const filledFields = profileFields.filter(Boolean).length;
  const totalFields = profileFields.length;
  const completion = Math.round((filledFields / totalFields) * 100);
  const isProfileComplete = completion === 100;

  const photoInputRef = React.useRef<HTMLInputElement>(null);
  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({
        ...prev,
        profilePhoto: URL.createObjectURL(e.target.files![0]),
        file: e.target.files![0]
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setForm(prev => ({ ...prev, file: e.target.files![0] }));
  //   }
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedExtensions = ["pdf"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        toast.error("Only PDF files are allowed for resume upload.");
        return;
      }

      setForm(prev => ({ ...prev, file }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("bio", form.bio);
      formData.append("skills", form.skills);

      if (form.file) {
        if (form.file.type.startsWith('image/')) {
          formData.append("profilePhoto", form.file); // for photo
        } else {
          formData.append("file", form.file); // for resume
        }
      }

      const res = await axiosInstance.post(
        `/user/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("res in profile update", res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Something went wrong while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills ? user.profile.skills.join(", ") : "",
      file: null,
      profilePhoto: user?.profile?.profilePhoto || ""
    });
    setEditMode(false);
  };

  return (
    <div>
      <div className="bgMain-gradient">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto mt-10 p-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={form.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"}
                  alt="Profile Picture"
                />
              </Avatar>
              {editMode && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handlePhotoClick}
                >
                  <Pen className="text-white w-6 h-6" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={photoInputRef}
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-gray-900">
                {editMode ? (
                  <input
                    className="border-b-2 border-gray-300 focus:border-primary outline-none text-center sm:text-left bg-transparent w-full"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                ) : (
                  user?.fullName
                )}
              </h1>
              <p className="text-gray-600 mt-2">
                {editMode ? (
                  <input
                    className="border-b-2 border-gray-300 focus:border-primary outline-none text-center sm:text-left bg-transparent w-full"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Add a short bio"
                  />
                ) : (
                  user?.profile?.bio || "No bio added"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Profile Completion</h2>
            {!editMode ? (
              <Button
                size="sm"
                className="bg-primary text-white cursor-pointer"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-primary text-white cursor-pointer"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  className="text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer"
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-medium ${isProfileComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                {isProfileComplete ? 'Profile complete!' : `${completion}% complete`}
              </span>
              <span className="text-xs font-medium text-gray-700">{filledFields}/{totalFields} fields</span>
            </div>
            <div className={isProfileComplete ? 'bg-green-500 rounded-full' : 'bg-yellow-400 rounded-full'}>
              <Progress value={completion} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              {editMode ? (
                <input
                  className="border px-3 py-2 rounded w-full focus:ring-primary focus:border-primary"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900">{user?.email || "Not provided"}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              {editMode ? (
                <input
                  className="border px-3 py-2 rounded w-full focus:ring-primary focus:border-primary"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900">{user?.phoneNumber || "Not provided"}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Skills</label>
              {editMode ? (
                <input
                  className="border px-3 py-2 rounded w-full focus:ring-primary focus:border-primary"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="Comma separated skills"
                />
              ) : (
                <p className="text-gray-900">
                  {user?.profile?.skills && user.profile.skills.length > 0
                    ? user.profile.skills.join(", ")
                    : "No skills added"}
                </p>
              )}
            </div>

            {/* Resume */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Resume</label>
              {editMode ? (
                <input
                  type="file"
                  className="border px-3 py-2 rounded w-full focus:ring-primary focus:border-primary"
                  name="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              ) : (
                user?.profile?.resume ? (
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user?.profile?.resumeOriginalName || "View Resume"}
                  </a>
                ) : (
                  <p className="text-gray-500">No resume uploaded</p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        {user && user.role === "student" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Applied Jobs</h2>
            {isApplied ? (
              <AppliedJobTable />
            ) : (
              <p className="text-gray-500">No applied jobs</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;