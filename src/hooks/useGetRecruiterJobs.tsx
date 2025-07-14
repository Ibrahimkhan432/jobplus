import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllRecruiterJobs } from "../../redux/jobSlice";
import axiosInstance from "@/utils/axios";

const useGetRecruiterJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axiosInstance.get(`/job/getRecruiterJobs`, {
                    withCredentials: true,
                });
                console.log("pst job res ", res);

                if (res.data.success) {
                    dispatch(setAllRecruiterJobs(res.data.jobs));
                }
            } catch (error) {
                console.log("error in get all Recruiter jobs", error);
            }
        };
        fetchJobs();
    }, [dispatch]);
};

export default useGetRecruiterJobs;
