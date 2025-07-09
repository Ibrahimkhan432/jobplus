// extra dialog

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { setUser } from "../../redux/authSlice";
// import { USER_API_END_POINT } from "@/utils/constant";

// interface UpdateProfileDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

// const UpdateProfileDialog = ({ open, setOpen }: UpdateProfileDialogProps) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store: any) => store.auth);
//   const [input, setInput] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//     skills: user?.profile?.skills?.map((skill: any) => skill) || "",
//     file: user?.profile?.resume || "",
//   });

//   const dispatch = useDispatch();

//   const changeEventHandler = (e: any) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e: any) => {
//     setInput({ ...input, file: e.target.files[0] });
//   };

//   const submitHandler = async (e: any) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName", input.fullName);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);
//     // if (input.file) {
//     //   formData.append("file", input.file);
//     // }
//     if (input.file && input.file instanceof File) {
//       formData.append("file", input.file);
//     }
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${USER_API_END_POINT}/profile/update`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log("res", res);

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success(res.data.message);
//         setLoading(false);
//         setOpen(false);
//       }
//     } catch (error: any) {
//       console.log(error);
//       toast.error("Something went wrong while updating profile");
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//     setOpen(false);
//     console.log("updated data", input);
//   };
//   return (
//     <div>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent
//           className="sm:max-w-[425px] bg-white"
//           onInteractOutside={() => setOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Update Profile</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={submitHandler}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">
//                   Name
//                 </Label>
//                 <Input
//                   id="name"
//                   name="FullName"
//                   type="text"
//                   value={input.fullName}
//                   onChange={(e) =>
//                     changeEventHandler({
//                       ...e,
//                       target: { ...e.target, name: "fullName" },
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={input.email}
//                   onChange={(e) =>
//                     changeEventHandler({
//                       ...e,
//                       target: { ...e.target, name: "email" },
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="number" className="text-right">
//                   Number
//                 </Label>
//                 <Input
//                   id="number"
//                   name="phoneNumber"
//                   value={input.phoneNumber}
//                   onChange={(e) =>
//                     changeEventHandler({
//                       ...e,
//                       target: { ...e.target, name: "phoneNumber" },
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="bio" className="text-right">
//                   Bio
//                 </Label>
//                 <Input
//                   id="bio"
//                   name="bio"
//                   value={input.bio}
//                   onChange={(e) =>
//                     changeEventHandler({
//                       ...e,
//                       target: { ...e.target, name: "bio" },
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="skills" className="text-right">
//                   Skills
//                 </Label>
//                 <Input
//                   id="skills"
//                   name="skills"
//                   value={input.skills}
//                   onChange={(e) =>
//                     changeEventHandler({
//                       ...e,
//                       target: { ...e.target, name: "skills" },
//                     })
//                   }
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="file" className="text-right">
//                   Resume
//                 </Label>
//                 <Input
//                   id="resume"
//                   name="file"
//                   type="file"
//                   onChange={fileChangeHandler}
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4 text-white">
//                   {" "}
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   className="w-full my-4 text-white cursor-pointer"
//                 >
//                   Update
//                 </Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateProfileDialog;
