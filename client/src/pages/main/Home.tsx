import "../../index.css"
import Footer from "../../components/Footer"
import Navbar from "../../components/global/Navbar"
import LatestJobs from "@/components/LatestJobs"
import Hero from "@/components/Hero"
import useGetAllJobs from "@/hooks/useGetAllJobs"

export default function Home() {
  useGetAllJobs();
  return (
  <div>
    <Navbar/>
    <Hero/>
    <LatestJobs/>
    <Footer/>
  </div>
  )
}