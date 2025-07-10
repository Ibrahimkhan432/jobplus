import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../../redux/companySlice";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axiosInstance.get(`/company/get`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res.data);

                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                } else {
                    toast.error("Failed to fetch companies");
                }
            } catch (error: any) {
                console.error("Error fetching companies:", error.response?.data || error.message);
                toast.error("Failed to fetch companies");
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default useGetAllCompanies;
