import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import { setSingleCompany } from "../../redux/companySlice";

const useGetCompanyById = (companyId: string) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      if (!companyId) return;

      try {
        setLoading(true);
        const res = await axiosInstance.get(`/company/get/${companyId}`, {
          withCredentials: true,
        });
        console.log("res useget ", res.data);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          toast.error("Failed to fetch company details");
        }
      } catch (error) {
        console.error("Error in get company by id:", error);
        toast.error("Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);

  return { loading };
};

export default useGetCompanyById;
