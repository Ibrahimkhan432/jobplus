"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../../redux/companySlice";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

const CreateCompany = ({ onSuccess }: { onSuccess: () => void }) => {
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter company name");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/company/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        onSuccess(); 
      }
    } catch (error) {
      console.error("Error creating company:", error);
      toast.error("Failed to create company");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter your company name"
          required
        />
      </div>

      <Button
        type="button"
        onClick={registerNewCompany}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white"
      >
        Create Company
      </Button>
    </div>
  );
};

export default CreateCompany;
