import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { setSingleCompany } from "../../../redux/companySlice";
import axiosInstance from "@/utils/axios";

const CompanySetup = () => {
    const params = useParams();
    const { loading } = useGetCompanyById(params.id || "");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const company = useSelector((store: any) => store.company.singleCompany);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null as File | null,
    });

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || "",
                description: company.description || "",
                website: company.website || "",
                location: company.location || "",
                file: null,
            });
        }
    }, [company]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({
                ...prev,
                file: e.target.files![0],
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("website", formData.website);
            formDataToSend.append("location", formData.location);
            if (formData.file) {
                formDataToSend.append("file", formData.file);
            }

            const response = await axiosInstance.put(
                `/company/update/${params.id}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company));
                toast.success("Company updated successfully");
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error("Error updating company:", error);
            toast.error("Failed to update company");
        }
    };

    return (
        <div>
            <div className="bgMain-gradient">
                <Navbar />
            </div>
            <div className="max-w-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <ArrowLeft className="cursor-pointer" onClick={() => navigate("/admin/companies")} />
                        <h1 className="text-2xl font-bold text-gray-900">Company Setup</h1>
                    </div>
                    {loading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className="w-full"
                                    type="url"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="logo">Company Logo</Label>
                                <Input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full"
                                    accept="image/*"
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/admin/companies")}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-primary text-white cursor-pointer w-1/4">
                                    Update                            </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanySetup;
