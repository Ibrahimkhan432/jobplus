import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../../redux/jobSlice";
import axiosInstance from "@/utils/axios";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const res = await axiosInstance.get(`/application/get`, {
          withCredentials: true,
        });
        // console.log("res", res);
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log("error in get all applied jobs", error);
      }
    };
    fetchAllAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
