import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice";
import axiosInstance from "@/utils/axios";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store: any) => store.job)
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        console.log("Fetching jobs with URL:", `https://jobplus-backend-production.up.railway.app/job/get?keyword=${searchedQuery}`);
        const res = await axiosInstance.get(`/job/get?keyword=${searchedQuery}`, {
          withCredentials: false,
        });
        console.log("Jobs response:", res.data);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.log("API returned success: false", res.data);
        }
      } catch (error: any) {
        console.error("Error in get all jobs:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
      }
    };
    fetchAllJobs();
  }, [searchedQuery, dispatch]);
};
export default useGetAllJobs;
