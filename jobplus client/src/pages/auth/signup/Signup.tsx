import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "../../../components/global/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoadnig } from "./../../../../redux/authSlice";
import { Loader } from "lucide-react";

export default function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
  });


  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setInput((input) => ({ ...input, file }));
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //password confirmation
    if (input.password !== input.confirmPassword) {
      setError("Password do not match");

      return;
    }

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("confirmPassword", input.confirmPassword);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    // if (input.file) {
    //   formData.append("file", input.file);
    // }
    console.log("Signup submitted:", formData);
    setError(null);
    try {
      dispatch(setLoadnig(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
        dispatch(setLoadnig(false));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Error during signup" + error);
      dispatch(setLoadnig(false));
    }
  };
  return (
    <div className="min-h-screen flex flex-col bgMain-gradient">
      <Navbar />
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="container max-w-lg mx-auto p-6">
          <Card className="border-gray-200 shadow-2xl rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Create an Account
              </CardTitle>
              <CardDescription>
                Join Job Plus to find your dream job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    className="border-1 border-gray-400"
                    type="text"
                    id="name"
                    name="fullName"
                    placeholder="full name"
                    value={input.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="border-1 border-gray-400"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={input.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className="border-1 border-gray-400"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={input.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    className="border-1 border-gray-400"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={input.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {error && <p className="text-red-600 text-sm">{error}</p>}

                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    className="border-1 border-gray-400"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+92123456789"
                    value={input.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">I am a</Label>
                  <RadioGroup className="flex item-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === "student"}
                        className="cursor-pointer md:w-[20px]"
                        onChange={handleChange}
                      />
                      <Label htmlFor="r1">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === "recruiter"}
                        className="cursor-pointer md:w-[20px]"
                        onChange={handleChange}
                      />
                      <Label htmlFor="r2">Recruiter</Label>
                    </div>
                  </RadioGroup>
                </div>
                {loading ? (
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white cursor-pointer">
                    <span className="mr-2">Loading...</span>
                    <Loader />
                  </Button>
                ) : (

                  <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                  >
                    Create Account
                  </Button>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
