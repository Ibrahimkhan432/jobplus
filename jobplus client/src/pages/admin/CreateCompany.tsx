import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { setSingleCompany } from "../../../redux/companySlice";

const CreateCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }

        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
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
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error("Error creating company:", error);
            toast.error("Failed to create company");
        }
    };

    return (
        <div>
            <div className="bgMain-gradient">
                <Navbar />
            </div>
            <div className="max-w-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Company</h1>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                className="w-full"
                                placeholder="Enter company name"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="cursor-pointer"
                                onClick={() => navigate("/admin/companies")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="bg-primary text-white cursor-pointer"
                                onClick={registerNewCompany}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCompany; 