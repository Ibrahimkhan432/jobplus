import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../../redux/companySlice";
import { toast } from "sonner";

const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
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
