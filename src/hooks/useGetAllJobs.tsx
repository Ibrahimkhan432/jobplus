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
        const res = await axiosInstance.get(`/job/get?keyword=${searchedQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("error in get all jobs", error);
      }
    };
    fetchAllJobs();
  }, []);
};
export default useGetAllJobs;
