import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../../redux/jobSlice";
import axiosInstance from "@/utils/axios";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axiosInstance.get(`/job/getAdminJobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("error in get all Admin jobs", error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
