import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "@/utils/axios";
import { setSingleCompany } from "../../redux/companySlice";

const useGetJobById = (jobId: string) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      if (!jobId) return;

      try {
        setLoading(true);
        const res = await axiosInstance.get(`/job/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("res useget for update ", res.data);

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        } else {
          toast.error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error in get job by id:", error);
        toast.error("Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  return { loading };
};

export default useGetJobById;
